// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// lite: no todas las funcionalidades
import { getFirestore } from "firebase/firestore/lite"; 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqWt7osZ0E9xzmS1iC2HgLIVDDG-H_oi8",
  authDomain: "react-curso-1-e1a0a.firebaseapp.com",
  projectId: "react-curso-1-e1a0a",
  storageBucket: "react-curso-1-e1a0a.firebasestorage.app",
  messagingSenderId: "866334274379",
  appId: "1:866334274379:web:aed7ec234fbc335e8feece"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FireStore = getFirestore(FirebaseApp);