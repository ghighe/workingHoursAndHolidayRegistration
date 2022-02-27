//Initialize Firebase in your app and create a Firebase App object:
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDQQkpqEMk7zO7ubfsoF0uF8etOjLLrgnI",
  authDomain: "pontajbd.firebaseapp.com",
  databaseURL: "https://pontajbd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pontajbd",
  storageBucket: "pontajbd.appspot.com",
  messagingSenderId: "696533925202",
  appId: "1:696533925202:web:3fc058f1a9b9fa8c5a4e8b"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);