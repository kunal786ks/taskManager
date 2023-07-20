// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6tvdePG7g6e_7_-KYrQux12t0KZ_E4R4",
  authDomain: "task-manager-32f5b.firebaseapp.com",
  projectId: "task-manager-32f5b",
  storageBucket: "task-manager-32f5b.appspot.com",
  messagingSenderId: "894880716850",
  appId: "1:894880716850:web:b9f70a2cb868aebcaa842b",
  measurementId: "G-BC8CT3VMYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);