import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-around">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/elections" className="hover:underline">Elections</Link>
      <Link href="/representatives" className="hover:underline">Representatives</Link>
    </nav>
  );
}
