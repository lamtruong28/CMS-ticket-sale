// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const process = import.meta.env;
const firebaseConfig = {
    apiKey: process.VITE_API_KEY,
    authDomain: process.VITE_DOMAIN,
    projectId: "cms-ticket-sale-5978d",
    storageBucket: "cms-ticket-sale-5978d.appspot.com",
    messagingSenderId: "702150350624",
    appId: "1:702150350624:web:15ddb0ba75ed08729fa945",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
