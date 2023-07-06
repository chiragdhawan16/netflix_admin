
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnaQYkQrKbbiTE-ez3VbSZ4i9HlhxqxYA",
  authDomain: "netflix-f3af8.firebaseapp.com",
  projectId: "netflix-f3af8",
  storageBucket: "netflix-f3af8.appspot.com",
  messagingSenderId: "2731307854",
  appId: "1:2731307854:web:9d29ffc8b4e96187f3641f"
};


const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)