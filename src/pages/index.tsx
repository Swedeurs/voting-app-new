import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-indigo-700 mb-6">Welcome to the Voting App</h1>
      <p className="text-lg text-gray-700 mb-10 text-center max-w-xl">
        Welcome to the Swedish Ice Cream Voting App! Here you can cast your vote for your favorite ice cream brand,
        explore ongoing elections, and manage representatives. Let's make voting fun!
      </p>
      <div className="flex space-x-6">
        <Link href="/elections" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-500 transition">
          Go to Elections
        </Link>
        <Link href="/representatives" className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-500 transition">
          Manage Representatives
        </Link>
      </div>
    </div>
  );
}
