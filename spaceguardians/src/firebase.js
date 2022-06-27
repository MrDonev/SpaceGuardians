import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInAnonymously,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfU9SJ5JQ4m47DI_wtZiG-xdFHlZ73rvE",
  authDomain: "spaceguardians-d5924.firebaseapp.com",
  projectId: "spaceguardians-d5924",
  storageBucket: "spaceguardians-d5924.appspot.com",
  messagingSenderId: "27183731871",
  appId: "1:27183731871:web:655c6b31483b83d9f37eaa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const userPhotoUrl = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("userPhotoUrl", userPhotoUrl);
    })
    .catch((error) => {
      alert(error);
    });
};
export const anonymousSignIn = () => {
  signInAnonymously(auth)
    .then((result) => {
      console.log(result);
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

// export const logout = () => {
//   auth.signOut()
//   // signOut(auth)
//   .then((result) => {
//     console.log(result, "<<< result");
//   })
//   .catch((error) => {
//     alert(error);
//   })
// }
