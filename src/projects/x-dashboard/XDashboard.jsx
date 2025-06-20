/**
 * Root App Component
 *
 * Main application component that sets up the provider hierarchy including:
 * - Redux store provider for global state management
 * - React Query for server state management
 * - Theme provider for dark/light mode
 * - Toast notifications and tooltips
 * - Routing configuration
 */

import { Provider } from "react-redux";
import { store } from "./store";

export const XDashboard = () => {
  return (
    <>
      <Provider store={store}>X Dashboard</Provider>
    </>
  );
};
