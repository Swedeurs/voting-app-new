import useSWR, { mutate } from 'swr';
import React, { useState } from 'react';
import ElectionIndex from '@/src/features/electionIndex';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ElectionsPage() {
  const { data = [], error } = useSWR('/api/elections', fetcher);
  const [name, setName] = useState<string>('');
  const [choices, setChoices] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Function to add a new election
  const addElection = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    if (!name || !choices) {
      setErrorMessage('Election name and choices are required.');
      return;
    }

    // Split choices by commas, remove empty spaces
    const choiceArray = choices.split(',').map((choice) => choice.trim());

    if (choiceArray.length < 2) {
      setErrorMessage('At least two choices are required.');
      return;
    }

    try {
      const response = await fetch('/api/elections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, choices: choiceArray }),
      });

      if (response.ok) {
        const newElection = await response.json();
        setSuccessMessage('Election added successfully.');
        setName('');
        setChoices('');
        mutate('/api/elections');
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage('An error occurred while adding the election.');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">Failed to load elections.</div>;
  }

  return (
    <ElectionIndex
      name={name}
      setName={setName}
      choices={choices}
      setChoices={setChoices}
      successMessage={successMessage}
      errorMessage={errorMessage}
      addElection={addElection}
      data={data}
    />
  );
}
