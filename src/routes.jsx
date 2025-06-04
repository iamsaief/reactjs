import Project1 from "./projects/Project1";
import Project2 from "./projects/project2";
import { TaskManager } from "./projects/task-manager";

export const routesData = [
  {
    id: "task-manager",
    path: "/projects/task-manager",
    name: "Task Manager",
    element: <TaskManager />,
    technologies: ["React", "Context API", "useReducer", "Tailwind CSS"],
    status: "Completed",
    year: "2025",
  },
  {
    id: "project-1",
    path: "/projects/project-1",
    name: "Awesome Project 1",
    element: <Project1 />,
    technologies: ["React", "Context API", "useReducer", "Tailwind CSS"],
    status: "Completed",
    year: "2024",
  },
  {
    id: "project-2",
    path: "/projects/project-2",
    name: "Cool Project 2",
    element: <Project2 />,
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    status: "Completed",
    year: "2024",
  },
];
