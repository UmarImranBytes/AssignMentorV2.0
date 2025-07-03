import React, { useState } from "react";

export default function StudentComplaint() {
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("❌ User not logged in.");
      setSubmitted(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          text: complaint, // ✅ corrected key
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit complaint.");
      }

      setComplaint("");
    } catch (err: any) {
      setError(`❗ ${err.message}`);
    } finally {
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen flex items-center justify-center">
      <div className="w-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl p-8 transition duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Student Complaint Form
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
          {submitted && !error && (
            <p className="text-green-600 dark:text-green-400 text-center animate-pulse">
              Complaint submitted successfully!
            </p>
          )}
          {error && (
            <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
