import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const missingConfig = Object.entries(firebaseConfig)
  .filter(([key, value]) => key !== 'measurementId' && !value)
  .map(([key]) => key);

if (missingConfig.length > 0) {
  throw new Error(
    `Missing Firebase configuration: ${missingConfig.join(', ')}. Add the values to your .env.local file.`,
  );
}

export const adminEmail = import.meta.env.VITE_FIREBASE_ADMIN_EMAIL?.trim().toLowerCase() ?? '';
export const adminUid = import.meta.env.VITE_FIREBASE_ADMIN_UID?.trim() ?? '';

if (!adminEmail) {
  throw new Error('Missing VITE_FIREBASE_ADMIN_EMAIL. Add the admin email to your .env.local file.');
}

if (!adminUid) {
  throw new Error('Missing VITE_FIREBASE_ADMIN_UID. Add the admin Firebase Auth UID to your .env.local file.');
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
