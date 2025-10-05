"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { City } from "@/lib/types"
import { LandUsePieChart } from "./land-use-chart"
import { PopulationBarChart } from "./population-chart"
import { ZMetricBarChart } from "./z-metric-chart"

interface ChartsPanelProps {
  data: City[]
}

export default function ChartsPanel({ data }: ChartsPanelProps) {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Charts</h3>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No data to display for the selected filters.</p>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top 5 Populated Cities</CardTitle>
            </CardHeader>
            <CardContent>
              <PopulationBarChart data={data} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Land Use Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <LandUsePieChart data={data} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Z-Metric Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ZMetricBarChart data={data} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
