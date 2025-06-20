import { DashboardLayout } from "../components/DashboardLayout";

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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dolore dolorem dolor adipisci vitae
          explicabo tempore nihil magni, minima consequatur?
        </div>
      </div>
    </DashboardLayout>
  );
};
