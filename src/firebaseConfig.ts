import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Keep keys public for Firebase Web apps (they are not secrets)
const firebaseConfig = {
  apiKey: "AIzaSyAjAbtk_TxSMSi2GUww4aIMVPpsZReVAsQ",
  authDomain: "fit-muscle-8d2f0.firebaseapp.com",
  projectId: "fit-muscle-8d2f0",
  storageBucket: "fit-muscle-8d2f0.firebasestorage.app",
  messagingSenderId: "780023014682",
  appId: "1:780023014682:web:83215c7ac94d7f000ab8a3",
  measurementId: "G-N7HBJDD28Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

provider.setCustomParameters({ prompt: "select_account" });

export { auth, provider, db, signInWithPopup };
