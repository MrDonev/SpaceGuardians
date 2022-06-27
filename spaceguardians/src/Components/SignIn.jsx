import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../index.css";

import { signInWithGoogle, logout, anonymousSignIn } from "../firebase";

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

        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <h1>{localStorage.getItem("name")}</h1>
        <h1>{localStorage.getItem("email")}</h1>
        <img src={localStorage.getItem("userPhotoUrl")} alt="user photo" />
        {/* <button onClick={ logout }>Sign out</button>
        <h1>signed Out</h1> */}
      </form>
      <button onClick={anonymousSignIn}>Sign in as a guest</button>
      <h1>{}</h1>
    </div>
  );
};
export default Signin;
