import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import "../index.css";
import {writeUserData} from "../firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
  } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyAfU9SJ5JQ4m47DI_wtZiG-xdFHlZ73rvE",
    authDomain: "spaceguardians-d5924.firebaseapp.com",
    projectId: "spaceguardians-d5924",
    storageBucket: "spaceguardians-d5924.appspot.com",
    messagingSenderId: "27183731871",
    appId: "1:27183731871:web:655c6b31483b83d9f37eaa",
    databaseURL:
      "https://spaceguardians-d5924-default-rtdb.europe-west1.firebasedatabase.app/",
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export default app;
  


export const SignInAsAGuest = () => {

    const [user, setUser] = useState('')
    const navigate = useNavigate();
    
    

  const signInAsGuest = () => {
    signInAnonymously(auth)
    .then((result) => {
      const uid = result.user.uid;
      setUser(uid)
      console.log(uid);
      navigate('/account')
    })
    .catch((error) => {
      const errorCode = error.code;
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

