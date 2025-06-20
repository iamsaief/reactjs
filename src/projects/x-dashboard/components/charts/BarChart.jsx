import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Feb", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 6000, expenses: 9800 },
  { name: "Apr", revenue: 8000, expenses: 3908 },
  { name: "May", revenue: 7000, expenses: 4800 },
  { name: "Jun", revenue: 9000, expenses: 3800 },
];

export const DashboardBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="name" className="text-slate-600 dark:text-slate-400" />
        <YAxis className="text-slate-600 dark:text-slate-400" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--card-foreground))",
          }}
        />
        <Bar dataKey="revenue" fill="hsl(var(--chart-primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="hsl(var(--chart-tertiary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
