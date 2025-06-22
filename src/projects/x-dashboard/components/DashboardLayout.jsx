/**
 * Dashboard Layout Component
 *
 * Main layout wrapper for dashboard pages that includes:
 * - Responsive sidebar with Redux state management
 * - Header with navigation and user controls
 * - Main content area with proper spacing and transitions
 *
 * Uses Redux for sidebar state to maintain consistency across page navigation
 */

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAppSelector, useAppDispatch } from "../store";
import { toggleSidebar } from "../store/slices/uiSlice";
import { Heart } from "lucide-react";
import { cn } from "../../../utils/cn";

export const DashboardLayout = ({ children }) => {
  // Get sidebar state from Redux store
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const dispatch = useAppDispatch();

  /**
   * Handle sidebar toggle with Redux action
   * This ensures sidebar state persists across page navigation
   */
  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="x-dashboard-root min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar with Redux state management */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />

      {/* Main content area with responsive margins */}
      <div className={cn("flex-1 transition-all duration-300", sidebarCollapsed ? "ml-16 " : "ml-64")}>
        {/* Header with sidebar toggle functionality */}
        <Header onToggleSidebar={handleSidebarToggle} />

        {/* Main content with responsive padding */}
        <main className="p-4 sm:p-6">{children}</main>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto text-gray-300 border-gray-300/10 border-t mt-50 py-6 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4" /> by{" "}
            <a href="https://www.linkedin.com/in/saiefalemon/" className="hover:underline">
              Saief Al Emon
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};
