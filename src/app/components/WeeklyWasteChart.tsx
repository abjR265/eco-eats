'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { day: 'Mon', kg: 3 },
  { day: 'Tue', kg: 2 },
  { day: 'Wed', kg: 4 },
  { day: 'Thu', kg: 1 },
  { day: 'Fri', kg: 5 },
  { day: 'Sat', kg: 2 },
  { day: 'Sun', kg: 3 },
];

export default function WeeklyWasteChart() {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-[350px]">
      <h2 className="text-lg font-semibold text-green-900 mb-2">Weekly Waste Trend</h2>
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="kg" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
