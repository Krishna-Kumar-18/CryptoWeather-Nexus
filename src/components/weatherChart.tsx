'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface WeatherData {
  date: string;
  temperature: number;
}

export function WeatherChart({ data }: { data: WeatherData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#38bdf8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

