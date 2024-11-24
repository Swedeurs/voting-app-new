import useSWR, { mutate } from "swr";
import React, { useState } from "react";
import Navbar from "@/src/components/navbar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RepresentativesPage() {
  const { data = [], error } = useSWR("/api/representatives", fetcher);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to add a representative
  const addRepresentative = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!name || !email) {
      setErrorMessage("Name and email are required.");
      return;
    }

    const normalizedEmail = email.toLowerCase(); // Normalize email to lowercase for uniqueness

    try {
      const response = await fetch("/api/representatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: normalizedEmail }),
      });

      if (response.ok) {
        const newRepresentative = await response.json();
        setSuccessMessage("Representative added successfully.");
        setName("");
        setEmail("");
        mutate("/api/representatives");
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the representative.");
    }
  };

  // Function to remove a representative
  const removeRepresentative = async (id: number) => {
    try {
      const response = await fetch(`/api/representatives/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccessMessage("Representative removed successfully.");
        mutate("/api/representatives");
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage("An error occurred while removing the representative.");
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load representatives.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-green-700">
            Representatives List
          </h1>
          <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Add a New Representative
            </h2>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-semibold">
                Name
              </label>
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
              <label htmlFor="email" className="block mb-2 font-semibold">
                Email
              </label>
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
              onClick={addRepresentative}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
            >
              Add Representative
            </button>
            {successMessage && (
              <p className="mt-4 text-green-500">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="mt-4 text-red-500">{errorMessage}</p>
            )}
          </div>

          <ul className="space-y-6">
            {data.map((rep: any) => (
              <li
                key={rep.id}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-400 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {rep.name}
                  </h2>
                  <p className="text-gray-600">Email: {rep.email}</p>
                  <p className="text-gray-600">
                    Public Votes: {rep.publicVotes}
                  </p>
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
        </div>
      </div>
    </>
  );
}
