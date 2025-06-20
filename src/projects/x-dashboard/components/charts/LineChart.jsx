import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 400, users: 240 },
  { name: "Feb", value: 300, users: 139 },
  { name: "Mar", value: 600, users: 980 },
  { name: "Apr", value: 800, users: 390 },
  { name: "May", value: 700, users: 480 },
  { name: "Jun", value: 900, users: 380 },
];

export const DashboardLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="name" className="text-slate-600 dark:text-slate-400" />
        <YAxis className="text-slate-600 dark:text-slate-400" />
        <Tooltip
          contentStyle={{
            padding: "10px",
            backgroundColor: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            textTransform: "capitalize",
            fontSize: "0.8rem",
            lineHeight: "1",
            display: "grid",
            gap: "5px",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--chart-primary))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--chart-primary))", strokeWidth: 2, r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="hsl(var(--chart-secondary))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--chart-secondary))", strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
