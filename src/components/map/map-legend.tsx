"use client"

import { LAND_USE_METADATA } from "@/lib/constants"
import { LandUseIcon } from "../icons"

export function MapLegend() {
  return (
    <div className="p-2 space-y-4 rounded-lg bg-card/50">
      <div>
        <h4 className="mb-2 text-sm font-semibold">Environmental (Z) Metric</h4>
        <div className="flex items-center space-x-2">
          <span className="text-xs">Low</span>
          <div className="h-4 w-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
          <span className="text-xs">High</span>
        </div>
      </div>
       <div>
        <h4 className="mb-2 text-sm font-semibold">Land Use Types</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          {Object.entries(LAND_USE_METADATA).map(([type, { icon }]) => (
            <div key={type} className="flex items-center gap-2">
              <LandUseIcon landType={type as any} className="h-4 w-4" />
              <span>{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
