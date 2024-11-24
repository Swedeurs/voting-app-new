// src/features/elections/ElectionIndex.tsx

import React from 'react';
import Navbar from '@/src/components/navbar';

export default function ElectionIndex({ 
  name, 
  setName, 
  choices, 
  setChoices, 
  successMessage, 
  errorMessage, 
  addElection, 
  data 
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  choices: string;
  setChoices: React.Dispatch<React.SetStateAction<string>>;
  successMessage: string;
  errorMessage: string;
  addElection: () => void;
  data: any[];
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Manage Elections</h1>

          {/* Form to add a new election */}
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add a New Election</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-semibold">
                Election Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Enter election name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="choices" className="block mb-2 font-semibold">
                Choices (comma separated)
              </label>
              <input
                type="text"
                id="choices"
                value={choices}
                onChange={(e) => setChoices(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Enter choices separated by commas (e.g., GB Glace, Sia Glass)"
              />
            </div>
            <button
              onClick={addElection}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
            >
              Add Election
            </button>
            {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
            {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
          </div>

          {/* List of Elections */}
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
        </div>
      </div>
    </>
  );
}
