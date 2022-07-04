import { Link } from 'react-router-dom';
import Nav from './Nav';
import { UserAuth } from '../context/authContext';

const Header = () => {
  const { user, logout } = UserAuth();
  console.log(user.photoURL)
  return (
    <header>
      <h1>Welcome to the Space Guardians gaming community</h1>
      <section id="userLog">
        <p>Welcome, {user.displayName!==undefined ? user.displayName : 'Guest'}</p>
        {(user.displayName===undefined)?
         <><Link to="/signin">
          <button>Log in</button>
        </Link></>:
        <><img id='userPhoto' alt='userPhoto'src={user.photoURL}/>
        <Link to="/signin">
          <button>Log out</button>
        </Link>
        </>}
      </section>
      <Nav />
    </header>
  );
};

export default Header;
