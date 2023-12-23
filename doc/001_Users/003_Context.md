# Typage

## USER_DEFAULT

new ```src/Context/UserDefault.tsx```

```ts
import { TUser } from "../Types/User.type";

export const USER_DEFAULT: TUser = {
  id: "",
  pseudo: "",
  image: null,
};
```


## UserContext

new ```src/Context/UserContext.tsx```

```ts
import React from "react";
import { TUser } from "../Types/User.type";
import { USER_DEFAULT } from "./UserDefault";

export const UserContext = React.createContext({
  user : USER_DEFAULT,
  setUser: (value: TUser) => {},
});
```


## TokenContext

new ```src/Context/TokenContext.tsx```

```ts
import React from "react";

export const TokenContext = React.createContext({
  token : "",
  setToken: (value: string) => {},
});
```


## AllContexts

new ```src/Context/AllContexts.tsx```

```ts
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
```


## App

update ```src/App/App.tsx```

```ts
import { RouterProvider } from "react-router-dom";
import { ROUTER } from "./Router";
import { AllContexts } from "../Context/AllContexts";

function App() {
  return (
    <div className="App">
      <AllContexts>
        <RouterProvider router={ROUTER} />
      </AllContexts>
    </div>
  );
}

export default App;

```
