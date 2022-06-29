import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import "../index.css";
import { writeUserData } from "../firebase";



const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    createUser(email, password)
      .then(() => {
        const data = email;
        return data;
      })
      .then((data) => {
        const p = data.replaceAll(".", "_");

        writeUserData(p, data, data);
        navigate("/account");
      })
      .catch((e) => {
        setError(e.message);
        if (e.message === "Firebase: Error (auth/email-already-in-use).") {
          return alert("Account already exists");
        } else {
          return alert("Wrong email or password");
        }
      });
  };
  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign up here</h1>
        <p className="py-2">
          Already have an account ?{" "}
          <Link to="/" className="underline">
            Sign in.
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
        <button className="button">Sign Up</button>
      </form>
    </div>
  );
};
export default Signup;
