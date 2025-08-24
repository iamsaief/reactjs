import {
  ChronoCraft,
  EliteShop,
  EliteShopProviderWrapper,
  ResumeEnhancer,
  TaskManager,
  XDashboard,
  XDashboardProviderWrapper,
} from "./projects";
import { Checkout } from "./projects/elite-shop/components/Checkout";
import { Analytics, DataTable, Settings } from "./projects/x-dashboard/pages";
import DatePickerDemo from "./components/date-picker/DatePicker";
import RecursiveFileTreeDemo from "./components/RecursiveFileTree";
import SlidingTabsDemo from "./components/SlidingTabs";

export const projectRoutesData = [
  {
    id: "10ms-ielts-course",
    path: "https://10ms-product-page.vercel.app",
    element: () => {},
    metadata: {
      name: "10MS IELTS Course",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "API Integration",
      ],
      status: "Completed",
      year: "2025",
      sourceCode: "https://github.com/iamsaief/10ms-product-page",
    },
  },
  {
    id: "task-manager",
    path: "/projects/task-manager",
    element: <TaskManager />,
    metadata: {
      name: "Task Manager",
      technologies: ["React", "Context API", "useReducer", "Tailwind CSS"],
      status: "Completed",
      year: "2025",
      sourceCode:
        "https://github.com/iamsaief/reactjs/tree/main/src/projects/task-manager",
    },
  },
  {
    id: "chrono-craft",
    path: "/projects/chrono-craft",
    element: <ChronoCraft />,
    metadata: {
      name: "Chrono Craft",
      technologies: ["React", "Context API", "useReducer", "Tailwind CSS"],
      status: "Completed",
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
      sourceCode:
        "https://github.com/iamsaief/reactjs/tree/main/src/projects/elite-shop",
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
      sourceCode:
        "https://github.com/iamsaief/reactjs/tree/main/src/projects/x-dashboard",
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

export const componentRoutesData = [
  {
    id: "recursive-file-tree",
    path: "/components/recursive-file-tree",
    element: <RecursiveFileTreeDemo />,
    metadata: {
      name: "Recursive File Tree",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      year: "2025",
      tag: "Data Structure",
    },
  },
  {
    id: "date-picker",
    path: "/components/date-picker",
    element: <DatePickerDemo />,
    metadata: {
      name: "Date Picker",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      year: "2025",
      tag: "Data Display",
    },
  },
  {
    id: "sliding-tabs",
    path: "/components/sliding-tabs",
    element: <SlidingTabsDemo />,
    metadata: {
      name: "Sliding Tabs",
      technologies: ["React", "Tailwind CSS"],
      year: "2025",
      tag: "Navigation",
    },
  },
];
