# Perpetual Token

update ```src\Context\AllContexts.tsx```

```ts
import { useEffect, useState } from "react";
import { USER_DEFAULT } from "./UserDefault";
import { UserContext } from "./UserContext";
import { TokenContext } from "./TokenContext";
import { Requester } from "../Utilities/Requests/Requester";

interface IAllContextsProps {
  children?: JSX.Element | JSX.Element[] | string | string[];
}
export function AllContexts({ children }: IAllContextsProps) {
  const [user, setUser] = useState(USER_DEFAULT);
  const [token, setFinalToken] = useState("");

  useEffect(() => {
    const fillUser = async () => {
      const localToken = localStorage.getItem("dt-token");
      if (localToken !== null) {
        const response = await Requester.users.update(localToken, {});
        if (response.data && response.token) {
          setUser(response.data);
          setToken(response.token);
        }
      }
    };
    fillUser();
  }, []);

  const setToken = (value: string) => {
    setFinalToken(value);
    localStorage.setItem("dt-token", value);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TokenContext.Provider value={{ token, setToken }}>
        {children}
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}
```