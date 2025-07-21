import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqm_0BKimzgk5LgSvu-rtIPKdLWD1rOIw",
  authDomain: "movies-site-16651.firebaseapp.com",
  projectId: "movies-site-16651",
  storageBucket: "movies-site-16651.appspot.com",
  messagingSenderId: "387219056422",
  appId: "1:387219056422:web:a2d1d9a2f95ab1798c83e7",
  measurementId: "G-LD486DBWMB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export default app;
