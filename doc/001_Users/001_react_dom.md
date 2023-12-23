# React dom

## Installation

```Shell
npm install react-router-dom
```

```Shell
npm install --save @types/react-router-dom
```

## Root

new ```src\App\Root.tsx```

```ts
import { Outlet } from "react-router-dom";

export function Root () {
  
  return (
    <div>
      <p>Root</p>
      <Outlet/>
    </div>
  )
}
```

## ErrorPage

new ```src\App\ErrorPage.tsx```

```ts
import { useRouteError } from "react-router-dom";

export function ErrorPage () {
  const error= useRouteError() as {statusText? : string , message : string} ;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```

## LoginRegisterPage

new ```src\Users\LoginRegister\LoginRegister.page.tsx```


```ts
export function LoginRegisterPage () {
  
  return (
    <div>
      LoginRegisterPage
    </div>
  )
}
```


## ROUTER

new ```src\App\Router.tsx```

```ts
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
```


## App

update ```src\App\App.tsx```

```ts
import { RouterProvider } from "react-router-dom";
import { ROUTER } from "./Router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={ROUTER} />
    </div>
  );
}

export default App;
```


