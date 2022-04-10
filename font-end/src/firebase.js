import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDMx-92glPqTshUyLZxLqFlVCyI2k40_Go",
  authDomain: "e-learning-2497f.firebaseapp.com",
  projectId: "e-learning-2497f",
  storageBucket: "e-learning-2497f.appspot.com",
  messagingSenderId: "968770978208",
  appId: "1:968770978208:web:df94d0f3d952a5e6f2e4c5",
  measurementId: "G-Q3W0G3J8PW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;