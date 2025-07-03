import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaClock, FaDownload, FaTrash, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAssignments: React.FC = () => {
  const { t } = useTranslation();
  const [assignments, setAssignments] = useState([
    { 
      id: 1, 
      title: t("assignments.assignmentTitles.aiResearch"), 
      status: "Submitted", 
      dueDate: "2023-06-15", 
      file: "report.pdf" 
    },
    { 
      id: 2, 
      title: t("assignments.assignmentTitles.databaseSchema"), 
      status: "Pending", 
      dueDate: "2023-06-20", 
      file: "schema.sql" 
    },
    { 
      id: 3, 
      title: t("assignments.assignmentTitles.reactComponent"), 
      status: "Late", 
      dueDate: "2023-06-10", 
      file: "component.zip" 
    },
  ]);

  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setIsDeleting(id);
    setTimeout(() => {
      setAssignments(assignments.filter(a => a.id !== id));
      setIsDeleting(null);
      toast.success(t("assignments.messages.deleteSuccess"));
    }, 800);
  };

  const handleDownload = (filename: string) => {
    toast.info(t("assignments.messages.downloading", { filename }));
    setTimeout(() => toast.success(t("assignments.messages.downloadSuccess", { filename })), 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Submitted":
        return <FaCheckCircle className="text-green-500 inline mr-1" />;
      case "Pending":
        return <FaClock className="text-yellow-500 inline mr-1" />;
      case "Late":
        return <FaClock className="text-red-500 inline mr-1" />;
      default:
        return null;
    }
  };

  const translateStatus = (status: string) => {
    return t(`assignments.status.${status.toLowerCase()}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-orange-600 mb-6">
        {t("assignments.title")}
      </h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-3 text-left">{t("assignments.columns.title")}</th>
              <th className="p-3 text-left">{t("assignments.columns.status")}</th>
              <th className="p-3 text-left">{t("assignments.columns.dueDate")}</th>
              <th className="p-3 text-left">{t("assignments.columns.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr 
                key={a.id} 
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="p-3">{a.title}</td>
                <td className="p-3">
                  {getStatusIcon(a.status)}
                  {translateStatus(a.status)}
                </td>
                <td className="p-3">{a.dueDate}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleDownload(a.file)}
                    className="text-orange-500 hover:text-orange-700 p-1 rounded-full hover:bg-orange-100 dark:hover:bg-gray-600"
                    title={t("assignments.actions.download")}
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    disabled={isDeleting === a.id}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-gray-600 disabled:opacity-50"
                    title={t("assignments.actions.delete")}
                  >
                    {isDeleting === a.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {t("assignments.messages.emptyState")}
        </div>
      )}
    </div>
  );
};

export default ViewAssignments; 