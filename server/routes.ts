import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertSermonSchema } from "@shared/schema";
import { initializeFirebase, verifyAuth, saveContactForm } from "./lib/firebase";
import OpenAI from "openai";
import admin from "firebase-admin";
import PDFDocument from "pdfkit";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase
const db = initializeFirebase();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Example of a modified prompt with additional evaluation criteria
const SERMON_ANALYSIS_PROMPT_FR = `Mission : TheoCheck est conçu pour offrir une évaluation complète et constructive des sermons chrétiens. Sois le plus objectif possible: il faut que le même sermon obtienne toujours la même note.

Analyse le sermon fourni et réponds au format JSON avec la structure suivante:
{
  "scores": {
    "fideliteBiblique": number (1-10, évaluation de l'ancrage dans les Écritures et l'interprétation),
    "structure": number (1-10, évaluation de la clarté et la simplicité),
    "applicationPratique": number (1-10, évaluation de l'application concrète et engagement émotionnel),
    "authenticite": number (1-10, évaluation de la passion et impact spirituel),
    "interactivite": number (1-10, évaluation de la gestion du temps et pertinence contextuelle)
  },
  "overallScore": number (1-10),
  "strengths": string[] (3-5 points forts spécifiques),
  "improvements": string[] (3-5 suggestions concrètes d'amélioration),
  "summary": string (résumé concis des points principaux),
  "topics": string[] (3-5 thèmes théologiques principaux),
  "theologicalTradition": string (tradition théologique identifiée),
  "keyScriptures": string[] (références bibliques clés utilisées),
  "applicationPoints": string[] (2-3 points d'application pratique),
  "illustrationsUsed": string[] (illustrations principales utilisées),
  "audienceEngagement": {
    "emotional": number (1-10, connexion émotionnelle),
    "intellectual": number (1-10, compréhension théologique),
    "practical": number (1-10, applicabilité quotidienne)
  }
}`;

