'use client';

import { useState } from "react";
import { useWaste } from "../context/WasteContext"; // adjust path if needed

const categories = ["All", "Vegetables", "Fruits", "Dairy", "Meat", "Grains"];
const sortOptions = ["Newest", "Oldest", "Cost: High to Low", "Cost: Low to High"];

export default function Page() {
  const { wasteData, setWasteData } = useWaste();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    food: "", category: "Vegetables", amount: "", reason: "", date: "", cost: ""
  });

  let filteredData = selectedCategory === "All"
    ? [...wasteData]
    : wasteData.filter(item => item.category === selectedCategory);

  filteredData.sort((a, b) => {
    if (sortOption === "Newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortOption === "Oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortOption === "Cost: High to Low") return b.cost - a.cost;
    if (sortOption === "Cost: Low to High") return a.cost - b.cost;
    return 0;
  });

  const totalCost = filteredData.reduce((sum, item) => sum + item.cost, 0).toFixed(2);

  return (
    <div className="bg-green-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-2">Waste Log</h1>
      <p className="text-gray-600 mb-6">Track and analyze your food waste to identify patterns and reduce waste</p>

      <div className="border rounded-lg shadow bg-white p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold text-green-700">Waste Entries</h2>
            <p className="text-sm text-gray-500">Total Cost: ${totalCost}</p>
          </div>
          <div className="flex gap-4 items-center">
            <select
              className="border border-green-600 text-black rounded px-2 py-1 text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              Log New Waste
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`py-1 px-3 rounded border text-sm font-medium ${
                selectedCategory === cat ? 'bg-green-600 text-white' : 'bg-white text-black'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Food Item</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold text-black">{item.food}</td>
                  <td className="px-4 py-2 text-black">{item.category}</td>
                  <td className="px-4 py-2 text-black">{item.amount}</td>
                  <td className="px-4 py-2 text-black">{item.reason}</td>
                  <td className="px-4 py-2 text-black">{item.date}</td>
                  <td className="px-4 py-2 text-black">${item.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-green-700">Log New Waste</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newEntry = { ...form, cost: parseFloat(form.cost) };
                setWasteData(prev => [newEntry, ...prev]);
                setModalOpen(false);
                setForm({ food: "", category: "Vegetables", amount: "", reason: "", date: "", cost: "" });
              }}
              className="flex flex-col gap-3"
            >
              <input className="border p-2 rounded text-black" required placeholder="Food Item" value={form.food} onChange={e => setForm({ ...form, food: e.target.value })} />
              <select className="border p-2 rounded text-black" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.filter(c => c !== "All").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input className="border p-2 rounded text-black" required placeholder="Amount (e.g. 100g)" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
              <input className="border p-2 rounded text-black" required placeholder="Reason" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
              <input className="border p-2 rounded text-black" required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              <input className="border p-2 rounded text-black" required placeholder="Cost (e.g. 2.50)" type="number" step="0.01" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} />
              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="text-gray-500 px-4 py-2">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
