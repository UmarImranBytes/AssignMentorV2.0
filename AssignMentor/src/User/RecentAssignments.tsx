import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Assignment {
  _id: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function AssignmentTable() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assignments");
      setAssignments(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/assignments/${id}/status`, {
        status
      });
      toast.success("Status updated");
      fetchAssignments(); // refresh table
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-12 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-orange-600">📋 Assignments</h2>
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="bg-orange-100 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Created</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a._id} className="border-t">
              <td className="p-2">{a.title}</td>
              <td className="p-2">{new Date(a.createdAt).toLocaleDateString()}</td>
              <td className="p-2">
                <select
                  value={a.status}
                  onChange={(e) => updateStatus(a._id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
