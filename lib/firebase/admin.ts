import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let firestore: Firestore | null = null;

function getFirebaseAdminApp(): App {
  const existing = getApps()[0];
  if (existing) {
    return existing;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      projectId,
    });
  }

  if (projectId) {
    return initializeApp({ projectId });
  }

  throw new Error(
    "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID and service account credentials.",
  );
}

export function getAdminFirestore(): Firestore {
  if (!firestore) {
    firestore = getFirestore(getFirebaseAdminApp());
  }

  return firestore;
}

export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );
}
