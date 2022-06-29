import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  // signOut,
  signInAnonymously,
} from "firebase/auth";
import { useState } from "react";

import testfunc1 from './Components/SignUp.jsx';


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
export default app;

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      const name = result.user.displayName;
      const email = result.user.email;
      const username = result.user.displayName;
      writeUserData(name, username, email);
    })
    .catch((error) => {
      alert(error);
    });
};

export const anonymousSignIn = () => {
  signInAnonymously(auth)
    .then((result) => {
      console.log(result, "<<< result in signInAnonymously");
      const uid = result.user.uid;

      localStorage.setItem("uid", uid);

      alert(`Hello Stranger ${uid}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
};

export const writeUserData = (userId, name, email) => {
  const db = getDatabase(app);
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
  });
};

// reading the user data from the Firebase Realtime db

var cont3;

function updateSomething(something) {
  testfunc1 = something;
}

export const readUserData = (userId) => {

  const db = getDatabase(app);
  console.log(db, "<<< db");
  const userRef = ref(db, "users/" + userId + "/email");
  console.log(userRef, "<<< userRef");

 let d;

  onValue(userRef, (snapshot) => {

    const data = snapshot.val();

    const cont2 = updateSomething(data);
    cont3 = cont2;

    localStorage.setItem('emailLocal',data);
  });
  
};

// localStorage.setItem('info',info)
// //outside the firebase function
// localStorage.getItem('info');


// async getLoggedInUser(id: string): Promise<User> {
//   const db = getDatabase();
//   var user: User;
//   const snapshot = await get(ref(db, '/users/' + id))
//   user = snapshot.val();
//   return user;
// }


const temp = readUserData("andy"); 
console.log(temp, "<<< end");
