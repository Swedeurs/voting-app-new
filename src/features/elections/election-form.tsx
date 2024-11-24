import React, { useState } from "react";

interface ElectionFormProps {
  addElection: (name: string, choices: string[]) => void;
}

export default function ElectionForm({ addElection }: ElectionFormProps) {
  const [name, setName] = useState<string>("");
  const [choices, setChoices] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleAddElection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !choices) {
      setErrorMessage("Election name and choices are required.");
      return;
    }

    const trimmedName = name.trim();
    const choiceArray = choices
      .split(",")
      .map((choice) => choice.trim())
      .filter((value, index, self) => self.indexOf(value) === index);

    if (choiceArray.length < 2) {
      setErrorMessage("At least two unique choices are required.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("Election added successfully!");
    addElection(trimmedName, choiceArray);
    setName("");
    setChoices("");
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
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
          placeholder="Enter choices separated by commas"
        />
      </div>
      <button
        onClick={handleAddElection}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition w-full"
      >
        Add Election
      </button>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
}
