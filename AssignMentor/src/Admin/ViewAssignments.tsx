import { useTranslation } from "react-i18next";

const ViewAssignments = () => {
  const { t } = useTranslation();
  
  const dummyAssignments = [
    { id: 1, title: t('assignments.dummy.aiReport'), status: t('assignments.statusValues.submitted') },
    { id: 2, title: t('assignments.dummy.databaseSchema'), status: t('assignments.statusValues.pending') },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-orange-600 mb-4">
        {t("assignments.myAssignments")}
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-left rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">{t("assignments.title")}</th>
              <th className="p-3">{t("assignments.statusLabel")}</th>
            </tr>
          </thead>
          <tbody>
            {dummyAssignments.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{a.title}</td>
                <td className="p-3">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAssignments;