import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDsNvn6WUpcZ4-fVKxwX2DfX-dOHVU7H-A",
  authDomain: "movie---player.firebaseapp.com",
  projectId: "movie---player",
  storageBucket: "movie---player.appspot.com",
  messagingSenderId: "954770985772",
  appId: "1:954770985772:web:b4b79742c4acc118aa1289",
  measurementId: "G-21LMMR6MCB",
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
