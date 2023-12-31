import { RouterProvider } from "react-router-dom";
import { ROUTER } from "./Router";
import { AllContexts } from "../Context/AllContexts";

import "../Style/Z_App/app.scss"

function App() {
  return (
    <div className="App theme-default">
      <AllContexts>
        <RouterProvider router={ROUTER} />
      </AllContexts>
    </div>
  );
}

export default App;
