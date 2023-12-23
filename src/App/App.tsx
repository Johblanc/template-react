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
