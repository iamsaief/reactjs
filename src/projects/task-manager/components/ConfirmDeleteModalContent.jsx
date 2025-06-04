// src/components/ConfirmDeleteModalContent.jsx
import { Trash2, AlertTriangle } from "lucide-react";
import { useTaskDispatch } from "../TaskContext";

function ConfirmDeleteModalContent({ onClose }) {
  const dispatch = useTaskDispatch();

  const handleConfirmDelete = () => {
    dispatch({ type: "CONFIRM_DELETE" });
    onClose(); // Close modal after confirming
  };

  const handleCancelDelete = () => {
    dispatch({ type: "CANCEL_DELETE" });
    onClose(); // Close modal on cancel
  };

  return (
    <>
      <div className="flex items-start mb-4">
        <AlertTriangle size={28} className="text-red-500 mr-3 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-semibold text-red-400">Confirm Deletion</h2>
          <p className="text-slate-300 mt-2">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={handleCancelDelete}
          className="px-5 py-2.5 rounded-lg text-slate-300 bg-slate-700 hover:bg-slate-600/80 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmDelete}
          className="px-5 py-2.5 rounded-lg text-white bg-red-600 hover:bg-red-700 font-medium transition-colors duration-150 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <Trash2 size={18} /> Delete Task
        </button>
      </div>
    </>
  );
}

export default ConfirmDeleteModalContent;
