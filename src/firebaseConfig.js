// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCKgVIJPSWwL4qfoldNXS5AzfYjbk-hX18",
  authDomain: "matching-algo.firebaseapp.com",
  projectId: "matching-algo",
  storageBucket: "matching-algo.appspot.com",
  messagingSenderId: "12690948043",
  appId: "1:12690948043:web:1025f31f3dd13d68d2404e",
  measurementId: "G-5CVH8P5SPJ"
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;