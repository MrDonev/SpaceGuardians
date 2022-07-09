import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
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

const readUserData = () => {
  const db = getDatabase(app);
  const userRef = ref(db, "users/andy/username");

  onValue(userRef, (snapshot) => {
    const data = snapshot.val();

    console.log(data);
    return 0;
  });
};
const ScoreTable = () => {
  const [score, setScore] = useState("");

  return (
    <h1>
      Hello
      {/* {readUserData().then(() => {
        return "34";
      })} */}
    </h1>
  );
};

export default ScoreTable;
