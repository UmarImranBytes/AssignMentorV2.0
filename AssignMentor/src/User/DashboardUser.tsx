import { useEffect, useState } from "react";
import axios from "axios";
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
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const COLORS: Record<string, string> = {
  Active: "#fb923c",
  Pending: "#facc15",
  Completed: "#22c55e",
};

type AssignmentStatus = "Active" | "Pending" | "Completed";

interface Assignment {
  _id: string;
  description: string;
  deadline: string;
  price: number;
  status: AssignmentStatus;
}

const normalizeStatus = (status: string): AssignmentStatus => {
  const s = status.toLowerCase();
  if (s === "active") return "Active";
  if (s === "pending") return "Pending";
  if (s === "completed") return "Completed";
  return "Pending"; // default fallback
};

export default function StudentDashboard() {
  const userName = "Bheek Manga";

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAssignments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/assignments/student");
      const normalized = res.data.map((a: any) => ({
        ...a,
        status: normalizeStatus(a.status),
      }));
      setAssignments(normalized || []);
    } catch (err) {
      setError("Failed to load assignments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

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
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-300 py-20">
            Loading assignments...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 dark:text-red-400 py-20">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pieData.map((item) => (
                  <div
                    key={item.name}
                    className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4"
                    style={{ borderLeftColor: COLORS[item.name] }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${COLORS[item.name]}20` }}
                      >
                        <ClipboardList
                          size={20}
                          style={{ color: COLORS[item.name] }}
                        />
                      </div>
                      <div>
                        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {item.name}
                        </h2>
                        <p className="text-xl font-semibold">
                          {item.value}{" "}
                          <span className="text-sm font-normal text-gray-500">
                            assignments
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b dark:border-gray-700 flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <ClipboardList size={18} /> Your Assignments
                  </h2>
                  <button
                    className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 text-sm"
                    onClick={fetchAssignments}
                  >
                    <RefreshCw size={16} /> Refresh
                  </button>
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
                      {assignments.length > 0 ? (
                        assignments.map((a) => (
                          <tr key={a._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-4 py-3 font-medium">{a.description}</td>
                            <td className="px-4 py-3">{new Date(a.deadline).toLocaleDateString("en-GB")}</td>
                            <td className="px-4 py-3">Rs. {a.price}</td>
                            <td className="px-4 py-3">
                              <span
                                className="px-2.5 py-1 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: `${COLORS[a.status]}20`,
                                  color: COLORS[a.status],
                                }}
                              >
                                {a.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center text-gray-500 py-6">
                            No assignments found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
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
                            fill={COLORS[entry.name]}
                            stroke="#fff"
                            strokeWidth={1}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} assignments`, "Count"]} />
                      <Legend layout="horizontal" verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

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

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarDays size={18} /> Upcoming Deadlines
                </h2>
                <div className="space-y-3">
                  {assignments
                    .filter((a) => a.status !== "Completed")
                    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                    .slice(0, 3)
                    .map((a) => (
                      <div key={a._id} className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <p className="font-medium">{a.description}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Due: {new Date(a.deadline).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  {assignments.filter((a) => a.status !== "Completed").length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming deadlines</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardCard({ title, icon, to }: { title: string; icon: React.ReactNode; to: string }) {
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

function NavLink({ title, icon, to }: { title: string; icon: React.ReactNode; to: string }) {
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
