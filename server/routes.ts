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
            content: `You are a sermon analysis expert. Analyze the sermon and provide detailed feedback in JSON format with scores from 1-10 for structure, theology, relevance, and engagement, along with strengths, improvements, and a summary.`
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
      res.json(updatedSermon);
    } catch (error: any) {
      console.error("Analysis error:", error);
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

  app.post("/api/contact", async (req, res) => {
    // In a real app, you would send this to an email service
    res.json({ message: "Message received" });
  });

  const httpServer = createServer(app);
  return httpServer;
}