"use client"

import React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { City } from "@/lib/types"

interface ZMetricBarChartProps {
  data: City[]
}

export function ZMetricBarChart({ data }: ZMetricBarChartProps) {
  // Create bins for the histogram
  const bins = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
  const chartData = bins.slice(0, -1).map((bin, i) => {
    const nextBin = bins[i+1];
    const count = data.filter(city => city.z_metric >= bin && city.z_metric < nextBin).length;
    return {
      name: `${bin.toFixed(1)}-${nextBin.toFixed(1)}`,
      count,
    }
  });

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis allowDecimals={false} fontSize={12} />
          <Tooltip 
            cursor={{ fill: 'hsl(var(--accent) / 0.3)' }}
            formatter={(value: number) => [value, 'City Count']}
          />
          <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
