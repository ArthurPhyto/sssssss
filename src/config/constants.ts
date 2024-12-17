import { z } from 'zod';

const envSchema = z.object({
  VITE_BASE_URL: z.string().default('http://localhost:3000'),
  VITE_FIREBASE_API_KEY: z.string(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string(),
  VITE_FIREBASE_PROJECT_ID: z.string(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  VITE_FIREBASE_APP_ID: z.string(),
});

export const APP_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
} as const;

export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
} as const;

// Validate environment variables
try {
  envSchema.parse(import.meta.env);
} catch (error) {
  console.error('Environment validation failed:', error);
  throw new Error('Missing required environment variables');
}