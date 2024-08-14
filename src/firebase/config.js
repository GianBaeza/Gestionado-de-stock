// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbOMtcsmrPdeMt0g-GWNzYVe2Df1H-oy4",
  authDomain: "stockinventario-45b47.firebaseapp.com",
  projectId: "stockinventario-45b47",
  storageBucket: "stockinventario-45b47.appspot.com",
  messagingSenderId: "276466612142",
  appId: "1:276466612142:web:e6939cf6775702c73c3a3f",
  measurementId: "G-S1FDB11DKK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;
