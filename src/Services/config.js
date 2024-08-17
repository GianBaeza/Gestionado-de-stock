// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdVSV-pFaZsdjlp67wNgPn6MPXwihtfkE",
    authDomain: "inventario-9c17b.firebaseapp.com",
    projectId: "inventario-9c17b",
    storageBucket: "inventario-9c17b.appspot.com",
    messagingSenderId: "576287071754",
    appId: "1:576287071754:web:ea2bbb8d7c77e2548149f3",
    measurementId: "G-203FGN5ZZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;
