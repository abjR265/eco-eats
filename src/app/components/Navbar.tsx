'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link href="/" className="text-xl font-bold text-green-700">
        EcoEats
      </Link>
      <div className="space-x-4 flex items-center text-sm">
        <Link href="/dashboard" className="text-green-700 hover:underline">Dashboard</Link>
        <Link href="/inventory" className="text-green-700 hover:underline">Inventory</Link>
        <Link href="/wastelog" className="text-green-700 hover:underline">Waste Log</Link>
        <Link href="/ecotips" className="text-green-700 hover:underline">Eco Tips</Link>

        {!isLoading && session?.user ? (
          <>
           <span className="px-2 py-1 text-green-800 border border-green-700 rounded-md text-sm hover:bg-green-100">
  Hi, {session.user.name || session.user.email}
</span>
<button
  onClick={() => signOut()}
  className="ml-2 px-2 py-1 text-red-600 border border-red-600 rounded-md text-sm hover:bg-red-100"
>
  Log Out
</button>

          </>
        ) : (
          <>
            <Link href="/login" className="text-green-600 hover:underline">
              Log In
            </Link>
            <Link href="/signup" className="text-green-600 hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
