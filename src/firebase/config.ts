import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEaL2ReEVwuv3px35a_H3dkjfCbs7Po6s",
  authDomain: "strategia-d2fbf.firebaseapp.com",
  projectId: "strategia-d2fbf",
  storageBucket: "strategia-d2fbf.firebasestorage.app",
  messagingSenderId: "570865613314",
  appId: "1:570865613314:web:bcba536cc418ca29fc051b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);