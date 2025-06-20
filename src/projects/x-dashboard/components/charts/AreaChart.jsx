import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", visitors: 4000, pageViews: 2400 },
  { name: "Feb", visitors: 3000, pageViews: 1398 },
  { name: "Mar", visitors: 6000, pageViews: 9800 },
  { name: "Apr", visitors: 8000, pageViews: 3908 },
  { name: "May", visitors: 7000, pageViews: 4800 },
  { name: "Jun", visitors: 9000, pageViews: 3800 },
];

export const DashboardAreaChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0.1} />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="hsl(var(--chart-primary))"
          fillOpacity={1}
          fill="url(#colorVisitors)"
        />
        <Area
          type="monotone"
          dataKey="pageViews"
          stroke="hsl(var(--chart-secondary))"
          fillOpacity={1}
          fill="url(#colorPageViews)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
