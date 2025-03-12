// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeyNh3_wL1xSuLp4c_ydoCTMipqKLGows",
  authDomain: "api-auth-cda2d.firebaseapp.com",
  projectId: "api-auth-cda2d",
  storageBucket: "api-auth-cda2d.appspot.com", 
  messagingSenderId: "165555034741",
  appId: "1:165555034741:web:4e000bef5fb2d9a91e363c",
  measurementId: "G-J2D8MT3DYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export {app, auth};