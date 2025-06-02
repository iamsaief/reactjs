import { createBrowserRouter, RouterProvider } from "react-router";

import { routesData } from "./routes";
import { HomePage } from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  ...routesData,
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
