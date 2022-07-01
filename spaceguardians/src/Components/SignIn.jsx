import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import "../index.css";
import { SignInWithGoogle } from "./SigninWithGoogle";
import { SignInAsAGuest } from "./SignInAsAGuest";

import {
  signInWithGoogle,
  logout,
  anonymousSignIn,
  writeUserData,
} from "../firebase";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      if (e.message === "Firebase: Error (auth/wrong-password).") {
        return alert("Incorrect Password");
      } else if (e.message === "Firebase: Error (auth/user-not-found).") {
        return alert("User Not Found");
      }
    }
  };

  return (
    <div className="body">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
        <p className="py-2">
          Don't have an account yet?{" "}
          <Link to="/signup" className="underline">
            Sign up.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
          />
        </div>
        <button className="button">Sign In</button>

        <SignInWithGoogle />

        {/* <button onClick={ logout }>Sign out</button>
        <h1>signed Out</h1> */}
      </form>

      <h1>{}</h1>
    </div>
  );
};
export default Signin;
