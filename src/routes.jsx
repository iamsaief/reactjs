import { ChronoCraft, EliteShop, ResumeEnhancer, TaskManager, XDashboard, XDashboardProviderWrapper } from "./projects";
import { Checkout } from "./projects/elite-shop/components/Checkout";
import { ShoppingProvider } from "./projects/elite-shop/ShoppingContext";
import { Analytics, DataTable, Settings } from "./projects/x-dashboard/pages";

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
      sourceCode: "https://github.com/iamsaief/reactjs/tree/main/src/projects/task-manager",
    },
  },
  {
    id: "chrono-craft",
    path: "/projects/chrono-craft",
    element: <ChronoCraft />,
    metadata: {
      name: "Chrono Craft",
      technologies: ["React", "Context API", "useReducer", "Tailwind CSS"],
      status: "In Progress",
      year: "2025",
      sourceCode: `https://github.com/iamsaief/reactjs/tree/main/src/projects/chrono-craft`,
    },
  },
  {
    id: "elite-shop",
    path: "/projects/elite-shop",
    element: <EliteShop />,
    metadata: {
      name: "Elite Shop",
      technologies: ["React", "Context API", "useReducer", "Tailwind CSS"],
      status: "Completed",
      year: "2025",
      sourceCode: "https://github.com/iamsaief/reactjs/tree/main/src/projects/elite-shop",
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
      technologies: ["React", "Redux", "Redux-Toolkit", "Tailwind CSS"],
      status: "Completed",
      year: "2025",
      sourceCode: "https://github.com/iamsaief/reactjs/tree/main/src/projects/x-dashboard",
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
  {
    path: "/projects/x-dashboard/settings",
    element: (
      <XDashboardProviderWrapper>
        <Settings />
      </XDashboardProviderWrapper>
    ),
  },
  {
    path: "/projects/x-dashboard/data",
    element: (
      <XDashboardProviderWrapper>
        <DataTable />
      </XDashboardProviderWrapper>
    ),
  },
  {
    id: "resume-enhancer",
    path: "/projects/resume-enhancer",
    element: <ResumeEnhancer />,
    metadata: {
      name: "Resume Enhancer",
      technologies: ["React", "Redux", "Redux-Toolkit", "Tailwind CSS"],
      status: "In Progress",
      year: "2025",
      sourceCode: `https://github.com/iamsaief/reactjs/tree/main/src/projects/resume-enhancer`,
    },
  },
];
