import React from "react";
import { UserAuth } from "../context/authContext";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { firebaseConfig } from "../firebase";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const HighScores = () => {
  const [score, setScore] = useState({});
  const { user } = UserAuth();
  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      const userData = snapshot.val();
      console.log(userData);
      setScore(userData);
    });
  }, []);

  const db = getDatabase(app);
  const scoretable = Object.values(score);

  return (
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <div>
        <div id="chat">
          <ul>
            {scoretable
              .sort((first, last) => last.highScore - first.highScore)
              .map((key, index) => {
                console.log(scoretable[index]);
                return (
                  <li key={index}>
                    {scoretable[index].username}: {scoretable[index].highScore}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HighScores;
