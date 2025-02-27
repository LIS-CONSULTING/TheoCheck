import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import admin from "firebase-admin";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin
try {
  log("Initializing Firebase Admin...");
  if (!process.env.FIREBASE_PROJECT_ID) {
    throw new Error("Missing required Firebase environment variables");
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const serviceAccount = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "attached_assets", "sermon-gpt-firebase-adminsdk-fbsvc-c97471f784.json")
    ).toString()
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  // Initialize Firestore
  const db = getFirestore();
  // Create the contacts collection if it doesn't exist
  db.collection('contacts').get().then(() => {
    log("Firestore 'contacts' collection is accessible");
  }).catch((error) => {
    log(`Error accessing Firestore: ${error.message}`);
  });

  log("Firebase Admin and Firestore initialized successfully");
} catch (error: any) {
  log(`Firebase Admin initialization error: ${error.message}`);
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();