import React from "react";
import ScoreTable from "./ScoreTable";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import GameComponent from "../Game";
const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <p> {user && user.email}</p>
      <ScoreTable />
      <div className="game">{/* <GameComponent /> */}</div>
      <button onClick={handleLogout} className="border px-6 py-2 my-4">
        Logout
      </button>
    </div>
  );
};

export default Account;
