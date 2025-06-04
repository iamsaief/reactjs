// src/components/TaskItem.jsx
import { CheckSquare, Square, Edit3, Trash2 } from "lucide-react";
import { useTaskDispatch } from "../TaskContext";

function TaskItem({ task }) {
  const dispatch = useTaskDispatch();

  return (
    <li
      className={`flex items-center justify-between bg-slate-800/70 p-4 rounded-lg shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:bg-slate-700/80
        ${task.completed ? "opacity-60" : ""}`}
    >
      <div className="flex items-center gap-3 flex-grow min-w-0">
        <button
          onClick={() => dispatch({ type: "TOGGLE_COMPLETE", payload: { id: task.id } })}
          className={`p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
            ${
              task.completed
                ? "text-green-400 hover:text-green-300 focus:ring-green-500"
                : "text-slate-500 hover:text-sky-400 focus:ring-sky-500"
            }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? <CheckSquare size={24} /> : <Square size={24} />}
        </button>
        <span className={`flex-grow truncate ${task.completed ? "line-through text-slate-400" : "text-slate-100"}`}>
          {task.text}
        </span>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 ml-3">
        <button
          onClick={() => dispatch({ type: "START_EDIT", payload: { task: task } })}
          className="text-slate-400 hover:text-yellow-400 p-1.5 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-800 cursor-pointer"
          aria-label="Edit task"
        >
          <Edit3 size={20} />
        </button>
        <button
          onClick={() => dispatch({ type: "REQUEST_DELETE", payload: { id: task.id } })}
          className="text-slate-400 hover:text-red-400 p-1.5 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 cursor-pointer"
          aria-label="Delete task"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
