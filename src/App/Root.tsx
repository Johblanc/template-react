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
