import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-200">
          Voting App
        </Link>
        <div className="space-x-6">
          <Link href="/elections" className="hover:text-gray-200">
            Elections
          </Link>
          <Link href="/representatives" className="hover:text-gray-200">
            Representatives
          </Link>
        </div>
      </div>
    </nav>
  );
}
