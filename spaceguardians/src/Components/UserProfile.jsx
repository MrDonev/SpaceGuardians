import { UserAuth } from '../context/authContext';

const UserProfile = () => {
    const h2Style={'text-align':'center'}
  const { user } = UserAuth();
  return (
    <div id="chat">
      <h1 style={h2Style}>User profile</h1>
    </div>
  );
};

export default UserProfile;
