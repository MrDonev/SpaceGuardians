import React from 'react';
import { UserAuth } from '../context/authContext';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { firebaseConfig } from '../firebase';
import { useContext } from 'react';
import { UserContext } from '../utils/userContext';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const HighScores = () => {
  const [score, setScore] = useState({});
  const { user } = UserAuth();
  const { currUser, setCurrUser } = useContext(UserContext);
  const [gameEnded, setGameEnded] = useState(localStorage.gameEnded);

  useEffect(() => {
    if (localStorage.score) {
      setCurrUser((currData) => {
        currData._currentValue.highScore = localStorage.getItem('score');
        currData._currentValue.username = 'ItWorksDammit';
        return currData;
      });
      localStorage.gameEnded = false;

      console.log(currUser);
    }

    onValue(ref(db, 'users'), (snapshot) => {
      const userData = snapshot.val();
      setScore(userData);
    });
  }, [gameEnded]);
  const h2Style = { 'textAlign': 'center' };
  const db = getDatabase(app);
  const scoretable = Object.values(score);
  return (
    <div id="chat">
      
      {!Object.keys(score).length ? (
        <h2 style={h2Style}>
          You must be logged in to see the highscore table!
        </h2>
      ) : (
        <div>
          
          <h2 style={h2Style}>Highest scores:</h2>
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
      )}
    </div>
  );
};

export default HighScores;
