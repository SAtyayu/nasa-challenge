"use client";

import { LAND_USE_METADATA } from "@/lib/constants";
import type { LandUseType } from "@/lib/types";

interface LandUseIconProps extends React.HTMLAttributes<SVGElement> {
  landType: LandUseType;
}

export function LandUseIcon({ landType, ...props }: LandUseIconProps) {
  const metadata = LAND_USE_METADATA[landType];
  if (!metadata) return null;

  const IconComponent = metadata.icon;
  return <IconComponent style={{ color: metadata.color }} {...props} />;
}
