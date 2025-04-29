'use client';

import React, { createContext, useContext, useState } from "react";

type WasteEntry = {
  food: string;
  category: string;
  amount: string;
  reason: string;
  date: string;
  cost: number;
};

const defaultWaste: WasteEntry[] = [
  { food: "Lettuce", category: "Vegetables", amount: "150g", reason: "Expired", date: "2025-04-22", cost: 1.80 },
  { food: "Yogurt", category: "Dairy", amount: "200g", reason: "Moldy", date: "2025-04-21", cost: 2.30 },
  { food: "Bread", category: "Grains", amount: "3 slices", reason: "Stale", date: "2025-04-20", cost: 1.20 },
  { food: "Tomatoes", category: "Vegetables", amount: "2 pcs", reason: "Overripe", date: "2025-04-19", cost: 1.50 },
  { food: "Chicken", category: "Meat", amount: "100g", reason: "Leftover", date: "2025-04-18", cost: 3.25 },
];

const WasteContext = createContext<{
  wasteData: WasteEntry[];
  setWasteData: React.Dispatch<React.SetStateAction<WasteEntry[]>>;
}>({
  wasteData: defaultWaste,
  setWasteData: () => {},
});

export const WasteProvider = ({ children }: { children: React.ReactNode }) => {
  const [wasteData, setWasteData] = useState<WasteEntry[]>(defaultWaste);
  return (
    <WasteContext.Provider value={{ wasteData, setWasteData }}>
      {children}
    </WasteContext.Provider>
  );
};

export const useWaste = () => useContext(WasteContext);
