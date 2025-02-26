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
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Vous êtes un expert en analyse de sermons. Analysez le sermon fourni en détail et fournissez une analyse structurée au format JSON avec les éléments suivants :

{
  "structure": number (1-10),
  "theology": number (1-10),
  "relevance": number (1-10),
  "engagement": number (1-10),
  "overallScore": number (1-10),

  "keyPoints": string[],
  "biblicalAccuracy": {
    "score": number (1-10),
    "references": string[],
    "suggestions": string[]
  },
  "deliveryAnalysis": {
    "clarity": number (1-10),
    "persuasiveness": number (1-10),
    "emotionalImpact": number (1-10),
    "suggestions": string[]
  },
  "audienceEngagement": {
    "interactivity": number (1-10),
    "relatability": number (1-10),
    "practicalApplication": number (1-10),
    "suggestions": string[]
  },
  "contentStructure": {
    "introduction": string,
    "mainPoints": string[],
    "conclusion": string,
    "flowScore": number (1-10)
  },

  "strengths": string[],
  "improvements": string[],
  "summary": string
}

Évaluez chaque aspect en détail, en fournissant des suggestions concrètes et constructives.`
          },
          {
            role: "user",
            content: req.body.content
          }
        ],
        response_format: { type: "json_object" }
      });

      const analysis = JSON.parse(response.choices[0].message.content || "{}") as SermonAnalysis;
      res.json(analysis);
    } catch (error) {
      console.error("Analyse error:", error);
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
    });

    res.json(sermon);
  });

  app.post("/api/contact", async (req, res) => {
    // In a real app, you would send this to an email service
    res.json({ message: "Message received" });
  });

  const httpServer = createServer(app);
  return httpServer;
}