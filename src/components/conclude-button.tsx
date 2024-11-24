import React from "react";

interface ConcludeButtonProps {
  electionId: number;
  setElection: (election: any) => void;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

const ConcludeButton: React.FC<ConcludeButtonProps> = ({
  electionId,
  setElection,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const handleConcludeElection = async () => {
    try {
      const response = await fetch(`/api/elections/${electionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const updatedElection = await response.json();
        setElection(updatedElection.election);
        setSuccessMessage("Election has been concluded successfully.");
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage("An error occurred while concluding the election.");
    }
  };

  return (
    <button
      onClick={handleConcludeElection}
      className="bg-red-500 text-white px-4 py-2 rounded mt-4"
    >
      Conclude Election
    </button>
  );
};

export default ConcludeButton;
