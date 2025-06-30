import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Deadline = {
  title: string;
  dueDate: Date;
  status: "overdue" | "dueSoon" | "completed";
};

const Modal: React.FC<{ deadline: Deadline | null; onClose: () => void }> = ({ deadline, onClose }) => {
  if (!deadline) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{deadline.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">Due Date: {deadline.dueDate.toDateString()}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Status:{" "}
          <span
            className={
              deadline.status === "overdue"
                ? "text-red-600 font-semibold"
                : deadline.status === "dueSoon"
                ? "text-yellow-600 font-semibold"
                : "text-green-600 font-semibold"
            }
          >
            {deadline.status}
          </span>
        </p>
        <button
          onClick={onClose}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200 font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [deadlines] = useState<Deadline[]>([
    { title: "Math Assignment 1", dueDate: new Date(2025, 5, 28), status: "completed" }, // June 28, 2025
    { title: "Physics Lab Report", dueDate: new Date(2025, 6, 2), status: "dueSoon" }, // July 2, 2025
    { title: "English Essay", dueDate: new Date(2025, 6, 5), status: "overdue" }, // July 5, 2025
  ]);
  const [selectedDeadline, setSelectedDeadline] = useState<Deadline | null>(null);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const deadline = deadlines.find((d) => d.dueDate.toDateString() === date.toDateString());
      if (deadline) {
        let className = "";
        switch (deadline.status) {
          case "overdue":
            className = "bg-red-200 text-red-800";
            break;
          case "dueSoon":
            className = "bg-yellow-200 text-yellow-800";
            break;
          case "completed":
            className = "bg-green-200 text-green-800";
            break;
        }
        return <div className={`rounded-full w-6 h-6 flex items-center justify-center ${className} shadow-md`}>{deadline.title.split(" ")[0][0]}</div>;
      }
    }
    return null;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const deadline = deadlines.find((d) => d.dueDate.toDateString() === date.toDateString());
    if (deadline) {
      setSelectedDeadline(deadline);
    } else {
      setSelectedDeadline(null);
    }
  };

  const closeModal = () => {
    setSelectedDeadline(null);
  };

  return (
    <div className="p-16 max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg min-h-screen">
      <h2 className="text-3xl font-bold dark:text-white mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text">
        Calendar
      </h2>
      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
        value={selectedDate || new Date()}
        className="react-calendar border-none rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        tileClassName="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 rounded"
      />
      {selectedDate && (
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Deadlines for {selectedDate.toDateString()}
          </h3>
          {deadlines
            .filter((d) => d.dueDate.toDateString() === selectedDate.toDateString())
            .map((deadline, index) => (
              <div key={index} className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200">
                <p className="text-gray-700 dark:text-gray-300">
                  {deadline.title} -{" "}
                  <span
                    className={
                      deadline.status === "overdue"
                        ? "text-red-600 font-medium"
                        : deadline.status === "dueSoon"
                        ? "text-yellow-600 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {deadline.status}
                  </span>
                </p>
              </div>
            ))}
        </div>
      )}
      <Modal deadline={selectedDeadline} onClose={closeModal} />
    </div>
  );
};

export default CalendarPage;