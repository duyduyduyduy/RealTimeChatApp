// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDx8G4-HrSfYSSxpi3u6iR00lMXxjFicAM",
  authDomain: "chat-1f6fe.firebaseapp.com",
  projectId: "chat-1f6fe",
  storageBucket: "chat-1f6fe.appspot.com",
  messagingSenderId: "280702070037",
  appId: "1:280702070037:web:aacdfd37f0e69c37114d1c",
  measurementId: "G-FSJBTM9YVK",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
