import React from "react";
import Signin from "./Components/SignIn.jsx";
import Signup from "./Components/SignUp.jsx";
import Account from "./Components/Account.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import './App.css';
import Header from './Components/Header.jsx';
import GameComponent from './Game.js'
import { extractScore } from "./utils/extractor.js";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header/>
        <main id='main'>
        <div id='game'>
          <GameComponent/>
          </div>
          <button onClick={extractScore}>Extract score</button></main>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
