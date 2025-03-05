import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Parse the service account from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

console.log("Initializing Firebase Admin...");

const app = initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase Admin and Firestore initialized successfully");

// Test Firestore connection
db.collection('contacts').get()
  .then(() => console.log("Firestore 'contacts' collection is accessible"))
  .catch(error => console.error("Error accessing Firestore:", error));

export { app, auth, db };