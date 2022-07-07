import { UserAuth } from '../context/authContext';

const UserProfile = () => {
    const h2Style={'textAlign':'center'}
  const { user } = UserAuth();

  return (
    <div id="chat">
      <div style={h2Style}>
      <h1>User profile</h1>
      {(user !== null && typeof user === 'object' && Object.keys(user).length)?
       <><p>Name: {user.displayName}</p>
       <p>e-m@il: {user.email}</p>
       <p>Created on: {user.metadata.creationTime}</p></>
   : null}</div> </div>
  );
};

export default UserProfile;
