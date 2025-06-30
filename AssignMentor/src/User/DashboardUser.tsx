import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import {
  CalendarDays,
  ClipboardList,
  FilePlus,
  Clock,
  MessageSquare,
  User,
  Settings as SettingsIcon,
} from "lucide-react";
import { Link } from "react-router";

const COLORS = {
  Active: "#fb923c",
  Pending: "#facc15",
  Completed: "#22c55e",
};

type AssignmentStatus = "Active" | "Pending" | "Completed";

interface Assignment {
  id: number;
  description: string;
  deadline: string;
  price: number;
  status: AssignmentStatus;
}

export default function StudentDashboard() {
  const userName = "Bheek Manga";

  // Dummy Data (replace with API later if needed)
  const [assignments] = useState<Assignment[]>([
    {
      id: 1,
      description: "Math Homework",
      deadline: "2025-07-01",
      price: 500,
      status: "Active",
    },
    {
      id: 2,
      description: "AI Project Report",
      deadline: "2025-06-25",
      price: 1000,
      status: "Completed",
    },
    {
      id: 3,
      description: "Database Task",
      deadline: "2025-07-05",
      price: 750,
      status: "Pending",
    },
  ]);

  const countByStatus = (status: AssignmentStatus) =>
    assignments.filter((a) => a.status === status).length;

  const pieData = (["Active", "Pending", "Completed"] as AssignmentStatus[]).map(
    (status) => ({
      name: status,
      value: countByStatus(status),
    })
  );

  return (
    <div className="pt-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-500">
              🎓 Student Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Welcome back, <span className="font-medium">{userName}</span>
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current date: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats and Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pieData.map((item) => (
                <div
                  key={item.name}
                  className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4"
                  style={{ borderLeftColor: COLORS[item.name as AssignmentStatus] }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${COLORS[item.name as AssignmentStatus]}20` }}
                    >
                      <ClipboardList 
                        size={20} 
                        style={{ color: COLORS[item.name as AssignmentStatus] }} 
                      />
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {item.name}
                      </h2>
                      <p className="text-xl font-semibold">
                        {item.value} <span className="text-sm font-normal text-gray-500">assignments</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FilePlus size={18} /> Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <DashboardCard title="Post Assignment" icon={<FilePlus size={18} />} to="/dashboard/student/postassignments" />
                <DashboardCard title="View Assignments" icon={<ClipboardList size={18} />} to="/dashboard/student/viewassignments" />
                <DashboardCard title="Submissions" icon={<Clock size={18} />} to="/dashboard/student/recentassignments" />
                <DashboardCard title="Calendar" icon={<CalendarDays size={18} />} to="/dashboard/student/calendar" />
              </div>
            </div>

            {/* Assignments Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <ClipboardList size={18} /> Your Assignments
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left">Description</th>
                      <th className="px-4 py-3 text-left">Deadline</th>
                      <th className="px-4 py-3 text-left">Price</th>
                      <th className="px-4 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-700">
                    {assignments.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-3 font-medium">{a.description}</td>
                        <td className="px-4 py-3">
                          {new Date(a.deadline).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-4 py-3">Rs. {a.price}</td>
                        <td className="px-4 py-3">
                          <span 
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${COLORS[a.status]}20`,
                              color: COLORS[a.status]
                            }}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {assignments.length === 0 && (
                      <tr>
                        <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>
                          No assignments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Chart and Navigation */}
          <div className="space-y-6">
            {/* Progress Chart */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ClipboardList size={18} /> Assignment Status
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {pieData.map((entry, i) => (
                        <Cell
                          key={`cell-${i}`}
                          fill={COLORS[entry.name as AssignmentStatus]}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} assignments`, 'Count']}
                    />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      iconSize={8}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <SettingsIcon size={18} /> Navigation
              </h2>
              <div className="space-y-2">
                <NavLink title="My Profile" icon={<User size={16} />} to="/dashboard/student/profile" />
                <NavLink title="Settings" icon={<SettingsIcon size={16} />} to="/dashboard/student/settings" />
                <NavLink title="Complaints" icon={<MessageSquare size={16} />} to="/dashboard/student/complaint" />
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CalendarDays size={18} /> Upcoming Deadlines
              </h2>
              <div className="space-y-3">
                {assignments
                  .filter(a => a.status !== "Completed")
                  .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                  .slice(0, 3)
                  .map(a => (
                    <div key={a.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      </div>
                      <div>
                        <p className="font-medium">{a.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Due: {new Date(a.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                {assignments.filter(a => a.status !== "Completed").length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming deadlines</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  icon,
  to,
}: {
  title: string;
  icon: React.ReactNode;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors group"
    >
      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50">
        {icon}
      </div>
      <span className="text-xs font-medium text-center">{title}</span>
    </Link>
  );
}

function NavLink({
  title,
  icon,
  to,
}: {
  title: string;
  icon: React.ReactNode;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-700 dark:text-gray-300"
    >
      <div className="text-orange-500">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
}