import { Link ,useNavigate} from 'react-router-dom';
import Nav from './Nav';
import { UserAuth } from '../context/authContext';

const Header = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/livechat");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <header>
      <h1>Welcome to the Space Guardians gaming community</h1>
      <section id="userLog">
        <p>Welcome, {user !== null ? user.displayName : 'Guest'}</p>
        {(user===null)?
         <><Link to="/signin">
          <button>Log in</button>
        </Link></>:
        <section id='loggedUser'>
          <div id='userImgContainer'><Link to='/user'><img id='userPhoto' alt='userPhoto'src={user.photoURL}/></Link></div>
        <Link to="/signin">
          <button onClick={handleLogout}>Log out</button>
        </Link>
        </section>}
      </section>
      <Nav />
    </header>
  );
};

export default Header;
