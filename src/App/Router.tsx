import { createBrowserRouter } from "react-router-dom";
import { LoginRegisterPage } from "../Users/LoginRegister/LoginRegister.page";
import { ErrorPage } from "./ErrorPage";
import { Root } from "./Root";

export const ROUTER = createBrowserRouter([
  {
    path: process.env.REACT_APP_ROOT_ROUTE,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LoginRegisterPage />,
      },
    ],
  },
]);
