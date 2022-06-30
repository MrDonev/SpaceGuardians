import GameComponent from "./Game.js";
import "./App.css";
import Header from "./Components/Header.jsx";
import UserProfile from "./Components/UserProfile.jsx";

import React from "react";
import Signin from "./Components/SignIn.jsx";
import Signup from "./Components/SignUp.jsx";
import Account from "./Components/Account.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/account" element={<GameComponent />} /> */}
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
      {/* <main id="main"> */}
      {/* <div id="game"> */}
      {/* <GameComponent /> */}
      {/* </div> */}
      {/* <UserProfile /> */}
      {/* </main> */}
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div>
//       <h1 className='text-center text-3xl font-bold'>
//         Arcadian Game
//       </h1>
//       <AuthContextProvider>
//         <Routes>
//           <Route path='/' element={<Signin />} />
//           <Route path='/signup' element={<Signup />} />
//           <Route
//             path='/account'
//             element={
//               <ProtectedRoute>
//                 <Account />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </AuthContextProvider>
//     </div>
//   );
// }
// export default App;
