import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { writeUserData } from "../firebase";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../firebase";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

export const SignInWithGoogle = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const username = result.user.displayName;
        const user = {
          name: name,
          email: email,
          username: username.split("@"[0]),
        };
        setUser(user);
        writeUserData(name, username, email);
        navigate("/account");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
