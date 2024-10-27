// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm_fXUsPO0l7RFe5NHrcWFlVw1sJouymQ",
  authDomain: "abo-seada-office.firebaseapp.com",
  projectId: "abo-seada-office",
  storageBucket: "abo-seada-office.appspot.com",
  messagingSenderId: "398909922325",
  appId: "1:398909922325:web:4e5a48a9a7a28b10a0c21c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
