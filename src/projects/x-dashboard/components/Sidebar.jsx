import { LayoutDashboard, BarChart3, List, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const navigation = [
  { name: "Dashboard", href: "/projects/x-dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/projects/x-dashboard/analytics", icon: BarChart3 },
  { name: "Data Table", href: "/projects/x-dashboard/data", icon: List },
  { name: "Settings", href: "/projects/x-dashboard/settings", icon: Settings },
];

export const Sidebar = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 z-30 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="h-16 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        {!collapsed && (
          <h1 className="text-xl font-bold text-slate-900 dark:text-white animate-fade-in">X Dashboard</h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          )}
        </button>
      </div>

      <nav className="mt-6 px-2">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const IconComponent = item.icon;

            return (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all- duration-200 ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3 animate-fade-in">{item.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
