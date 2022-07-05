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
        const p = data.split("@"[0]);

        writeUserData(p[0], p[0], data, 0);
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
    <div className="signing">
      <div>
        <h1>Sign up here</h1>
      </div>
      <form onSubmit={handleSubmit} id='signUpForm'>
        <div>
          <label>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
          />
        </div>
        <button className="button">Sign Up</button>
      </form> <p>
          Already have an account ?
          <Link to="/signin">
           <button> Sign in</button>
          </Link>
        </p>
    </div>
  );
};
export default Signup;
