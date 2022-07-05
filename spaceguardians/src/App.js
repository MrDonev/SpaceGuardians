import React from 'react';
import Signin from './Components/SignIn.jsx';
import Signup from './Components/SignUp.jsx';
import Chatroom from './Components/Chatroom.jsx';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext.js';
import ProtectedRoute from './Components/ProtectedRoute.js';
import './App.css';
import Header from './Components/Header.jsx';
import GameComponent from './Game.js';
import Four04 from './Components/Four04.jsx';
import About from './Components/About.jsx';
import HighScores from './Components/HighScores.jsx';
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <main id="main">
          <div id="game">
            <GameComponent />
            {/* <button onClick={()=>document.getElementById("game").muted = true} id='mute'>mute</button> */}
          </div>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/livechat" element={<Chatroom />} />
            <Route path="/highscores" element={<HighScores />} />
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
    </div>
  );
}

export default App;
