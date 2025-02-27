import { pgTable, text, serial, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseId: text("firebase_id").notNull().unique(),
  email: text("email").notNull(),
  displayName: text("display_name"),
  preferences: json("preferences").$type<UserPreferences>(),
});

export const sermons = pgTable("sermons", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  bibleReference: text("bible_reference"),
  analysis: json("analysis").$type<SermonAnalysis>(),
  topics: json("topics").$type<string[]>(),
  theologicalTradition: text("theological_tradition"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type EngagementPoint = {
  position: number; // Position in the sermon (0-100%)
  intensity: number; // Engagement intensity (0-1)
  type: "emotional" | "theological" | "practical"; // Type of engagement
  note?: string; // Optional note about this engagement point
};

export type SermonAnalysis = {
  scores: {
    fideliteBiblique: number;
    structure: number;
    applicationPratique: number;
    authenticite: number;
    interactivite: number;
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
  engagementData: EngagementPoint[]; // Array of engagement points throughout the sermon
};

export type UserPreferences = {
  favoriteTopics: string[];
  theologicalTradition: string;
  preferredStyle: string;
  lastViewedSermons: number[];
};

export const insertUserSchema = createInsertSchema(users).pick({
  firebaseId: true,
  email: true,
  displayName: true,
});

export const insertSermonSchema = createInsertSchema(sermons)
  .pick({
    title: true,
    content: true,
    bibleReference: true,
  })
  .extend({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(50, "Sermon content must be at least 50 characters"),
    bibleReference: z.string().optional(),
  });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Sermon = typeof sermons.$inferSelect;
export type InsertSermon = z.infer<typeof insertSermonSchema>;