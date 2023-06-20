import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";



// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBHGUo1xBGkgSlFWOruPQN4ocC3kcjuD3E",
    authDomain: "po-pic.firebaseapp.com",
    databaseURL: "https://po-pic-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "po-pic",
    storageBucket: "po-pic.appspot.com",
    messagingSenderId: "961859652379",
    appId: "1:961859652379:web:b468657cdbbf02c843a1be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export const storage = getStorage();



// export function createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     });
