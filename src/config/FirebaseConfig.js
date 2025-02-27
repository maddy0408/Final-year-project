import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyDVxRhp8EoAY3DZt3EmRvZ5i-6VEKzdYYM",
  authDomain: "chatbot-870f8.firebaseapp.com",
  projectId: "chatbot-870f8",
  storageBucket: "chatbot-870f8.firebasestorage.app",
  messagingSenderId: "720477462820",
  appId: "1:720477462820:web:2e6339d663c57bebe1d3b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
