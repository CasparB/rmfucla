// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Our web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGlqL_HWnMeLPqLf5gn2Wo_ZlFLgmZ-as",
    authDomain: "rmfucla.firebaseapp.com",
    projectId: "rmfucla",
    storageBucket: "rmfucla.appspot.com",
    messagingSenderId: "859436444498",
    appId: "1:859436444498:web:b80f17765c758c0006288b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);