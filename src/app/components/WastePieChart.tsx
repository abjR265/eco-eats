'use client';

import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';

const data = [
  { name: 'Fruits', value: 30 },
  { name: 'Vegetables', value: 30 },
  { name: 'Dairy', value: 15 },
  { name: 'Grains', value: 15 },
  { name: 'Meat', value: 10 },
];

const COLORS = ['#a3e635', '#4ade80', '#fcd34d', '#fde68a', '#16a34a'];

export default function WastePieChart() {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-[350px]">
      <h2 className="text-lg font-semibold text-green-900 mb-2">Waste Breakdown</h2>
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
