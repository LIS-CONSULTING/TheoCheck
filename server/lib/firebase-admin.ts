import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

console.log("Initializing Firebase Admin...");

// Function to get Firebase credentials from environment variables
function getFirebaseCredentials(): ServiceAccount {
  try {
    // First try to parse the complete service account JSON
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      if (parsed.type === 'service_account') {
        console.log("Using complete service account configuration");
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not parse FIREBASE_SERVICE_ACCOUNT, falling back to individual credentials");
  }

  // Fall back to individual credentials
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;

  if (!privateKey || !clientEmail || !projectId) {
    console.error("Missing required Firebase credentials");
    throw new Error("Firebase configuration incomplete. Check FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, and VITE_FIREBASE_PROJECT_ID");
  }

  console.log("Using individual credential fields for Firebase Admin");
  return {
    projectId,
    clientEmail,
    privateKey,
  };
}

let app;
try {
  const credentials = getFirebaseCredentials();
  app = initializeApp({
    credential: cert(credentials)
  });
  console.log("Firebase Admin initialized successfully");
} catch (error) {
  console.error("Failed to initialize Firebase Admin:", error);
  throw error; // Re-throw to prevent starting with invalid credentials
}

const auth = getAuth(app);
const db = getFirestore(app);

// Test Firestore connection silently
db.collection('contacts').get()
  .then(() => console.log("Firestore 'contacts' collection is accessible"))
  .catch(error => console.warn("Warning: Firestore access limited:", error.message));

export { app, auth, db };