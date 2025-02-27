import type { Express, Request } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertSermonSchema, type SermonAnalysis } from "@shared/schema";
import OpenAI from "openai";
import admin from "firebase-admin";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Add custom properties to Express.Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

// Firebase auth middleware
const authenticateUser = async (req: Request, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { id: decodedToken.uid };
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export async function registerRoutes(app: Express) {
  app.get("/api/sermons/:id", authenticateUser, async (req, res) => {
    try {
      const sermonId = parseInt(req.params.id);
      const sermon = await storage.getSermon(sermonId);

      if (!sermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }

      if (sermon.userId !== req.user?.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      res.json(sermon);
    } catch (error) {
      console.error("Error fetching sermon:", error);
      res.status(500).json({ message: "Failed to fetch sermon" });
    }
  });

  app.post("/api/analyze", authenticateUser, async (req, res) => {
    try {
      const sermonId = req.body.sermonId;
      const sermon = await storage.getSermon(sermonId);

      if (!sermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }

      if (sermon.userId !== req.user?.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      console.log("Starting analysis for sermon:", sermonId);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a sermon analysis expert. Analyze the sermon and provide detailed feedback in JSON format with the following structure:
            {
              "structure": number (1-10),
              "theology": number (1-10),
              "relevance": number (1-10),
              "engagement": number (1-10),
              "overallScore": number (1-10),
              "strengths": string[],
              "improvements": string[],
              "summary": string,
              "topics": string[], // Extract 3-5 main topics/themes from the sermon
              "theologicalTradition": string // Identify the theological tradition (e.g., Reformed, Lutheran, Catholic, etc.)
            }`
          },
          {
            role: "user",
            content: sermon.content
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 4000,
        temperature: 0.7
      });

      console.log("OpenAI Response:", response.choices[0].message.content);

      const analysis = JSON.parse(response.choices[0].message.content) as SermonAnalysis;
      const updatedSermon = await storage.updateSermonAnalysis(sermonId, analysis);

      // Update user preferences based on the analysis
      const user = await storage.getUserByFirebaseId(req.user.id);
      if (user) {
        const preferences = user.preferences || {
          favoriteTopics: [],
          theologicalTradition: analysis.theologicalTradition,
          preferredStyle: "",
          lastViewedSermons: []
        };

        // Update preferences based on this sermon
        preferences.favoriteTopics = [...new Set([...preferences.favoriteTopics, ...analysis.topics])];
        preferences.lastViewedSermons = [sermonId, ...preferences.lastViewedSermons].slice(0, 10);

        await storage.updateUserPreferences(user.id, preferences);
      }

      res.json(updatedSermon);
    } catch (error: any) {
      console.error("Analysis error:", error);
      let message = "Failed to analyze sermon";
      let status = 500;

      if (error.status === 429) {
        message = "429 You exceeded your current quota, please check your plan and billing details.";
        status = 429;
      } else if (error.status === 401) {
        message = "API authentication error. Please contact support.";
        status = 401;
      }

      res.status(status).json({
        message,
        details: error.message || "Unknown error"
      });
    }
  });

  app.get("/api/sermons", authenticateUser, async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const sermons = await storage.getSermonsByUserId(userId);
    res.json(sermons);
  });

  app.post("/api/sermons", authenticateUser, async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const parsed = insertSermonSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid sermon data" });
      }

      console.log("Creating sermon for user:", userId);
      const sermon = await storage.createSermon({
        ...parsed.data,
        userId,
        analysis: null,
        bibleReference: parsed.data.bibleReference || null,
      });

      // Immediately analyze the sermon
      console.log("Starting sermon analysis for:", sermon.id);

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a sermon analysis expert. Analyze the sermon and provide detailed feedback in JSON format with scores from 1-10 for structure, theology, relevance, and engagement, along with strengths, improvements, and a summary."
          },
          {
            role: "user",
            content: sermon.content
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 4000,
        temperature: 0.7
      });

      console.log("OpenAI Response received");
      const analysis = JSON.parse(response.choices[0].message.content) as SermonAnalysis;
      const updatedSermon = await storage.updateSermonAnalysis(sermon.id, analysis);

      console.log("Analysis completed for sermon:", sermon.id);
      res.json(updatedSermon);
    } catch (error: any) {
      console.error("Error in /api/sermons:", error);
      let message = "Failed to analyze sermon";
      let status = 500;

      if (error.status === 429) {
        message = "429 You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.";
        status = 429;
      } else if (error.status === 401) {
        message = "API authentication error. Please contact support.";
        status = 401;
      }

      res.status(status).json({
        message,
        details: error.message || "Unknown error"
      });
    }
  });

  // Add a new route for sermon recommendations
  app.get("/api/sermons/recommendations", authenticateUser, async (req, res) => {
    try {
      const user = await storage.getUserByFirebaseId(req.user!.id);
      if (!user || !user.preferences) {
        return res.json([]);
      }

      const allSermons = await storage.getSermonsByUserId(req.user!.id);
      const recommendations = allSermons
        .filter(sermon => !user.preferences!.lastViewedSermons.includes(sermon.id))
        .map(sermon => ({
          sermon,
          score: calculateRecommendationScore(sermon, user.preferences!)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(r => r.sermon);

      res.json(recommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      res.status(500).json({ message: "Failed to get recommendations" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    // In a real app, you would send this to an email service
    res.json({ message: "Message received" });
  });

  const httpServer = createServer(app);
  return httpServer;
}

interface UserPreferences {
  favoriteTopics: string[];
  theologicalTradition: string;
  preferredStyle: string;
  lastViewedSermons: number[];
}

interface Sermon {
  id: number;
  userId: string;
  content: string;
  analysis?: SermonAnalysis;
}


function calculateRecommendationScore(sermon: Sermon, preferences: UserPreferences): number {
  let score = 0;

  // Topic matching
  if (sermon.analysis?.topics) {
    const matchingTopics = sermon.analysis.topics.filter(topic =>
      preferences.favoriteTopics.includes(topic)
    );
    score += matchingTopics.length * 2;
  }

  // Theological tradition matching
  if (sermon.analysis?.theologicalTradition === preferences.theologicalTradition) {
    score += 3;
  }

  // Quality score bonus
  if (sermon.analysis?.overallScore) {
    score += sermon.analysis.overallScore / 2;
  }

  return score;
}