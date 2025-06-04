// src/components/AddTaskForm.jsx
import { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks, useTaskDispatch } from "../TaskContext";

function AddTaskForm() {
  const [newTaskText, setNewTaskText] = useState("");
  const { isLoading } = useTasks();
  const dispatch = useTaskDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) {
      return;
    }
    dispatch({ type: "ADD_TASK", payload: { text: newTaskText } });
    setNewTaskText("");
  };

  return (
    <form onSubmit={handleAddTask} className="mb-8 flex gap-3 items-center">
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-grow bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 text-lg rounded-lg p-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-150 shadow-sm"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!newTaskText.trim() || isLoading}
      >
        <Plus size={24} />
        <span className="sr-only">Add Task</span>
      </button>
    </form>
  );
}

export default AddTaskForm;
