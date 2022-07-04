import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <section id="nav">
      <Link to="/highscores">
        <button>Highscore Table</button>
      </Link>{' '}
      <Link to="/livechat">
        <button>Live Chatroom</button>
      </Link>
    </section>
  );
};

export default Nav;
