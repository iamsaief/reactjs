// src/components/EditTaskModalContent.jsx
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useTasks, useTaskDispatch } from "../TaskContext";

function EditTaskModalContent({ onClose }) {
  const { editingTask } = useTasks();
  const dispatch = useTaskDispatch();
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (editingTask) {
      setEditText(editingTask.text);
    }
  }, [editingTask]);

  const handleSaveEdit = () => {
    if (!editText.trim()) {
      return;
    }
    dispatch({ type: "SAVE_EDIT", payload: { text: editText } });
    onClose(); // Close modal after saving
  };

  return (
    <>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="w-full bg-slate-700/70 border border-slate-600 text-slate-100 placeholder-slate-400 text-lg rounded-lg p-3 mb-6 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors duration-150"
        autoFocus
      />
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose} // Use onClose prop for cancel
          className="px-5 py-2.5 rounded-lg text-slate-300 bg-slate-700 hover:bg-slate-600/80 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveEdit}
          className="px-5 py-2.5 rounded-lg text-white bg-sky-500 hover:bg-sky-600 font-medium transition-colors duration-150 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>
    </>
  );
}

export default EditTaskModalContent;
