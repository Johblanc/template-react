import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();

  const [division, setDivision] = useState("");

  useEffect(()=>{
    setDivision(location.pathname.split("/")[1])
  },[location.pathname])

  return (
    <nav>
      <div className="rank-1">
        <p
          onClick={() => setDivision("users")}
          className={location.pathname.split("/")[1] === "users" ? "actif" : ""}
        >
          Utilisateur
        </p>
      </div>
      {division === "users" && (
        <div className="rank-2">
          <Link
            className={location.pathname === "/users/profile" ? "actif" : ""}
            to={"/users/profile"}
          >
            {" "}
            Mon Profile
          </Link>
          <Link
            className={location.pathname === "/users" ? "actif" : ""}
            to={"/users"}
          >
            {" "}
            Tous les utilisateurs
          </Link>
        </div>
      )}
    </nav>
  );
}
