import React from "react";

const dummyAssignments = [
  { id: 1, title: "AI Research Report", status: "Submitted" },
  { id: 2, title: "Database Schema", status: "Pending" },
];

export default function ViewAssignments() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-orange-600 mb-4">My Assignments</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyAssignments.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.title}</td>
              <td className="p-2">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
