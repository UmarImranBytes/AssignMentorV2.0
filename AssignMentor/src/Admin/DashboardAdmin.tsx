import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { useTranslation } from "react-i18next";

const COLORS = ["#fb923c", "#facc15", "#22c55e"];

const DashboardAdmin = () => {
  const { t } = useTranslation();
  
  const pieData = [
    { name: t('dashboard.status.pending'), value: 12 },
    { name: t('dashboard.status.inReview'), value: 8 },
    { name: t('dashboard.status.completed'), value: 23 },
  ];

  const barData = [
    { name: t('dashboard.users.students'), count: 120 },
    { name: t('dashboard.users.tutors'), count: 45 },
    { name: t('dashboard.users.complaints'), count: 10 },
    { name: t('dashboard.users.assignments'), count: 65 },
  ];

  const Card = ({ title, value, color }: { title: string; value: string; color: string }) => (
    <div className={`${color} p-6 rounded-xl shadow-sm text-center`}>
      <p className="text-3xl font-extrabold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">{t('dashboard.title')}</h2>

      {/* Dashboard Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card title={t('dashboard.users.students')} value="120" color="bg-blue-50" />
        <Card title={t('dashboard.users.tutors')} value="45" color="bg-green-50" />
        <Card title={t('dashboard.users.assignments')} value="65" color="bg-yellow-50" />
        <Card title={t('dashboard.users.complaints')} value="10" color="bg-red-50" />
      </div>

      {/* Modern Reports Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            {t('dashboard.assignmentStatus')}
          </h4>
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
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            {t('dashboard.systemOverview')}
          </h4>
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

export default DashboardAdmin;