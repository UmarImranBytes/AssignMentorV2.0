import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardTutor: React.FC = () => {
  // Statistics Data
  const stats = [
    { label: "Total Assignments", value: 24, color: "#fb923c" },
    { label: "Pending Reviews", value: 6, color: "#facc15" },
    { label: "Reviewed", value: 18, color: "#22c55e" },
  ];

  // Pie Chart Data
  const pieData = [
    { name: "Reviewed", value: 18 },
    { name: "Pending", value: 6 },
  ];

  const COLORS = ["#22c55e", "#facc15"];

  // Upcoming Deadlines
  const upcoming = [
    { subject: "Database Systems", dueDate: "2025-07-02" },
    { subject: "Operating Systems", dueDate: "2025-07-04" },
  ];

  // Recent Submissions
  const recentSubmissions = [
    { student: "Ali Raza", subject: "Web Development", submittedOn: "2025-06-29" },
    { student: "Fatima Khan", subject: "AI & ML", submittedOn: "2025-06-28" },
  ];

  // Admin Messages
  const adminMessages = [
    { date: "2025-06-30", message: "Reminder: Final review of OS assignments due by Friday." },
    { date: "2025-06-28", message: "New grading rubric uploaded in the Resources section." },
  ];

  return (
    <div className="p-14 space-y-7">
      <h1 className="text-2xl font-semibold">Welcome, Tutor 👋</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl shadow-md text-white"
            style={{ backgroundColor: item.color }}
          >
            <p className="text-lg">{item.label}</p>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Assignment Review Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Upcoming Deadlines</h2>
          <ul>
            {upcoming.map((item, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b last:border-b-0"
              >
                <span>{item.subject}</span>
                <span className="text-sm text-gray-600">{item.dueDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Submissions + Admin Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Recent Submissions</h2>
          <ul>
            {recentSubmissions.map((item, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b last:border-b-0"
              >
                <span>
                  {item.student} -{" "}
                  <span className="italic">{item.subject}</span>
                </span>
                <span className="text-sm text-gray-600">{item.submittedOn}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Admin Messages */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Messages from Admin</h2>
          <ul>
            {adminMessages.map((msg, index) => (
              <li
                key={index}
                className="py-2 border-b last:border-b-0"
              >
                <p className="text-sm text-gray-600">{msg.date}</p>
                <p>{msg.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardTutor;
