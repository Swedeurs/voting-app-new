import React from 'react';

interface ElectionListProps {
  data: any[];
}

export default function ElectionList({ data }: ElectionListProps) {
  return (
    <ul className="space-y-6">
      {data.map((election: any) => (
        <li
          key={election.id}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-400"
        >
          <h3 className="text-2xl font-bold text-gray-800">{election.name}</h3>
          <p className="text-gray-600">Status: {election.status}</p>
        </li>
      ))}
    </ul>
  );
}
