import { Building2, Factory, Home, Tractor, Trees } from 'lucide-react';
import { LandUseType } from './types';

export const LAND_USE_TYPES: LandUseType[] = ["Urban", "Suburban", "Rural", "Industrial", "Greenspace"];

export const LAND_USE_METADATA: Record<LandUseType, { icon: React.ElementType; color: string; }> = {
  Urban: {
    icon: Building2,
    color: 'hsl(220, 80%, 60%)',
  },
  Suburban: {
    icon: Home,
    color: 'hsl(160, 70%, 50%)',
  },
  Rural: {
    icon: Tractor,
    color: 'hsl(90, 60%, 55%)',
  },
  Industrial: {
    icon: Factory,
    color: 'hsl(30, 80%, 50%)',
  },
  Greenspace: {
    icon: Trees,
    color: 'hsl(120, 80%, 30%)',
  },
};
