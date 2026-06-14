import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIBNj5j9n87s0b-2QT9n9ULwDe3Hyr0uA",
  authDomain: "worldcup26-score-betting.firebaseapp.com",
  projectId: "worldcup26-score-betting",
  storageBucket: "worldcup26-score-betting.firebasestorage.app",
  messagingSenderId: "272532954339",
  appId: "1:272532954339:web:21c3bdf06b08dbb384b9d6",
  measurementId: "G-H5EXBRXN57"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
