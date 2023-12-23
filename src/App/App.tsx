import { RouterProvider } from "react-router-dom";
import { ROUTER } from "./Router";
import { AllContexts } from "../Context/AllContexts";

function App() {
  return (
    <div className="App">
      <AllContexts>
        <RouterProvider router={ROUTER} />
      </AllContexts>
    </div>
  );
}

export default App;
