import { initializeApp } from "firebase/app";
import  { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDRNsmtvSr7JNMXqq9tLTKgzGFhy_5erLg",
  authDomain: "finance-tracker-dfa80.firebaseapp.com",
  projectId: "finance-tracker-dfa80",
  storageBucket: "finance-tracker-dfa80.appspot.com",
  messagingSenderId: "247543574232",
  appId: "1:247543574232:web:d4788c68a837df977c31ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;