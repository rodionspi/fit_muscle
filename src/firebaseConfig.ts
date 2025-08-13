import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Keep keys public for Firebase Web apps (they are not secrets)
const firebaseConfig = {
  apiKey: "AIzaSyBHao4CS_iFaazauW2JNx7K8BDH2sPRMiI",
  authDomain: "trainer-app-cbc90.firebaseapp.com",
  projectId: "trainer-app-cbc90",
  storageBucket: "trainer-app-cbc90.firebasestorage.app",
  messagingSenderId: "486420830489",
  appId: "1:486420830489:web:5f089110663dbceb258d88",
  measurementId: "G-NRRM1BBV3P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

provider.setCustomParameters({ prompt: "select_account" });

export { auth, provider, db, signInWithPopup };
