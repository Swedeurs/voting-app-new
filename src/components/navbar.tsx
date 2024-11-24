import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Voting App
        </Link>
        <div className="space-x-6">
          <Link href="/elections" className="hover:text-yellow-300 transition">
            Elections
          </Link>
          <Link href="/representatives" className="hover:text-yellow-300 transition">
            Representatives
          </Link>
          <Link href="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
