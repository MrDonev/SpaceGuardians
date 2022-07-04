import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";

import { initializeApp } from "firebase/app";

import { getAuth, signInAnonymously } from "firebase/auth";

import { firebaseConfig } from "../firebase";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

export const SignInAsAGuest = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const signInAsGuest = () => {
    signInAnonymously(auth)
      .then((result) => {
        const uid = result.user.uid;
        setUser(uid);
        console.log(uid);
        navigate("/account");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };

  return (
    <div>
      <button onClick={signInAsGuest}>Sign in as a guest</button>
    </div>
  );
};
