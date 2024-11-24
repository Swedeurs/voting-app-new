import React, { useState } from "react";

interface VotingSectionProps {
  election: any;
  representatives: any[];
  setElection: (election: any) => void;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

const VotingSection: React.FC<VotingSectionProps> = ({
  election,
  representatives,
  setElection,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [selectedRepresentative, setSelectedRepresentative] = useState<
    number | null
  >(null);

  const handleVote = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!selectedChoice || !selectedRepresentative) {
      setErrorMessage(
        "Please select an option and a representative before submitting your vote.",
      );
      return;
    }

    try {
      const response = await fetch(`/api/elections/${election.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          representativeId: selectedRepresentative,
          choice: selectedChoice,
        }),
      });

      if (response.ok) {
        const updatedElection = await response.json();
        setSuccessMessage(
          "Thank you for voting! Your vote has been registered.",
        );
        setElection(updatedElection.election);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage("An error occurred while registering your vote.");
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Vote in the Election</h2>
      <div className="mb-4">
        <label htmlFor="choice" className="block mb-2 font-semibold">
          Select your favorite option:
        </label>
        <select
          id="choice"
          value={selectedChoice}
          onChange={(e) => setSelectedChoice(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select an Option --</option>
          {election.choices.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="representative" className="block mb-2 font-semibold">
          Select a representative to support:
        </label>
        <select
          id="representative"
          value={selectedRepresentative || ""}
          onChange={(e) => setSelectedRepresentative(parseInt(e.target.value))}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select a Representative --</option>
          {representatives.map((rep) => (
            <option key={rep.id} value={rep.id}>
              {rep.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleVote}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        disabled={!selectedChoice || !selectedRepresentative}
      >
        Submit Vote
      </button>
    </div>
  );
};

export default VotingSection;
