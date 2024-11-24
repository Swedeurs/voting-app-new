import React from 'react';

interface Representative {
  id: number;
  name: string;
  email: string;
}

interface RepresentativeListProps {
  representatives: Representative[];
  removeRepresentative: (id: number) => void;
}

export default function RepresentativeList({ representatives, removeRepresentative }: RepresentativeListProps) {
  return (
    <ul className="space-y-6">
      {representatives.map((rep) => (
        <li
          key={rep.id}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-400 flex justify-between items-center"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{rep.name}</h2>
            <p className="text-gray-600">Email: {rep.email}</p>
          </div>
          <button
            onClick={() => removeRepresentative(rep.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
