import { createContext } from "react";

export const UserContext = createContext({
  username: "guest",
  highScore: 0,
  rank: 0,
});
