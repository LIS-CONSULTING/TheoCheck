import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error("Firebase API key not found in environment variables");
}

if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
  throw new Error("Firebase project ID not found in environment variables");
}

if (!import.meta.env.VITE_FIREBASE_APP_ID) {
  throw new Error("Firebase app ID not found in environment variables");
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log("Firebase Config:", {
  ...firebaseConfig,
  apiKey: "HIDDEN",
});

try {
  console.log("Initializing Firebase with project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
  console.log("Current URL:", window.location.origin);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  console.log("Firebase initialization successful");
  export { app, auth };
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
  throw error;
}