import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA3zbUkWwWdOWtttaV1lK9roAKJ2Zwe2i4",
  authDomain: "auth-link-app-dev.firebaseapp.com",
  projectId: "auth-link-app-dev",
  storageBucket: "auth-link-app-dev.appspot.com",
  messagingSenderId: "157449266040",
  appId: "1:157449266040:web:d7a30d9ba320364f815e8d",
};

const app = initializeApp(firebaseConfig);


export const Storage = getStorage(app);
export const auth = getAuth(app);
export default app;
