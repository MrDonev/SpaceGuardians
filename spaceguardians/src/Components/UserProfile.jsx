import { UserAuth } from "../context/authContext";



const UserProfile=()=>{
    const { user } = UserAuth();
    return <h1>User profile</h1>
}

export default UserProfile