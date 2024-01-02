import { createBrowserRouter } from "react-router-dom";
import { ProfilePage } from "../Users/Profile";
import { ErrorPage } from "./ErrorPage";
import { Root } from "./Root";
import { AccueilPage } from "./Accueil";
import { UserUpdatePage } from "../Users/UserUpdate";
import { UserGetAll } from "../Users/UserGetAll";
import { AutoPromote } from "../Admin/AutoPromote";
import { Promote } from "../Admin/Promote";
import { GestionBdD } from "../Admin/GestionBdD";

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
        element : <AutoPromote/>,
        children: [
          {
            path: "",
            element: <GestionBdD/>,
          },
          {
            path: "promote",
            element: <Promote />,
          },
        ],
      },
    ],
  },
]);
