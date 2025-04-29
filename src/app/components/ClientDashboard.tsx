'use client';

import { useInventory } from "../context/InventoryContext";
import WeeklyWasteChart from './WeeklyWasteChart';
import WastePieChart from './WastePieChart';
import { useWaste } from "../context/WasteContext";

interface ClientDashboardProps {
  userName: string;
}

export default function ClientDashboard({ userName }: ClientDashboardProps) {
  const { inventory } = useInventory();
  const { wasteData } = useWaste();

  const totalWaste = wasteData.reduce((sum, item) => sum + item.cost, 0);

  const expiringSoonCount = inventory.filter(item => {
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const diffDays = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 3;
  }).length;

  return (
    <main className="min-h-screen p-6 bg-green-50">
      <h1 className="text-4xl font-bold mb-2 text-green-900">Dashboard</h1>
      <p className="text-lg text-green-800 mb-6">
        Welcome, {userName || "user"}! Track and manage your food waste.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm text-gray-500">Total Waste Cost</h2>
          <p className="text-2xl font-bold text-green-700">${totalWaste.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Updated in real-time</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm text-gray-500">Money Saved</h2>
          <p className="text-2xl font-bold text-green-700">$32.50</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm text-gray-500">Items Expiring Soon</h2>
          <p className="text-2xl font-bold text-green-700">{expiringSoonCount} items</p>
          <p className="text-sm text-gray-500">Within next 3 days</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeeklyWasteChart />
        <WastePieChart />
      </div>
    </main>
  );
}
