import { createBrowserRouter, RouterProvider } from "react-router";

import { componentRoutesData, projectRoutesData } from "./routes";
import { HomePage } from "./pages/home";
import { LayoutProject } from "./pages/home/LayoutProject";
import { LayoutComponent } from "./pages/home/LayoutComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <LayoutProject />,
      },
      {
        path: "projects",
        element: <LayoutProject />,
      },
      {
        path: "components",
        element: <LayoutComponent />,
      },
    ],
  },
  ...projectRoutesData,
  ...componentRoutesData,
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
