import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export default function VotePage() {
  const router = useRouter();
  const { id } = router.query;

  const [election, setElection] = useState<any>(null);
  const [choice, setChoice] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [publicChoice, setPublicChoice] = useState<string>('');
  const [publicSuccessMessage, setPublicSuccessMessage] = useState<string>('');
  const [publicErrorMessage, setPublicErrorMessage] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetch(`/api/elections/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'Election not found') {
            router.push('/404');
          } else {
            setElection(data);
          }
        })
        .catch((err) => console.error('Failed to fetch election:', err));
    }
  }, [id]);

  // Handle representative voting
  const handleVote = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const response = await fetch(`/api/elections/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          representativeId: 1, // Hardcoded for now; this could be dynamic later
          choice,
        }),
      });

      if (response.ok) {
        const updatedElection = await response.json();
        setSuccessMessage('Thank you for voting! Your vote has been registered.');
        setElection(updatedElection.election); // Update election data with new votes
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage('An error occurred while registering your vote.');
    }
  };

  // Handle public preference voting
  const handlePublicPreference = async () => {
    setPublicSuccessMessage('');
    setPublicErrorMessage('');
    try {
      const response = await fetch(`/api/elections/${id}/publicVote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: publicChoice }),
      });

      if (response.ok) {
        const updatedElection = await response.json();
        setPublicSuccessMessage('Thank you for sharing your preference!');
        setElection(updatedElection.election); // Update election data with new preferences
      } else {
        const errorData = await response.json();
        setPublicErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setPublicErrorMessage('An error occurred while recording your preference.');
    }
  };

  const handleConcludeElection = async () => {
    try {
      const response = await fetch(`/api/elections/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const updatedElection = await response.json();
        setElection(updatedElection.election);
        setSuccessMessage('Election has been concluded successfully.');
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage('An error occurred while concluding the election.');
    }
  };

  if (!election) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">{election.name}</h1>
      <p className="mb-4">Status: {election.status}</p>

      {/* Conclude Election Button */}
      {election.status === 'ongoing' && (
        <button
          onClick={handleConcludeElection}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Conclude Election
        </button>
      )}
      {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

      {/* Display vote options if ongoing */}
      {election.status === 'ongoing' && (
        <>
          <div className="mb-6">
            <label htmlFor="choice" className="block mb-2 font-bold">
              Select your favorite (Representative Vote):
            </label>
            <select
              id="choice"
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">-- Select an Option --</option>
              {election.choices && election.choices.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={handleVote}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Submit Representative Vote
            </button>
            {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
            {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
          </div>

          {/* Public Preference Voting */}
          <div className="mb-6">
            <label htmlFor="publicChoice" className="block mb-2 font-bold">
              Select your preference (Public Vote):
            </label>
            <select
              id="publicChoice"
              value={publicChoice}
              onChange={(e) => setPublicChoice(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">-- Select an Option --</option>
              {election.choices && election.choices.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={handlePublicPreference}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Submit Public Preference
            </button>
            {publicSuccessMessage && <p className="mt-4 text-green-500">{publicSuccessMessage}</p>}
            {publicErrorMessage && <p className="mt-4 text-red-500">{publicErrorMessage}</p>}
          </div>
        </>
      )}

      {/* Display current vote counts */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Current Vote Counts:</h2>
        <ul>
          {election.votes && Object.keys(election.votes).map((option) => (
            <li key={option} className="mb-2">
              {option}: {election.votes[option]} votes
            </li>
          ))}
        </ul>
      </div>

      {/* Display current public preferences */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Current Public Preferences:</h2>
        <ul>
          {election.publicPreferences && Object.keys(election.publicPreferences).map((option) => (
            <li key={option} className="mb-2">
              {option}: {election.publicPreferences[option]} votes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
