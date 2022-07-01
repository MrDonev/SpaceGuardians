import React from "react";
import ScoreTable from "./ScoreTable";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  serverTimestamp,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

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
const db = getDatabase(app);
const Account = () => {
  const [individualChat, setIndividualChat] = useState({});
  const { user, logout } = UserAuth();
  useEffect(() => {
    onValue(ref(db, "messages"), (snapshot) => {
      const userData = snapshot.val();
      setIndividualChat(userData);
    });
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  function sendMessage(e) {
    const username = prompt("Please Tell Us Your Name");
    document
      .getElementById("message-form")
      .addEventListener("submit", sendMessage);
    e.preventDefault();
    const timestamp = serverTimestamp();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    messageInput.value = "";

    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    set(ref(db, "messages/" + username), {
      username,
      message,
      timestamp,
    });
  }

  const db = getDatabase(app);
  const chatValues = Object.values(individualChat);
  function sortascending() {}
  return (
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <p> {user && user.email}</p>
      <ScoreTable />
      <div className="game">{/* <GameComponent /> */}</div>
      <div>
        <div id="chat">
          <ul className="frame" id="messages">
            {chatValues
              .sort((first, last) => first.timestamp - last.timestamp)
              .map((key, index) => {
                return (
                  <li className="list" key={index}>
                    {chatValues[index].username}: {chatValues[index].message}
                  </li>
                );
              })}
          </ul>

          <form id="message-form">
            <input placeholder="Enter message" id="message-input" type="text" />
            <button onClick={sendMessage} id="message-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>

      <button onClick={handleLogout} className="border px-6 py-2 my-4">
        Logout
      </button>
    </div>
  );
};

export default Account;
