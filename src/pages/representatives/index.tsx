import useSWR, { mutate } from 'swr';
import React, { useState } from 'react';
import Navbar from '@/src/components/navbar';
import RepresentativeForm from '@/src/features/representatives/representative-form';
import RepresentativeList from '@/src/features/representatives/representative-list';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RepresentativesPage() {
  const { data = [], error } = useSWR('/api/representatives', fetcher);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const addRepresentative = async (name: string, email: string) => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/representatives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setSuccessMessage('Representative added successfully.');
        mutate('/api/representatives');
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage('An error occurred while adding the representative.');
    }
  };

  const removeRepresentative = async (id: number) => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/representatives/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccessMessage('Representative removed successfully.');
        mutate('/api/representatives');
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage('An error occurred while removing the representative.');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">Failed to load representatives.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Representatives List</h1>
          <RepresentativeForm addRepresentative={addRepresentative} />
          <RepresentativeList representatives={data} removeRepresentative={removeRepresentative} />
          {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}
