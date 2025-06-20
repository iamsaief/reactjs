import { TaskProvider, useTaskDispatch, useTasks } from "./TaskContext"; // Import TaskProvider and useTasks
import AddTaskForm from "./components/AddTaskForm";
import FilterControls from "./components/FilterControls";
import ErrorDisplay from "./components/ErrorDisplay";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";
import EditTaskModalContent from "./components/EditTaskModalContent";
import ConfirmDeleteModalContent from "./components/ConfirmDeleteModalContent";
import { PageMeta } from "../../components/PageMeta";

// --- Main App Component (Wrapper for Context) ---
function AppContent() {
  const { editingTask, showConfirmDeleteModal, error } = useTasks();
  const dispatch = useTaskDispatch();

  // Handlers to close modals
  const handleCloseEditModal = () => {
    dispatch({ type: "CANCEL_EDIT" });
  };

  const handleCloseConfirmDeleteModal = () => {
    dispatch({ type: "CANCEL_DELETE" });
  };

  return (
    <>
      <PageMeta title="TaskManager" />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 font-inter flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-sky-500 selection:text-white">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl/[1.2] font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              Task Manager
            </h1>
            <p className="text-sm text-slate-400 mt-1">(Data saved in browser)</p>
          </header>

          {/* Error Display */}
          <ErrorDisplay message={error} />

          {/* Add Task Form */}
          <AddTaskForm />

          {/* Filter Controls */}
          <FilterControls />

          {/* Task List */}
          <TaskList />
        </div>

        {/* Modals - using the reusable Modal component */}
        <Modal
          isOpen={!!editingTask} // isOpen is true if editingTask is not null
          onClose={handleCloseEditModal}
          title="Edit Task"
        >
          <EditTaskModalContent onClose={handleCloseEditModal} />
        </Modal>

        <Modal
          isOpen={showConfirmDeleteModal}
          onClose={handleCloseConfirmDeleteModal}
          showCloseButton={false} // No "X" button for delete confirmation
        >
          <ConfirmDeleteModalContent onClose={handleCloseConfirmDeleteModal} />
        </Modal>

        {/* Basic CSS for modal animations (can be inlined or in a <style> tag if preferred) */}
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes scaleUp {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out forwards;
          }
          .animate-scaleUp {
            animation: scaleUp 0.2s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
}

// The main App component that wraps AppContent with TaskProvider
export function TaskManager() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}
