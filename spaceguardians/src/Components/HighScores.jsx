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
      setScore(userData);
    });
  }, []);

  const db = getDatabase(app);
  const scoretable = Object.values(score);
  return (
    <div>
      {!Object.keys(score).length ? <h2>You must be logged in to see the highscore table!</h2> :
      <div>
        <div id="chat">
          <h2>Highest scores:</h2>
          <ol>
            {scoretable
              .sort((first, last) => last.highScore - first.highScore)
              .map((key, index) => {
                return (
                  <li key={index}>
                    {scoretable[index].username}: {scoretable[index].highScore}
                  </li>
                );
              })}
          </ol>
        </div>
      </div>}
    </div>
  );
};

export default HighScores;
