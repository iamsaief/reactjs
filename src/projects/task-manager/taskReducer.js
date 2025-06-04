// src/reducer.js

export const initialState = {
  tasks: [],
  filter: "all", // 'all', 'active', 'completed'
  editingTask: null, // { id, text, completed, createdAt }
  taskToDeleteId: null,
  showConfirmDeleteModal: false,
  error: null,
  isLoading: true, // For initial load from localStorage
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      // Ensure createdAt is a number (timestamp), sort by it
      const sortedTasks = action.payload.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      return { ...state, tasks: sortedTasks, isLoading: false, error: null };

    case "ADD_TASK":
      const newTask = {
        id: crypto.randomUUID(),
        text: action.payload.text.trim(),
        completed: false,
        createdAt: Date.now(),
      };

      // Add new task to the beginning and re-sort by createdAt
      const updatedTasksAfterAdd = [newTask, ...state.tasks].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      return { ...state, tasks: updatedTasksAfterAdd, error: null };

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, completed: !task.completed } : task
        ),
      };

    case "REQUEST_DELETE":
      return {
        ...state,
        taskToDeleteId: action.payload.id,
        showConfirmDeleteModal: true,
      };

    case "CONFIRM_DELETE":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== state.taskToDeleteId),
        taskToDeleteId: null,
        showConfirmDeleteModal: false,
        error: null,
      };

    case "CANCEL_DELETE":
      return {
        ...state,
        taskToDeleteId: null,
        showConfirmDeleteModal: false,
      };

    case "START_EDIT":
      return {
        ...state,
        editingTask: action.payload.task,
      };

    case "SAVE_EDIT":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.editingTask.id ? { ...task, text: action.payload.text.trim() } : task
        ),
        editingTask: null,
        error: null,
      };

    case "CANCEL_EDIT":
      return {
        ...state,
        editingTask: null,
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload.filter,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload.message,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
