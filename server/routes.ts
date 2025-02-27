import type { Express, Request } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertSermonSchema, type SermonAnalysis } from "@shared/schema";
import OpenAI from "openai";

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

export async function registerRoutes(app: Express) {
  // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
  app.post("/api/analyze", async (req, res) => {
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
        model: "gpt-4o",
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

      const analysis = JSON.parse(response.choices[0].message.content || "{}") as SermonAnalysis;

      // Store the analysis results
      const updatedSermon = await storage.updateSermonAnalysis(sermonId, analysis);
      res.json(updatedSermon);
    } catch (error: any) {
      console.error("Analysis error:", error);
      res.status(500).json({ message: "Failed to analyze sermon" });
    }
  });

  app.get("/api/sermons", async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const sermons = await storage.getSermonsByUserId(userId);
    res.json(sermons);
  });

  app.post("/api/sermons", async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const parsed = insertSermonSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid sermon data" });
    }

    const sermon = await storage.createSermon({
      ...parsed.data,
      userId,
      analysis: null,
      bibleReference: parsed.data.bibleReference || null,
    });

    // After creating the sermon, trigger analysis
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
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

      const analysis = JSON.parse(response.choices[0].message.content || "{}") as SermonAnalysis;
      const updatedSermon = await storage.updateSermonAnalysis(sermon.id, analysis);
      res.json(updatedSermon);
    } catch (error) {
      // If analysis fails, return the sermon without analysis
      res.json(sermon);
    }
  });

  app.post("/api/contact", async (req, res) => {
    // In a real app, you would send this to an email service
    res.json({ message: "Message received" });
  });

  const httpServer = createServer(app);
  return httpServer;
}