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
            <ToLink path={"/admin"} title={"Extraction"} />
            <ToLink path={"/admin/promote"} title={"Promotion"} />
          </div>
        </>
      )}
    </nav>
  );
}
