import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";
import { UserContext } from "../../Context/UserContext";
import { USER_DEFAULT } from "../../Context/UserDefault";

export function Disconnect() {
  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);

  const handleDisconnect = () => {
    setUser(USER_DEFAULT);
    setToken("");
  };

  return <button className="theme-bad" onClick={handleDisconnect}>Deconnection</button>;
}
