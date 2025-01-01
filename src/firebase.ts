
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCX8p3EA11LCc69NdxRAAv7FW7fHR1HwwQ",
  authDomain: "discord-clone-7191b.firebaseapp.com",
  projectId: "discord-clone-7191b",
  storageBucket: "discord-clone-7191b.firebasestorage.app",
  messagingSenderId: "776748041187",
  appId: "1:776748041187:web:b774ffb041f9afb81c56d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,db,provider};