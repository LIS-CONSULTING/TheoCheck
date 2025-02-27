import type { Express, Request } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertSermonSchema, type SermonAnalysis } from "@shared/schema";
import OpenAI from "openai";
import admin from "firebase-admin";

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

      const response = await openai.chat.completions.create({
        model: "gpt-4",
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
        response_format: { type: "json_object" }
      });

      console.log("OpenAI Response:", response.choices[0].message.content);

      const analysis = JSON.parse(response.choices[0].message.content) as SermonAnalysis;
      const updatedSermon = await storage.updateSermonAnalysis(sermonId, analysis);
      res.json(updatedSermon);
    } catch (error: any) {
      console.error("Analysis error:", error);
      res.status(500).json({ message: "Failed to analyze sermon" });
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
        model: "gpt-4",
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
        response_format: { type: "json_object" }
      });

      console.log("OpenAI Response received");
      const analysis = JSON.parse(response.choices[0].message.content) as SermonAnalysis;
      const updatedSermon = await storage.updateSermonAnalysis(sermon.id, analysis);

      console.log("Analysis completed for sermon:", sermon.id);
      res.json(updatedSermon);
    } catch (error: any) {
      console.error("Error in /api/sermons:", error);
      res.status(500).json({ message: "Failed to analyze sermon" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    // In a real app, you would send this to an email service
    res.json({ message: "Message received" });
  });

  const httpServer = createServer(app);
  return httpServer;
}