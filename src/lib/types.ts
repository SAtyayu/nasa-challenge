export type LandUseType = "Urban" | "Suburban" | "Rural" | "Industrial" | "Greenspace";
export type SettlementType = "New City" | "Eco-City" | "Green City" | "Desert City" | "Arctic City" | "Mountain City" | "Wind City" | "Research City";

export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  land_type: LandUseType;
  built_up_area_m2: number;
  z_metric: number;
  environmental_problem: string;
  environmental_solution: string;
}

export interface OptimalSettlement {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  land_type: LandUseType;
  built_up_area_m2: number;
  z_metric: number;
  settlement_type: SettlementType;
  priority_score: number;
  environmental_advantages: string;
  infrastructure_potential: string;
  sustainability_features: string;
  urban_planning_recommendations: string;
  relief_pressure_on: string[];
  development_timeline: string;
  estimated_capacity: string;
}
