// src/pages/elections/index.tsx

import useSWR, { mutate } from 'swr';
import React from 'react';
import Navbar from '@/src/components/navbar';
import ElectionForm from './election-form';
import ElectionList from './election-list';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ElectionsPage() {
  const { data = [], error } = useSWR('/api/elections', fetcher);

  const addElection = async (name: string, choices: string[]) => {
    try {
      const response = await fetch('/api/elections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, choices }),
      });

      if (response.ok) {
        mutate('/api/elections'); // Revalidate data to update list
      }
    } catch (error) {
      console.error('An error occurred while adding the election.', error);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">Failed to load elections.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Manage Elections</h1>
          <ElectionForm addElection={addElection} />
          <ElectionList data={data} />
        </div>
      </div>
    </>
  );
}
