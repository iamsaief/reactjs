/**
 * DashboardWidget Component
 *
 * A reusable widget container for dashboard sections with consistent styling.
 * Supports optional icons in the header for better visual hierarchy.
 *
 * @param title - The widget title displayed in the header
 * @param children - The content to render inside the widget
 * @param className - Additional CSS classes for customization
 * @param icon - Optional icon to display next to the title
 */

export const DashboardWidget = ({ title, children, className = "", icon }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-slate-200 dark:border-slate-700 p-6 ${className}`}
    >
      <div className="flex items-center space-x-2 mb-4">
        {icon && <div className="p-1 text-slate-900 dark:text-white">{icon}</div>}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
};
