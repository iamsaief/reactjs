// src/components/TaskList.jsx
import { Filter, RotateCcw } from "lucide-react";
import { useTasks } from "../TaskContext";
import TaskItem from "./TaskItem";

function TaskList() {
  const { tasks, filter, isLoading } = useTasks();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // 'all'
  });

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <RotateCcw className="animate-spin h-10 w-10 mx-auto mb-3 text-sky-400" />
        <p className="text-slate-400 text-lg">Loading tasks...</p>
      </div>
    );
  }

  if (!filteredTasks.length) {
    return (
      <div className="text-center py-10 px-4 bg-slate-800/50 rounded-lg shadow">
        <Filter size={48} className="mx-auto mb-4 text-slate-500" />
        <p className="text-slate-400 text-xl">
          {filter === "all" && !tasks.length
            ? "No tasks yet. Add one above!"
            : filter === "active" && !tasks.some((t) => !t.completed)
            ? "No active tasks. Well done!"
            : filter === "completed" && !tasks.some((t) => t.completed)
            ? "No completed tasks yet."
            : "No tasks match the current filter."}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
