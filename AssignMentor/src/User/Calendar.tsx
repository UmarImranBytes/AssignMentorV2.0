import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

interface Deadline {
  _id?: string;
  title: string;
  dueDate: string;
  status: "overdue" | "dueSoon" | "completed";
}

const Modal: React.FC<{
  deadline: Deadline | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (deadline: Deadline) => void;
}> = ({ deadline, onClose, onDelete, onEdit }) => {
  if (!deadline) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {deadline.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Due Date: {new Date(deadline.dueDate).toDateString()}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Status: <span className={`font-semibold ${
            deadline.status === "overdue"
              ? "text-red-600"
              : deadline.status === "dueSoon"
              ? "text-yellow-600"
              : "text-green-600"
          }`}>
            {deadline.status}
          </span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(deadline)}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => deadline._id && onDelete(deadline._id)}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [selectedDeadline, setSelectedDeadline] = useState<Deadline | null>(null);
  const [formData, setFormData] = useState<Deadline>({ title: "", dueDate: "", status: "dueSoon" });

  const fetchDeadlines = async () => {
    const res = await axios.get("http://localhost:5000/api/deadlines");
    setDeadlines(res.data);
  };

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const found = deadlines.find(
      (d) => new Date(d.dueDate).toDateString() === date.toDateString()
    );
    setSelectedDeadline(found || null);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/deadlines/${id}`);
    setSelectedDeadline(null);
    fetchDeadlines();
  };

  const handleEdit = (deadline: Deadline) => {
    setFormData({ ...deadline });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._id) {
      await axios.put(`http://localhost:5000/api/deadlines/${formData._id}`, formData);
    } else {
      await axios.post("http://localhost:5000/api/deadlines", formData);
    }
    setFormData({ title: "", dueDate: "", status: "dueSoon" });
    fetchDeadlines();
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const deadline = deadlines.find(
        (d) => new Date(d.dueDate).toDateString() === date.toDateString()
      );
      if (deadline) {
        const colorClass =
          deadline.status === "overdue"
            ? "bg-red-200 text-red-800"
            : deadline.status === "dueSoon"
            ? "bg-yellow-200 text-yellow-800"
            : "bg-green-200 text-green-800";
        return (
          <div className={`rounded-full w-6 h-6 flex items-center justify-center ${colorClass} shadow-md`}>
            {deadline.title[0]}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="p-16 max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg min-h-screen">
      <h2 className="text-3xl font-bold dark:text-white mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text">
        Calendar
      </h2>

      <form onSubmit={handleFormSubmit} className="mb-8 bg-white dark:bg-gray-700 p-4 rounded-xl shadow">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
            className="p-2 rounded border border-gray-300"
            required
          />
          <input
            type="date"
            value={formData.dueDate.slice(0, 10)}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="p-2 rounded border border-gray-300"
            required
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="p-2 rounded border border-gray-300"
          >
            <option value="overdue">Overdue</option>
            <option value="dueSoon">Due Soon</option>
            <option value="completed">Completed</option>
          </select>
          <button type="submit" className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
            {formData._id ? "Update Deadline" : "Add Deadline"}
          </button>
        </div>
      </form>

      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
        value={selectedDate || new Date()}
        className="react-calendar border-none rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        tileClassName="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 rounded"
      />

      <Modal deadline={selectedDeadline} onClose={() => setSelectedDeadline(null)} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default CalendarPage;
