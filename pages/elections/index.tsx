import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ElectionList() {
  const { data, error } = useSWR('/api/elections', fetcher);

  if (error) return <div>Failed to load elections.</div>;
  if (!data) return <div>Loading...</div>;
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No elections available at the moment.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Ongoing Elections 🍦
      </h1>
      <ul className="space-y-6">
        {data.map((election: any) => (
          <li
            key={election.id}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-yellow-400"
          >
            <h3 className="text-2xl font-bold text-pink-600 mb-2">{election.name}</h3>
            <p className="text-gray-700 mb-4">Status: {election.status}</p>
            {/* Use Link without nested <a> */}
            <Link href={`/elections/${election.id}`}>
              <span className="text-blue-500 hover:underline">
                Vote in this Election
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
