'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-green-700">EcoEats</div>
      <ul className="flex gap-6 text-green-800 font-medium">
        <li><Link href="/">Dashboard</Link></li>
        <li><Link href="/inventory">Inventory</Link></li>
        <li><Link href="/waste-log">Waste Log</Link></li>
        <li><Link href="/eco-tips">Eco Tips</Link></li>
      </ul>
    </nav>
  );
}
