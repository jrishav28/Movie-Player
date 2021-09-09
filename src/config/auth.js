import firebase from "./firebase-config";
import React, { useState } from "react";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const sign_in = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
const sign_out = () => {
  const auth = getAuth();
  console.log("signout");
  return signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signout success");
      localStorage.removeItem("user");
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
};
export { sign_out };
export default sign_in;
