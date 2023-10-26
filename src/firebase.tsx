// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3zbUkWwWdOWtttaV1lK9roAKJ2Zwe2i4",
  authDomain: "auth-link-app-dev.firebaseapp.com",
  projectId: "auth-link-app-dev",
  storageBucket: "auth-link-app-dev.appspot.com",
  messagingSenderId: "157449266040",
  appId: "1:157449266040:web:d7a30d9ba320364f815e8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default app