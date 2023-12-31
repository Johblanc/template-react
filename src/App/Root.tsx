import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";
import { Login } from "../Users/Connection/Login";
import { Register } from "../Users/Connection/Register";
import { Navigation } from "./Navigation";

export function Root() {
  const { token } = useContext(TokenContext);

  return (
    <>
      <header>
        <h1>Dev-Tools</h1>
      </header>
      {token === "" && (
        <div className="connection-sections">
          <Login />
          <Register />
        </div>
      )}
      {token !== "" && (
        <>
          <Navigation/>
          <Outlet />
        </>
      )}
    </>
  );
}
