import { representatives } from '@/src/lib/mockData'; 
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ElectionPage() {
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

    if (!choice) {
      setErrorMessage('Please select an option before submitting your vote.');
      return;
    }

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
        setElection(updatedElection.election); 
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

    if (!publicChoice) {
      setPublicErrorMessage('Please select an option before submitting your public preference.');
      return;
    }

    try {
      const response = await fetch(`/api/elections/${id}/publicVote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: publicChoice }),
      });

      if (response.ok) {
        const updatedElection = await response.json();
        setPublicSuccessMessage('Thank you for sharing your preference!');
        setElection(updatedElection.election);
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

  // Function to determine the winner of the election
  const determineWinner = () => {
    if (!election || !election.votes) {
      return null;
    }

    const voteCounts = Object.entries(election.votes);
    if (voteCounts.length === 0) {
      return null;
    }

    // Find the choice with the highest number of votes
    const winner = voteCounts.reduce((max, current) =>
      current[1] > max[1] ? current : max
    );

    return winner[0];
  };

  // Function to generate chart data for Chart.js
  const getChartData = () => {
    if (!election || !election.votes) return { labels: [], datasets: [] };

    const labels = Object.keys(election.votes);
    const data = Object.values(election.votes);

    return {
      labels,
      datasets: [
        {
          label: 'Number of Votes',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Function to calculate the agreement rate for a given representative
  const calculateAgreementRate = (representativeId: number) => {
    if (!election || !election.publicPreferences || !election.representativeVotes) return 0;

    // Get the choice that the representative voted for
    const representativeChoice = election.representativeVotes[representativeId];
    if (!representativeChoice) return 0;

    // Get the number of public voters that representative represents
    const representative = representatives.find((rep) => rep.id === representativeId);
    if (!representative) return 0;

    const publicVotesRepresented = representative.publicVotes;
    const publicVotesForChoice = election.publicPreferences[representativeChoice] || 0;

    // Calculate the percentage of the public that agrees with the representative
    return ((publicVotesForChoice / publicVotesRepresented) * 100).toFixed(2);
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
              disabled={!choice}
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

      {/* Display winner if the election is concluded */}
      {election.status === 'concluded' && (
        <div className="mt-10 p-6 bg-yellow-100 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Election Results</h2>
          <p className="text-xl">
            The winning choice is: <strong>{determineWinner()}</strong>
          </p>

          {/* Display Representatives' Votes */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4">Votes by Representatives</h3>
            <ul>
              {Object.entries(election.representativeVotes).map(([repId, choice]) => {
                const representative = representatives.find((rep) => rep.id === parseInt(repId, 10));
                return (
                  <li key={repId} className="mb-2">
                    <strong>{representative?.name}</strong> voted for: <strong>{choice}</strong>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Display Agreement Rates */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4">Agreement Rates of Representatives</h3>
            <ul>
              {representatives.map((rep) => (
                <li key={rep.id} className="mb-2">
                  <strong>{rep.name}</strong>: Agreement Rate: {calculateAgreementRate(rep.id)}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
