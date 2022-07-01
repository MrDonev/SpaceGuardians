import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
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

const database = getDatabase(app);

// export const anonymousSignIn = () => {
//   signInAnonymously(auth)
//     .then((result) => {
//       const uid = result.user.uid;

//       localStorage.setItem("uid", uid);

//       alert(`Hello Stranger ${uid}`);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorMessage);
//       // ...
//     });
// };

export const writeUserData = (userId, name, email) => {
  const db = getDatabase(app);
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    highScore: 0,
  });
};

// reading the user data from the Firebase Realtime db
function callUser(data) {
  console.log(data);
  return data;
}

export const readUserData = (userId) => {
  const db = getDatabase(app);
  const userRef = ref(db, "users/" + userId + "/username");

  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });
};
