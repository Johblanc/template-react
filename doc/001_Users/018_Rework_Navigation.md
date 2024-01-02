# Rework Navigation

## scss nav

update ```src/Style/E_Markups/Nav.scss``` :

```ts
nav {
  @include get-flex("xsev", "", "", "wrap");
  @include get-background(1);

  * {
    text-decoration: none;
  }

  >div {
    @include get-flex("xsev", "", "", "wrap");
    @include get-padding("xs", "t");

    >* {
      @include get-margin("xs", "x");
      @include get-padding("xl", "x");
      @include get-padding("sm", "y");
      @include get-radius("md", "t");
      @include get-radius("no", "b");
      cursor: pointer;
    }

    &.rank {
      @include get-flex-grow(1);

      .nav-item {
        @include get-background(1);
        @include get-font-color(7);
        @include get-borders("xs", 3, "tx");
        @include get-borders("no", 3, "b");

        &.actif {
          @include get-background(2);
          @include get-font-color(7);
        }

        &:hover {
          @include get-background(3);
          @include get-font-color(7);
        }
        @include get-down-responsive("xs") {
          @include get-width("100");
        }
      }
    }
  }

  .nav-wire {
    @include get-text-align("l");
    @include get-background(1);
    @include get-borders("no");
    @include get-font-color(7);
    @include get-padding("md", "x");


    &:hover {
      @include get-background(2);
      @include get-font-color(7);
      @include get-borders("no");
    }
    
    @include get-down-responsive("xs") {
      @include get-width("100");
    }
  }
}
```

## ROUTER

update ```src/App/Router.tsx``` :

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
      {
        path: "admin",
        children: [
          {
            path: "",
            element: <div></div>,
          },
          {
            path: "promote",
            element: <div></div>,
          },
        ],
      },
    ],
  },
]);

```

## Navigation

update ```src/App/Navigation.tsx``` :

```ts
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export function Navigation() {
  const { user } = useContext(UserContext);

  const location = useLocation();

  const [division, setDivision] = useState("root");

  const ToDivision = ({
    div,
    paths,
    title,
  }: {
    div: string;
    paths: string[];
    title: string;
  }) => {
    return (
      <button
        onClick={() => setDivision(div)}
        className={
          paths.includes(location.pathname) ? "actif nav-item" : "nav-item"
        }
      >
        {title}
      </button>
    );
  };

  const ToLink = ({ path, title }: { path: string; title: string }) => {
    return (
      <Link
        className={location.pathname === path ? "actif nav-item" : "nav-item"}
        to={path}
      >
        {title}
      </Link>
    );
  };

  return (
    <nav>
      {division === "root" && (
        <div className="rank">
          <ToDivision
            div={"application"}
            paths={["/", "/users/profile", "/users"]}
            title={"Dev-Tools >"}
          />
          {user.role?.acces_level === 2 && (
            <ToDivision
              div={"admin"}
              paths={["/admin", "/admin/promote"]}
              title={"Admin >"}
            />
          )}
        </div>
      )}
      {division === "application" && (
        <>
          <button onClick={() => setDivision("root")} className={"nav-wire"}>
            {"Dev-Tools >"}
          </button>
          <div className="rank">
            <ToLink path={"/"} title={"Accueil"} />
            <ToLink path={"/users/profile"} title={"Profile"} />
            <ToLink path={"/users"} title={"Utilisateurs"} />
          </div>
        </>
      )}
      {division === "admin" && (
        <>
          <button onClick={() => setDivision("root")} className={"nav-wire"}>
            {"Admin >"}
          </button>
          <div className="rank">
            <ToLink path={"/admin"} title={"Gestion"} />
            <ToLink path={"/admin/promote"} title={"Promotion"} />
          </div>
        </>
      )}
    </nav>
  );
}

```

