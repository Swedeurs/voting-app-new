import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RepresentativeList() {
  const { data, error } = useSWR('/api/representatives', fetcher);

  if (error) return <div>Failed to load representatives.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Representatives List</h1>
      <ul className="space-y-4">
        {data.map((rep: any) => (
          <li key={rep.id} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{rep.name}</h2>
            <p>Email: {rep.email}</p>
            <p>Public Votes: {rep.publicVotes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
