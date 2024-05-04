import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FB,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN_FB,
  projectId: import.meta.env.VITE_PROJECT_ID_FB,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_FB,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_FB,
  appId: import.meta.env.VITE_APP_ID_FB,
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
