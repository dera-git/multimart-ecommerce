import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBGNll0TGTmIOcn5QVvIJk1LZZ8pBWsnpE",
  authDomain: "multimart-ed282.firebaseapp.com",
  projectId: "multimart-ed282",
  storageBucket: "multimart-ed282.appspot.com",
  messagingSenderId: "470952283356",
  appId: "1:470952283356:web:81ef41ec6d2301fe90b819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app