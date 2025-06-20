import { DashboardLayout } from "../components/DashboardLayout";
import { StatsCard } from "../components/StatsCard";
import { DashboardWidget } from "../components/DashboardWidget";
import { User, BarChart3, Calendar, Clock } from "lucide-react";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value="12,345"
            change="+12.5%"
            trend="up"
            icon={<User className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          />
          <StatsCard
            title="Revenue"
            value="$45,678"
            change="+8.2%"
            trend="up"
            icon={<BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          />
          <StatsCard
            title="Orders"
            value="1,234"
            change="-2.4%"
            trend="down"
            icon={<Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          />
          <StatsCard
            title="Avg. Response"
            value="2.4s"
            change="+5.1%"
            trend="up"
            icon={<Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardWidget title="Revenue Trends">{/* <DashboardLineChart /> */}</DashboardWidget>
          <DashboardWidget title="Monthly Comparison">{/* <DashboardBarChart /> */}</DashboardWidget>
        </div>

        {/* Recent Activity */}
        <DashboardWidget title="Recent Activity">
          <div className="space-y-4">
            {[
              { user: "John Doe", action: "signed up", time: "2 minutes ago", type: "user" },
              { user: "Jane Smith", action: "made a purchase", time: "5 minutes ago", type: "purchase" },
              { user: "Bob Johnson", action: "updated profile", time: "10 minutes ago", type: "update" },
              { user: "Alice Brown", action: "left a review", time: "15 minutes ago", type: "review" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activity.type === "user"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : activity.type === "purchase"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : activity.type === "update"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                  }`}
                >
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </div>
    </DashboardLayout>
  );
};
