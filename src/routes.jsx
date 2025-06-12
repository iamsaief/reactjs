import { EliteShop, TaskManager } from "./projects";
import { ShoppingProvider } from "./projects/elite-shop/ShoppingContext";
import Project1 from "./projects/Project1";
import Project2 from "./projects/project2";

const EliteShopProviderWrapper = ({ children }) => <ShoppingProvider>{children}</ShoppingProvider>;

export const routesData = [
  {
    id: "task-manager",
    path: "/projects/task-manager",
    element: <TaskManager />,
    metadata: {
      name: "Task Manager",
      technologies: ["React", "Context API", "useReducer", "Tailwind CSS"],
      status: "Completed",
      year: "2025",
    },
  },
  {
    id: "elite-shop",
    path: "/projects/elite-shop",
    element: <EliteShop />,
    metadata: {
      name: "Elite Shop",
      technologies: ["React", "Context API", "useReducer", "Tailwind CSS"],
      status: "In Progress",
      year: "2025",
    },
  },
  {
    path: "/projects/elite-shop/checkout",
    element: (
      <EliteShopProviderWrapper>
        <Checkout />
      </EliteShopProviderWrapper>
    ),
  },
  {
    id: "project-1",
    path: "/projects/project-1",
    element: <Project1 />,
    metadata: {
      name: "Awesome Project 1",
      technologies: ["React", "Context API", "useReducer", "Tailwind CSS"],
      status: "Completed",
      year: "2024",
    },
  },
  {
    id: "project-2",
    path: "/projects/project-2",
    element: <Project2 />,
    metadata: {
      name: "Cool Project 2",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      status: "Completed",
      year: "2024",
    },
  },
];
