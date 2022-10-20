// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyD12CGDMdYO5Al_WhGtULXSf7lq8v_8eKo",
    authDomain: "netflix-clone-51f0f.firebaseapp.com",
    projectId: "netflix-clone-51f0f",
    storageBucket: "netflix-clone-51f0f.appspot.com",
    messagingSenderId: "331467131862",
    appId: "1:331467131862:web:b2f72179e85904303e3277",
    measurementId: "G-TF00DQ6QQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app)
const auth = getAuth(app)

export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut}
export default db