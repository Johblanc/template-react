import { useState } from "react";
import { USER_DEFAULT } from "./UserDefault";
import { UserContext } from "./UserContext";
import { TokenContext } from "./TokenContext";

interface IAllContextsProps {
  children? : JSX.Element | JSX.Element[] | string | string[]
}
export function AllContexts({children}:IAllContextsProps) {
  const [user, setUser] = useState(USER_DEFAULT);
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TokenContext.Provider value={{ token, setToken }}>
        {children}
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}
