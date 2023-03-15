import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlNzISa1I-DSRvTjxGzJrVaLpllerFq14",
  authDomain: "owtier3.firebaseapp.com",
  projectId: "owtier3",
  storageBucket: "owtier3.appspot.com",
  messagingSenderId: "544060195555",
  appId: "1:544060195555:web:c4c1f1bca4c2ccd6befbd6",
  measurementId: "G-VB7658DV0K"
};

export default firebase.initializeApp(firebaseConfig);