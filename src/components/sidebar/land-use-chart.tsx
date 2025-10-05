"use client"

import React from "react"
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { City, LandUseType } from "@/lib/types"
import { LAND_USE_METADATA } from "@/lib/constants"

interface LandUsePieChartProps {
  data: City[]
}

export function LandUsePieChart({ data }: LandUsePieChartProps) {
  const landUseCounts = data.reduce((acc, city) => {
    acc[city.land_type] = (acc[city.land_type] || 0) + 1;
    return acc;
  }, {} as Record<LandUseType, number>);

  const chartData = Object.entries(landUseCounts).map(([name, value]) => ({
    name: name as LandUseType,
    value: value,
  }));

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip cursor={{ fill: 'hsl(var(--accent) / 0.3)' }} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
              return (
                <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={LAND_USE_METADATA[entry.name].color} />
            ))}
          </Pie>
          <Legend iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
