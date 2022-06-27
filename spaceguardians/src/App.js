import GameComponent from './Game';
import './App.css';
import Header from './Components/Header';
import UserProfile from './Components/UserProfile';

import React from 'react';
import Signin from './Components/SignIn';
import Signup from './Components/SignUp';
import Account from './Components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
      <main id="main">
        <div id="game">
          {/* <GameComponent /> */}
        </div>
        <UserProfile />
      </main>
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
