import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import WeeklyWasteChart from './components/WeeklyWasteChart';
import WastePieChart from './components/WastePieChart';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-6 bg-green-50">
      <h1 className="text-4xl font-bold mb-2 text-green-900">Dashboard</h1>
      <p className="text-lg text-green-800 mb-6">
        Welcome, {session.user?.name || "user"}! Track and manage your food waste.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm text-gray-500">Total Waste This Week</h2>
          <p className="text-2xl font-bold text-green-700">2.4 kg</p>
          <p className="text-sm text-gray-500">-0.8kg from last week</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm text-gray-500">Money Saved</h2>
          <p className="text-2xl font-bold text-green-700">$32.50</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm text-gray-500">Items Expiring Soon</h2>
          <p className="text-2xl font-bold text-green-700">5 items</p>
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
