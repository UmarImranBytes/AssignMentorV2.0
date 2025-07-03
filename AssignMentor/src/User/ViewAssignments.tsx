import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Assignment {
  _id: string;
  title: string;
  status: string;
}

const statusOptions = ["pending", "submitted", "completed", "rejected"];

const statusColorMap: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  submitted: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ViewAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filtered, setFiltered] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [assignments, filterStatus, search]);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assignments");
      setAssignments(res.data);
    } catch (error) {
      toast.error("Failed to fetch assignments.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let data = [...assignments];
    if (filterStatus !== "all") {
      data = data.filter((a) => a.status.toLowerCase() === filterStatus);
    }
    if (search.trim()) {
      data = data.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(data);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/assignments/${id}`);
      toast.success("Assignment deleted");
      setAssignments(assignments.filter((a) => a._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/api/assignments/${id}/status`, {
        status: newStatus,
      });
      toast.success("Status updated");
      setAssignments(
        assignments.map((a) =>
          a._id === id ? { ...a, status: newStatus } : a
        )
      );
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-10 bg-white rounded-2xl shadow-md">
      <ToastContainer />
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold text-orange-600 mb-4"
      >
        📂 My Assignments
      </motion.h1>

      {/* 🔍 Search + Filter Tabs */}
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2 rounded-md w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          {["all", ...statusOptions].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-1 text-sm rounded-full ${
                filterStatus === s
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 🗂 Table */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading assignments...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No assignments found.</p>
      ) : (
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full border text-sm"
        >
          <thead className="bg-orange-100 text-gray-800">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((a) => (
                <motion.tr
                  key={a._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t hover:bg-orange-50"
                >
                  <td className="p-3 font-medium text-gray-900">{a.title}</td>
                  <td className="p-3">
                    <select
                      value={a.status}
                      onChange={(e) =>
                        handleStatusChange(a._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-md text-sm capitalize border ${
                        statusColorMap[a.status] || ""
                      }`}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </motion.table>
      )}
    </div>
  );
}
