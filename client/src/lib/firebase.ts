import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log("Firebase Config:", {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };