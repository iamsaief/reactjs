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
import { Dashboard } from "./pages";
import { ThemeProvider } from "./context/ThemeContext";
import { PageMeta } from "../../components/PageMeta";
import "./style.css";

export const XDashboardProviderWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export const XDashboard = () => {
  return (
    <XDashboardProviderWrapper>
      <PageMeta title="XDashboard" />
      <Dashboard />
    </XDashboardProviderWrapper>
  );
};
