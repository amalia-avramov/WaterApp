// firebase configuration

import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAcCPBuirU5IUqS6vtpgf_N-BX6sHbXqps",
    authDomain: "waterapp-6f9d9.firebaseapp.com",
    projectId: "waterapp-6f9d9",
    storageBucket: "waterapp-6f9d9.appspot.com",
    messagingSenderId: "894927012895",
    appId: "1:894927012895:web:e91a7291096ad7233f812a",
    measurementId: "G-BWZ9QTWF0R"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};