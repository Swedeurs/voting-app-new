import React from "react";

interface ElectionDetailsProps {
  election: any;
}

const ElectionDetails: React.FC<ElectionDetailsProps> = ({ election }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">
        {election.name}
      </h1>
      <p className="text-lg text-gray-600">
        Status:{" "}
        <span
          className={`font-semibold ${election.status === "ongoing" ? "text-green-600" : "text-red-600"}`}
        >
          {election.status}
        </span>
      </p>
    </div>
  );
};

export default ElectionDetails;
