import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Desktop", value: 400, color: "hsl(var(--chart-primary))" },
  { name: "Mobile", value: 300, color: "hsl(var(--chart-secondary))" },
  { name: "Tablet", value: 200, color: "hsl(var(--chart-tertiary))" },
  { name: "Other", value: 100, color: "hsl(var(--chart-quaternary))" },
];

export const DashboardPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, ...props }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
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
        className="custom-tooltip"
      >
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
