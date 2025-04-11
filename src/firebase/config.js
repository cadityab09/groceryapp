import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVwDcoHTZ_WhwYyIIbHDpdvkTEISZtKJs",
  authDomain: "grocery-app-ced8e.firebaseapp.com",
  projectId: "grocery-app-ced8e",
  storageBucket: "grocery-app-ced8e.firebasestorage.app",
  messagingSenderId: "841290985850",
  appId: "1:841290985850:web:bf2657983eebbfb0b7a6c3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