const SERMON_ANALYSIS_PROMPT_EN = `Mission: TheoCheck is designed to provide a comprehensive and constructive evaluation of Christian sermons. Be as objective as possible: the same sermon should always receive the same score.

Analyze the provided sermon and respond in JSON format with the following structure:
{
  "scores": {
    "biblicalFidelity": number (1-10, evaluation of Scripture anchoring and interpretation),
    "structure": number (1-10, evaluation of clarity and simplicity),
    "practicalApplication": number (1-10, evaluation of concrete application and emotional engagement),
    "authenticity": number (1-10, evaluation of passion and spiritual impact),
    "interactivity": number (1-10, evaluation of time management and contextual relevance)
  },
  "overallScore": number (1-10),
  "strengths": string[] (3-5 specific strengths),
  "improvements": string[] (3-5 concrete improvement suggestions),
  "summary": string (concise summary of main points),
  "topics": string[] (3-5 main theological themes),
  "theologicalTradition": string (identified theological tradition),
  "keyScriptures": string[] (key biblical references used),
  "applicationPoints": string[] (2-3 practical application points),
  "illustrationsUsed": string[] (main illustrations used),
  "audienceEngagement": {
    "emotional": number (1-10, emotional connection),
    "intellectual": number (1-10, theological understanding),
    "practical": number (1-10, daily applicability)
  }
}`;

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
const authenticateUser = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyAuth(token);
    req.user = { id: decodedToken.uid };
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export async function registerRoutes(app: Express) {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      const docId = await saveContactForm({ name, email, subject, message });

      res.json({
        success: true,
        message: "Message received successfully",
        id: docId
      });
    } catch (error: any) {
      console.error("Error saving contact form:", error);
      res.status(500).json({
        success: false,
        message: "Failed to save contact form",
        error: error.message
      });
    }
  });

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
      const language = req.body.language || 'fr'; // Get language from request
      const sermon = await storage.getSermon(sermonId);

      if (!sermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }

      if (sermon.userId !== req.user?.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      console.log(`Starting analysis for sermon: ${sermonId} in language: ${language}`);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: language === 'fr' ? SERMON_ANALYSIS_PROMPT_FR : SERMON_ANALYSIS_PROMPT_EN
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
            content: SERMON_ANALYSIS_PROMPT_FR //Default to French
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


  app.get("/api/sermons/:id/pdf", authenticateUser, async (req, res) => {
    try {
      const sermonId = parseInt(req.params.id);
      const sermon = await storage.getSermon(sermonId);

      if (!sermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }

      if (sermon.userId !== req.user?.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // Create PDF with better styling
      const doc = new PDFDocument({
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
        size: 'A4'
      });
      doc.pipe(res);

      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=analyse-sermon-${sermonId}.pdf`);

      // Header
      doc.fontSize(24)
        .fillColor('#1a365d')
        .text('TheoCheck', { align: 'center' });

      doc.fontSize(16)
        .fillColor('#4a5568')
        .text('Rapport d\'Analyse de Sermon', { align: 'center' });

      doc.moveDown(2);

      // Title and date section
      doc.fontSize(20)
        .fillColor('#2d3748')
        .text(sermon.title);

      doc.fontSize(12)
        .fillColor('#718096')
        .text(`Date d'analyse: ${new Date().toLocaleDateString('fr-FR')}`)
        .moveDown();

      // Divider
      doc.moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke('#e2e8f0');

      const analysis = sermon.analysis;
      if (analysis) {
        // Overall score with visual emphasis
        doc.moveDown()
          .fontSize(16)
          .fillColor('#2d3748')
          .text('Note Globale', { continued: true })
          .fillColor('#48bb78')
          .text(`: ${analysis.overallScore}/10`, { align: 'right' })
          .moveDown();

        // Scores section with visual presentation
        doc.fontSize(14)
          .fillColor('#2d3748')
          .text('Évaluation Détaillée')
          .moveDown(0.5);

        const scores = [
          { label: 'Fidélité Biblique', score: analysis.scores.fideliteBiblique },
          { label: 'Structure', score: analysis.scores.structure },
          { label: 'Application Pratique', score: analysis.scores.applicationPratique },
          { label: 'Authenticité', score: analysis.scores.authenticite },
          { label: 'Interactivité', score: analysis.scores.interactivite }
        ];

        scores.forEach(({ label, score }) => {
          const barWidth = score * 40; // Scale the bar width based on score
          doc.fontSize(12)
            .fillColor('#4a5568')
            .text(`${label}: ${score}/10`, { continued: false });

          // Draw score bar
          doc.rect(doc.x, doc.y, barWidth, 10)
            .fill('#48bb78');
          doc.moveDown(0.8);
        });

        // Key Insights section
        doc.moveDown()
          .fontSize(16)
          .fillColor('#2d3748')
          .text('Points Clés')
          .moveDown(0.5);

        doc.fontSize(12)
          .fillColor('#4a5568')
          .text(analysis.summary)
          .moveDown();

        // Strengths section with visual bullets
        doc.fontSize(14)
          .fillColor('#2d3748')
          .text('Points Forts')
          .moveDown(0.5);

        analysis.strengths.forEach(strength => {
          doc.fontSize(12)
            .fillColor('#48bb78')
            .text('•', { continued: true })
            .fillColor('#4a5568')
            .text(` ${strength}`)
            .moveDown(0.5);
        });

        // Areas for Improvement with recommendations
        doc.moveDown()
          .fontSize(14)
          .fillColor('#2d3748')
          .text('Recommandations d\'Amélioration')
          .moveDown(0.5);

        analysis.improvements.forEach(improvement => {
          doc.fontSize(12)
            .fillColor('#e53e3e')
            .text('•', { continued: true })
            .fillColor('#4a5568')
            .text(` ${improvement}`)
            .moveDown(0.5);
        });

        // Biblical References section
        doc.moveDown()
          .fontSize(14)
          .fillColor('#2d3748')
          .text('Références Bibliques')
          .moveDown(0.5);

        analysis.keyScriptures.forEach(scripture => {
          doc.fontSize(12)
            .fillColor('#4a5568')
            .text(`• ${scripture}`)
            .moveDown(0.3);
        });

        // Practical Application
        doc.moveDown()
          .fontSize(14)
          .fillColor('#2d3748')
          .text('Applications Pratiques')
          .moveDown(0.5);

        analysis.applicationPoints.forEach(point => {
          doc.fontSize(12)
            .fillColor('#4a5568')
            .text(`• ${point}`)
            .moveDown(0.3);
        });

        // Theological Analysis
        doc.moveDown()
          .fontSize(14)
          .fillColor('#2d3748')
          .text('Analyse Théologique')
          .moveDown(0.5);

        doc.fontSize(12)
          .fillColor('#4a5568')
          .text(`Tradition Théologique: ${analysis.theologicalTradition}`)
          .moveDown();

        // Audience Engagement Analysis
        doc.moveDown()
          .fontSize(14)
          .fillColor('#2d3748')
          .text('Analyse de l\'Engagement')
          .moveDown(0.5);

        const engagementScores = [
          { label: 'Connection Émotionnelle', score: analysis.audienceEngagement.emotional },
          { label: 'Compréhension Théologique', score: analysis.audienceEngagement.intellectual },
          { label: 'Application Quotidienne', score: analysis.audienceEngagement.practical }
        ];

        engagementScores.forEach(({ label, score }) => {
          doc.fontSize(12)
            .fillColor('#4a5568')
            .text(`${label}: ${score}/10`)
            .moveDown(0.3);
        });

        // Recommendations for Next Sermon
        doc.moveDown()
          .fontSize(14)
          .fillColor('#2d3748')
          .text('Recommandations pour le Prochain Sermon')
          .moveDown(0.5);

        doc.fontSize(12)
          .fillColor('#4a5568')
          .text('Pour améliorer votre prochain sermon, concentrez-vous sur:')
          .moveDown(0.3);

        const recommendations = [
          'Maintenez vos points forts actuels tout en travaillant sur les aspects à améliorer',
          'Utilisez plus d\'illustrations pour renforcer vos points principaux',
          'Structurez votre message avec des transitions plus claires',
          'Incluez des moments de réflexion pour l\'engagement de l\'auditoire'
        ];

        recommendations.forEach(rec => {
          doc.text(`• ${rec}`).moveDown(0.3);
        });

        // Footer
        doc.fontSize(10)
          .fillColor('#718096')
          .text('TheoCheck - Analyse IA de Sermons', 50, doc.page.height - 50, {
            align: 'center'
          });
      }

      // Finalize PDF
      doc.end();
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Erreur lors de la génération du rapport PDF" });
    }
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

interface SermonAnalysis {
  scores: {
    fideliteBiblique: number;
    structure: number;
    applicationPratique: number;
    authenticite: number;
    interactivite: number;
    biblicalFidelity?: number;
    practicalApplication?: number;
    authenticity?: number;
  };
  overallScore: number;
  strengths: string[];
  improvements: string[];
  summary: string;
  topics: string[];
  theologicalTradition: string;
  keyScriptures: string[];
  applicationPoints: string[];
  illustrationsUsed: string[];
  audienceEngagement: {
    emotional: number;
    intellectual: number;
    practical: number;
  };
}

interface Sermon {
  id: number;
  userId: string;
  content: string;
  title: string; // Added title
  createdAt: Date; // Added createdAt
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