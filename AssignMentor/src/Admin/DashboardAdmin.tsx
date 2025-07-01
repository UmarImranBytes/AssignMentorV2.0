import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

const COLORS = ["#fb923c", "#facc15", "#22c55e"];

const pieData = [
  { name: "Pending", value: 12 },
  { name: "In Review", value: 8 },
  { name: "Completed", value: 23 },
];

const barData = [
  { name: "Students", count: 120 },
  { name: "Tutors", count: 45 },
  { name: "Complaints", count: 10 },
  { name: "Assignments", count: 65 },
];

const DashboardAdmin = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>

      {/* Dashboard Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card title="Students" value="120" color="bg-blue-50" />
        <Card title="Tutors" value="45" color="bg-green-50" />
        <Card title="Assignments" value="65" color="bg-yellow-50" />
        <Card title="Complaints" value="10" color="bg-red-50" />
      </div>

      {/* Modern Reports Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Assignment Status Overview</h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">System Overview</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} barSize={40}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#fb923c" radius={[10, 10, 0, 0]}>
                <LabelList dataKey="count" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }: { title: string; value: string; color: string }) => (
  <div className={`${color} p-6 rounded-xl shadow-sm text-center`}>
    <p className="text-3xl font-extrabold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

export default DashboardAdmin;
