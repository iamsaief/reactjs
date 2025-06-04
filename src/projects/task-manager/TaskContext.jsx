// src/TaskContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, taskReducer } from "./taskReducer";

// Create two separate contexts
export const TaskStateContext = createContext(undefined);
export const TaskDispatchContext = createContext(undefined);

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // --- Load tasks from localStorage on initial render ---
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: { isLoading: true } });
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        dispatch({ type: "SET_TASKS", payload: parsedTasks });
      } else {
        dispatch({ type: "SET_LOADING", payload: { isLoading: false } });
      }
    } catch (e) {
      console.error("Failed to load tasks from localStorage", e);
      dispatch({
        type: "SET_ERROR",
        payload: {
          message: "Could not load your saved tasks. They might be corrupted or localStorage is unavailable.",
        },
      });
      dispatch({ type: "SET_LOADING", payload: { isLoading: false } });
    }
  }, []); // Empty dependency array means this runs once on mount

  // --- Save tasks to localStorage whenever tasks array changes ---
  useEffect(() => {
    // Only save if not in the initial loading phase and tasks have been potentially set
    if (!state.isLoading) {
      try {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        dispatch({ type: "CLEAR_ERROR" }); // Clear error if saving was successful
      } catch (e) {
        console.error("Failed to save tasks to localStorage", e);
        dispatch({
          type: "SET_ERROR",
          payload: {
            message:
              "Could not save tasks. Changes might not persist if you close the browser. Ensure localStorage is enabled and not full.",
          },
        });
      }
    }
  }, [state.tasks, state.isLoading]);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

// Export custom hooks for easier consumption
export function useTasks() {
  const context = useContext(TaskStateContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}

export function useTaskDispatch() {
  const context = useContext(TaskDispatchContext);
  if (context === undefined) {
    throw new Error("useTaskDispatch must be used within a TaskProvider");
  }
  return context;
}
