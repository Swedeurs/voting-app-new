import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "@/src/components/navbar";
import { representatives } from "@/src/lib/mockData";
import ElectionDetails from "@/src/components/election-details";
import VotingSection from "@/src/components/voteing-section";
import ConcludeButton from "@/src/components/conclude-button";
import ElectionResults from "@/src/components/election-results";

export default function ElectionPage() {
  const router = useRouter();
  const { id } = router.query;

  const [election, setElection] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetch(`/api/elections/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Election not found") {
            router.push("/404");
          } else {
            setElection(data);
          }
        })
        .catch((err) => console.error("Failed to fetch election:", err));
    }
  }, [id]);

  if (!election) {
    return (
      <>
        <Navbar />
        <div className="p-10">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-10">
        <ElectionDetails election={election} />
        {election.status === "ongoing" && (
          <>
            <VotingSection
              election={election}
              representatives={representatives}
              setElection={setElection}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
            <ConcludeButton
              electionId={election.id}
              setElection={setElection}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          </>
        )}
        {election.status === "concluded" && (
          <ElectionResults election={election} />
        )}
        {successMessage && (
          <p className="mt-4 text-green-500">{successMessage}</p>
        )}
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      </div>
    </>
  );
}
