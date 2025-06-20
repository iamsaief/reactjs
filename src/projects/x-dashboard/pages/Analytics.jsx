import { DashboardLayout } from "../components/DashboardLayout";
import { DashboardWidget } from "../components/DashboardWidget";
import { DashboardLineChart } from "../components/charts/LineChart";
import { DashboardBarChart } from "../components/charts/BarChart";
import { DashboardPieChart } from "../components/charts/PieChart";
import { DashboardAreaChart } from "../components/charts/AreaChart";

export const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Comprehensive analytics and insights for your business performance.
          </p>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardWidget title="Performance Trends">
            <DashboardLineChart />
          </DashboardWidget>
          <DashboardWidget title="Revenue vs Expenses">
            <DashboardBarChart />
          </DashboardWidget>
          <DashboardWidget title="Traffic Sources">
            <DashboardPieChart />
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[
                { name: "Desktop", value: "40%", color: "bg-blue-500" },
                { name: "Mobile", value: "30%", color: "bg-green-500" },
                { name: "Tablet", value: "20%", color: "bg-purple-500" },
                { name: "Other", value: "10%", color: "bg-orange-500" },
              ].map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </DashboardWidget>
          <DashboardWidget title="User Engagement">
            <DashboardAreaChart />
          </DashboardWidget>
        </div>
      </div>
    </DashboardLayout>
  );
};
