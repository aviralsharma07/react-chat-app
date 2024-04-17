import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-4d4f4.firebaseapp.com",
  projectId: "reactchat-4d4f4",
  storageBucket: "reactchat-4d4f4.appspot.com",
  messagingSenderId: "58613967769",
  appId: "1:58613967769:web:5ce12b55752e844282c108",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
