"use client";

import { useState } from "react";
import { useInventory } from "../context/InventoryContext";

export default function InventoryPage() {
  const { inventory, addItem } = useInventory();
  const [searchQuery, setSearchQuery] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    expiryDate: "",
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity && newItem.expiryDate) {
      addItem(newItem);
      setNewItem({ name: "", category: "", quantity: "", expiryDate: "" });
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDaysLeft = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return diffDays;
  };

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-green-900">Food Inventory</h1>
      <p className="text-lg text-green-800 mb-6">
        Track your food items and keep an eye on expiration dates
      </p>

      {/* Search and Add Item */}
      <div className="flex flex-col gap-4 mb-8">
        {/* First line: Search */}
        <input
          type="text"
          placeholder="Search foods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded text-black placeholder:text-gray-400 w-full"
        />

        {/* Second line: Add Item Form */}
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border px-4 py-2 rounded text-black placeholder:text-gray-400 flex-1"
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="border px-4 py-2 rounded text-black placeholder:text-gray-400 flex-1"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="border px-4 py-2 rounded text-black placeholder:text-gray-400 flex-1"
          />
          <input
            type="date"
            value={newItem.expiryDate}
            onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
            className="border px-4 py-2 rounded text-black placeholder:text-gray-400 flex-1"
          />
          <button
            onClick={handleAddItem}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Quantity</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Expiry Date</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item, idx) => {
              const daysLeft = getDaysLeft(item.expiryDate);
              let statusColor = "bg-green-100 text-green-800";
              if (daysLeft <= 0) statusColor = "bg-red-100 text-red-800";
              else if (daysLeft <= 3) statusColor = "bg-red-100 text-red-800";
              else if (daysLeft <= 5) statusColor = "bg-yellow-100 text-yellow-800";

              return (
                <tr key={idx} className="border-b">
                  <td className="py-3 px-6 text-black">{item.name}</td>
                  <td className="py-3 px-6 text-black">{item.category}</td>
                  <td className="py-3 px-6 text-black">{item.quantity}</td>
                  <td className="py-3 px-6 text-black">{item.expiryDate}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
