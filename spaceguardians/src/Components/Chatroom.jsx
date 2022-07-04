import React from "react";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { firebaseConfig } from "../firebase";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const Account = () => {
  const [individualChat, setIndividualChat] = useState({});
  const [isDisabled,setIsDisabled]=useState(true)
  const { user, logout } = UserAuth();
  useEffect(() => {
    onValue(ref(db, "messages"), (snapshot) => {
      const userData = snapshot.val();
      setIndividualChat(userData);
    });
    if(typeof user === 'object' && user != null && Object.keys(user).length !== 0){
      setIsDisabled(false);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setIsDisabled(true)
    } catch (e) {
      console.log(e.message);
    }
  };

  const checkedNew = (typeof user === 'object' && user != null && Object.keys(user).length !== 0)? user.email.split("@"[0]) : "";
  function sendMessage(e) {
    const username = checkedNew[0];
    e.preventDefault();
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    messageInput.value = "";
    document.getElementById("messages");
    set(ref(db, "messages/" + timestamp), {
      username,
      message,
    });
  }
  const db = getDatabase(app);
  const chatValues = Object.values(individualChat);

  return (
    <div id="chatContainer">
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
            <input disabled={isDisabled} placeholder="Enter message" id="message-input" type="text" />
            <button onClick={sendMessage} id="message-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
{/* 
      <button onClick={handleLogout} className="border px-6 py-2 my-4">
        Logout
      </button> */}
    </div>
  );
};

export default Account;
