import React, { useState } from "react";

export default function Complaints() {
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComplaint("");
    }, 3000); // Reset after 3 seconds
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen flex items-center justify-center">
      <div className="w-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold dark:text-white mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text">
          Submit a Complaint
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Describe your issue..."
              className="w-full p-4 border-none rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none resize-y transition duration-200 shadow-md placeholder-gray-400 dark:placeholder-gray-500"
              rows={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            disabled={submitted}
          >
            {submitted ? "Submitting..." : "Submit Complaint"}
          </button>
          {submitted && (
            <p className="text-green-600 dark:text-green-400 text-center animate-pulse">
              Complaint submitted successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}