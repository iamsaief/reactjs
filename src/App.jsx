import { createBrowserRouter, RouterProvider } from "react-router";
import Project1 from "./projects/project1";
import Project2 from "./projects/project2";
import HomePage from "./pages/Home";

const routesData = [
  {
    id: "project-1",
    path: "/projects/project-1",
    name: "Awesome Project 1",
    element: <Project1 />,
  },
  {
    id: "project-2",
    path: "/projects/project-2",
    name: "Cool Project 2",
    element: <Project2 />,
  },
];

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
