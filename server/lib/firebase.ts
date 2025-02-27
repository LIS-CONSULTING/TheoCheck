import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function initializeFirebase() {
  try {
    if (!process.env.FIREBASE_PROJECT_ID) {
      throw new Error("Missing required Firebase environment variables");
    }

    // Only initialize if no Firebase apps exist
    if (!admin.apps.length) {
      const serviceAccount = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "..", "..", "attached_assets", "sermon-gpt-firebase-adminsdk-fbsvc-c97471f784.json")
        ).toString()
      );

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    return getFirestore();
  } catch (error: any) {
    console.error(`Firebase Admin initialization error: ${error.message}`);
    throw error;
  }
}

export const verifyAuth = async (token: string) => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.error("Auth verification error:", error);
    throw error;
  }
};

export const saveContactForm = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const db = getFirestore();
  const contactData = {
    ...data,
    createdAt: new Date(),
    status: 'new'
  };

  console.log("Saving contact form data:", contactData);
  const docRef = await db.collection('contacts').add(contactData);
  console.log("Contact form saved with ID:", docRef.id);

  return docRef.id;
};