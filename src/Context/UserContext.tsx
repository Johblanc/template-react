import React from "react";
import { TUser } from "../Types/User.type";
import { USER_DEFAULT } from "./UserDefault";

export const UserContext = React.createContext({
  user : USER_DEFAULT,
  setUser: (value: TUser) => {},
});