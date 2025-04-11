import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";


const FirebaseConfig = {
  apiKey: "AIzaSyDVxRhp8EoAY3DZt3EmRvZ5i-6VEKzdYYM",
  authDomain: "chatbot-870f8.firebaseapp.com",
  projectId: "chatbot-870f8",
  storageBucket: "chatbot-870f8.firebasestorage.app",
  messagingSenderId: "720477462820",
  appId: "1:720477462820:web:2e6339d663c57bebe1d3b1"
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, doc, getDoc, setDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp };
