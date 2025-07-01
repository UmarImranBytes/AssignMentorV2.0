import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Complaint {
  _id: string;
  userName: string;
  userEmail: string;
  message: string;
  status: "pending" | "resolved";
}

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    // Dummy data instead of API
    const dummyComplaints: Complaint[] = [
      {
        _id: "1",
        userName: "Ali Raza",
        userEmail: "ali@example.com",
        message: "Issue with assignment submission portal.",
        status: "pending",
      },
      {
        _id: "2",
        userName: "Fatima Khan",
        userEmail: "fatima@example.com",
        message: "Cannot access the recent assignments tab.",
        status: "resolved",
      },
    ];

    setComplaints(dummyComplaints);
  }, []);

  const resolveComplaint = (id: string) => {
    try {
      toast.success("Complaint resolved!");
      setComplaints((prev) =>
        prev.map((comp) =>
          comp._id === id ? { ...comp, status: "resolved" } : comp
        )
      );
    } catch {
      toast.error("Failed to resolve complaint");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">Admin Complaints Panel</h1>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="border rounded p-4 shadow hover:shadow-md transition"
            >
              <div className="font-semibold">{complaint.userName}</div>
              <div className="text-sm text-gray-500">{complaint.userEmail}</div>
              <p className="mt-2">{complaint.message}</p>
              <div className="mt-2 flex justify-between items-center">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    complaint.status === "resolved"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {complaint.status}
                </span>
                {complaint.status === "pending" && (
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
                    onClick={() => resolveComplaint(complaint._id)}
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
