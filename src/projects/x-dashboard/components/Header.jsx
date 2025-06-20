/**
 * Header Component
 *
 * Top navigation bar that includes:
 * - Mobile sidebar toggle button
 * - Search functionality
 * - Theme switcher
 * - Notifications bell with badge
 * - User profile section
 *
 * Responsive design with different layouts for mobile and desktop
 */

import { useState } from "react";
import { Bell, Menu, User, Search } from "lucide-react";
import { useAppSelector } from "../store";

export const Header = ({ onToggleSidebar }) => {
  // Get notifications count from Redux store
  const notifications = useAppSelector((state) => state.ui.notifications);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  // Local state for search functionality
  const [searchValue, setSearchValue] = useState("");

  /**
   * Handle search input changes
   * TODO: Implement global search functionality
   */
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    // Future: dispatch search action to Redux
  };

  /**
   * Handle notification bell click
   * TODO: Open notifications dropdown/modal
   */
  const handleNotificationClick = () => {
    console.log("Notifications clicked");
    // Future: dispatch action to show notifications
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6">
      {/* Left section: Mobile menu + Search */}
      <div className="flex items-center space-x-4">
        {/* Mobile sidebar toggle - hidden on desktop */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>

        {/* Search input - hidden on mobile */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-48 lg:w-64 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-500
                     transition-all duration-200"
          />
        </div>
      </div>

      {/* Right section: Theme + Notifications + User */}
      <div className="flex items-center space-x-3">
        {/* Theme switcher component */}
        {/* <ThemeSwitcher /> */}

        {/* Notifications bell with badge */}
        <button
          onClick={handleNotificationClick}
          className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label={`${notifications} notifications`}
        >
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          {notifications > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 
                           flex items-center justify-center font-medium"
            >
              {notifications > 99 ? "99+" : notifications}
            </span>
          )}
        </button>

        {/* User profile section */}
        <div className="flex items-center space-x-2">
          {/* User avatar */}
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>

          {/* User name - hidden on mobile */}
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">
            {currentUser?.name || "Admin User"}
          </span>
        </div>
      </div>
    </header>
  );
};
