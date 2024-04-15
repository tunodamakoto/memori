import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

export const app = initializeApp({
  apiKey: "AIzaSyBGlwM7k9ufb5GThrifLZiI7sitffLfPIs",
  authDomain: "memori-8d717.firebaseapp.com",
  projectId: "memori-8d717",
  storageBucket: "memori-8d717.appspot.com",
  messagingSenderId: "1030272243575",
  appId: "1:1030272243575:web:acffcd2f5c9fdba542b372"
});

export const auth = getAuth();
export const db = getFirestore()