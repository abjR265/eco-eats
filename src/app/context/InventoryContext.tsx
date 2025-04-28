"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface InventoryItem {
  name: string;
  category: string;
  quantity: string;
  expiryDate: string;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addItem: (item: InventoryItem) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used inside InventoryProvider");
  }
  return context;
}

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { name: "Apples", category: "Fruits", quantity: "5 pcs", expiryDate: "2025-05-01" },
    { name: "Milk", category: "Dairy", quantity: "1 L", expiryDate: "2025-04-27" },
    { name: "Bread", category: "Grains", quantity: "1 loaf", expiryDate: "2025-04-26" },
    { name: "Chicken", category: "Meat", quantity: "500g", expiryDate: "2025-04-25" },
    { name: "Spinach", category: "Vegetables", quantity: "200g", expiryDate: "2025-04-26" },
    { name: "Yogurt", category: "Dairy", quantity: "500g", expiryDate: "2025-04-29" },
    { name: "Potatoes", category: "Vegetables", quantity: "1 kg", expiryDate: "2025-05-05" },
  ]);

  const addItem = (item: InventoryItem) => {
    setInventory((prev) => [...prev, item]);
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItem }}>
      {children}
    </InventoryContext.Provider>
  );
}
