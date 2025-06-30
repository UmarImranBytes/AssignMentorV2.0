import React from "react";

const recent = [
  "Submitted AI Project Report",
  "Viewed Database Design",
  "Downloaded ML Notes",
];

export default function RecentAssignments() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-orange-600 mb-4">Recent Activity</h1>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {recent.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}
