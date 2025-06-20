import { EliteShop, TaskManager, XDashboard, XDashboardProviderWrapper } from "./projects";
import { Checkout } from "./projects/elite-shop/components/Checkout";
import { ShoppingProvider } from "./projects/elite-shop/ShoppingContext";
import { Analytics } from "./projects/x-dashboard/pages";

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
    id: "x-dashboard",
    path: "/projects/x-dashboard",
    element: <XDashboard />,
    metadata: {
      name: "X Dashboard",
      technologies: ["React", "Redux", "React Toolkit", "Tailwind CSS"],
      status: "In Progress",
      year: "2025",
    },
  },
  {
    path: "/projects/x-dashboard/analytics",
    element: (
      <XDashboardProviderWrapper>
        <Analytics />
      </XDashboardProviderWrapper>
    ),
  },
];
