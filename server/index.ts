import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { app as firebaseApp, auth as firebaseAuth, db as firebaseDb } from './lib/firebase-admin';
import path from 'path';

const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  // More permissive CORS settings
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add security headers but make them more permissive
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// Detailed request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Log incoming request details
  console.log(`Incoming ${req.method} request to ${path}`);
  console.log('Headers:', req.headers);

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

      // Log detailed response information for error status codes
      if (res.statusCode >= 400) {
        console.error(`Error Response [${res.statusCode}]:`, {
          method: req.method,
          path: req.path,
          headers: req.headers,
          query: req.query,
          body: req.body,
          response: capturedJsonResponse,
          duration
        });
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Global error handler with detailed logging
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', {
      error: err,
      stack: err.stack,
      path: req.path,
      method: req.method,
      headers: req.headers
    });

    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Special handling for 403 errors
    if (status === 403) {
      console.warn('403 Forbidden Error:', {
        path: req.path,
        headers: req.headers,
        message: err.message
      });
      return res.status(403).json({
        message: "Access forbidden",
        details: "Please check your permissions and try again",
        path: req.path
      });
    }

    res.status(status).json({ message });
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // Serve static files with proper error handling
    app.use(express.static('dist', {
      setHeaders: (res) => {
        res.set('Cache-Control', 'public, max-age=31536000');
      },
      fallthrough: true, // Continue to next middleware if file not found
    }));

    // Serve index.html for all routes (SPA support)
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });

    serveStatic(app);
  }

  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();