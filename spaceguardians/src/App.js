import React, { useState, createContext } from "react";
import Signin from "./Components/SignIn.jsx";
import Signup from "./Components/SignUp.jsx";
import Chatroom from "./Components/Chatroom.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import "./App.css";
import Header from "./Components/Header.jsx";
import GameComponent from "./Game.js";
import Four04 from "./Components/Four04.jsx";
import Home from "./Components/Home.jsx";
import HighScores from "./Components/HighScores.jsx";
import UserProfile from "./Components/UserProfile.jsx";
import GameArticles from "./Components/GameArticles.jsx";
import { UserContext } from "./utils/userContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState(UserContext);

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <AuthContextProvider>
          <Header />
          <main id="main">
            <div id="game">
              <GameComponent />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<GameArticles />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/livechat" element={<Chatroom />} />
              <Route path="/highscores" element={<HighScores />} />
              <Route path="/user" element={<UserProfile />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Chatroom />
                  </ProtectedRoute>
                }
              />
              <Route path="/*" element={<Four04 />} />
            </Routes>
          </main>
        </AuthContextProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
