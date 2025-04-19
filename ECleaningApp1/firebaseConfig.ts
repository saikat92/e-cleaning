import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyARS857IG9cBb9mZkCCHGuF45mR0pv_bok",
  authDomain: "disasterapp-b8a5b.firebaseapp.com",
  projectId: "disasterapp-b8a5b",
  storageBucket: "disasterapp-b8a5b.firebasestorage.app",
  messagingSenderId: "1078530366897",
  appId: "1:1078530366897:web:70a1d01c6f2b6d31b0b190",
  measurementId: "G-Y628586FMW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);