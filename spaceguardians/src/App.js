import GameComponent from './Game';
import './App.css';
import Header from './Components/Header';
import UserProfile from './Components/UserProfile';
function App() {
  return (
    <div className="App">
      <Header />
      <main id="main">
        <div id="game">
          <GameComponent />
        </div>
        <UserProfile />
      </main>
    </div>
  );
}

export default App;
