import React, { useState } from 'react';

interface RepresentativeFormProps {
  addRepresentative: (name: string, email: string) => void;
}

export default function RepresentativeForm({ addRepresentative }: RepresentativeFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleAddRepresentative = () => {
    if (!name || !email) {
      setErrorMessage('Name and email are required.');
      return;
    }
    setErrorMessage('');
    addRepresentative(name, email);
    setName('');
    setEmail('');
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add a New Representative</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter representative's name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter representative's email"
        />
      </div>
      <button
        onClick={handleAddRepresentative}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
      >
        Add Representative
      </button>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
}
