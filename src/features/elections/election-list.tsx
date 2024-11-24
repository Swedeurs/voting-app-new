import Link from "next/link";
import React from "react";

interface ElectionListProps {
  data: any[];
}

export default function ElectionList({ data }: ElectionListProps) {
  return (
    <ul className="space-y-6">
      {data.map((election: any) => (
        <li
          key={election.id}
          className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-400"
        >
          <Link
            href={`/elections/${election.id}`}
            className="text-2xl font-bold text-indigo-700 hover:text-indigo-500"
          >
            {election.name}
          </Link>
          <p className="text-gray-600 mt-2">Status: {election.status}</p>
        </li>
      ))}
    </ul>
  );
}
