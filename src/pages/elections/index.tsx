import Navbar from "@/src/components/navbar";
import ElectionForm from "@/src/features/elections/election-form";
import ElectionList from "@/src/features/elections/election-list";
import useElections from "@/src/hooks/use-elections";
import React from "react";

export default function ElectionsPage() {
  const { elections, isLoading, isError } = useElections();

  const addElection = async (name: string, choices: string[]) => {
    try {
      const response = await fetch("/api/elections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, choices }),
      });

      if (!response.ok) {
        console.error("Error adding election:", await response.text());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load elections.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
            Manage Elections
          </h1>
          <ElectionForm addElection={addElection} />
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            elections && <ElectionList data={elections} />
          )}
        </div>
      </div>
    </>
  );
}
