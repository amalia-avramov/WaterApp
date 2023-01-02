// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcCPBuirU5IUqS6vtpgf_N-BX6sHbXqps",
    authDomain: "waterapp-6f9d9.firebaseapp.com",
    projectId: "waterapp-6f9d9",
    storageBucket: "waterapp-6f9d9.appspot.com",
    messagingSenderId: "894927012895",
    appId: "1:894927012895:web:e91a7291096ad7233f812a",
    measurementId: "G-BWZ9QTWF0R"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

