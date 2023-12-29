# Routage

## AccueilPage

new ```src/App/Accueil.tsx```

```ts
export function AccueilPage () {
  
  return (
    <div>
      Page d'Accueil
    </div>
  )
}
```

## ROUTER

update ```src/App/Router.tsx```

```ts
import { createBrowserRouter } from "react-router-dom";
import { ProfilePage } from "../Users/Profile";
import { ErrorPage } from "./ErrorPage";
import { Root } from "./Root";
import { AccueilPage } from "./Accueil";
import { UserUpdatePage } from "../Users/UserUpdate";
import { UserGetAll } from "../Users/UserGetAll";

export const ROUTER = createBrowserRouter([
  {
    path: process.env.REACT_APP_ROOT_ROUTE,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <AccueilPage />,
      },
      {
        path: "users",
        children: [
          {
            path: "",
            element: <UserGetAll />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "update",
            element: <UserUpdatePage />,
          },
        ],
      },
    ],
  },
]);
```

## Navigation

new ```src/App/Navigation.tsx```

```ts
import { Link } from "react-router-dom";

export function Navigation () {
  
  return (
    <nav>
      <details open>
        <summary>Utilisateurs</summary>
        <ul>
          <li><Link to={"/users/profile"}> Mon Profile</Link></li>
          <li><Link to={"/users"}> Tous les utilisateurs</Link></li>
        </ul>
      </details>
    </nav>
  )
}
```

## Root

update ```src/App/Root.tsx```

```ts
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";
import { Login } from "../Users/Connection/Login";
import { Register } from "../Users/Connection/Register";
import { Navigation } from "./Navigation";

export function Root() {
  const { token } = useContext(TokenContext);

  return (
    <div>
      <h1>Dev-Tools</h1>
      {token === "" && (
        <>
          <Login />
          <Register />
        </>
      )}
      {token !== "" && (
        <>
          <Navigation/>
          <Outlet />
        </>
      )}
    </div>
  );
}
```
