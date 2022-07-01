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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
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
  console.log(user.email);
  const checkedNew = user.email.split("@"[0]);

  function sendMessage(e) {
    const username = checkedNew[0];
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document.getElementById("messages");
    // .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    set(ref(db, "messages/" + timestamp), {
      username,
      message,
    });
  }

  const db = getDatabase(app);
  const chatValues = Object.values(individualChat);

  return (
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <p> Hello {checkedNew[0]}</p>

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
