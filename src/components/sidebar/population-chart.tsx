"use client"

import React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { City } from "@/lib/types"

interface PopulationBarChartProps {
  data: City[]
}

const formatNumber = (num: number) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

export function PopulationBarChart({ data }: PopulationBarChartProps) {
  const chartData = data
    .sort((a, b) => b.population - a.population)
    .slice(0, 5)
    .map(city => ({
      name: city.name,
      population: city.population,
    }));

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" dataKey="population" tickFormatter={formatNumber} fontSize={12} />
          <YAxis type="category" dataKey="name" width={60} tick={{ fontSize: 12 }} />
          <Tooltip 
            cursor={{ fill: 'hsl(var(--accent) / 0.3)' }}
            formatter={(value: number) => [value.toLocaleString(), 'Population']}
          />
          <Bar dataKey="population" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
