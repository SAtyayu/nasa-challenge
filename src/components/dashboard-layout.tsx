"use client";

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import type { City } from '@/lib/types';
import FiltersPanel from '@/components/sidebar/filters-panel';
import ChartsPanel from '@/components/sidebar/charts-panel';
import Header from '@/components/layout/header';
import allCityData from '@/lib/enhanced-city-data.json';
import { MapLegend } from './map/map-legend';
import SettlementLegend from './map/settlement-legend';
import { LandUseType } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

const CityMap = dynamic(() => import('@/components/map/fresh-city-map'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

const cities = allCityData as City[];

const DashboardLayout: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const populationExtent = useMemo((): [number, number] => {
    const populations = cities.map(c => c.population);
    return [Math.min(...populations), Math.max(...populations)];
  }, []);

  const builtUpAreaExtent = useMemo((): [number, number] => {
    const areas = cities.map(c => c.built_up_area_m2);
    return [Math.min(...areas), Math.max(...areas)];
  }, []);

  const zMetricExtent = useMemo((): [number, number] => {
    const metrics = cities.map(c => c.z_metric);
    return [Math.min(...metrics), Math.max(...metrics)];
  }, []);

  const [populationRange, setPopulationRange] = useState<[number, number]>(populationExtent);
  const [builtUpAreaRange, setBuiltUpAreaRange] = useState<[number, number]>(builtUpAreaExtent);
  const [zMetricRange, setZMetricRange] = useState<[number, number]>(zMetricExtent);
  const [selectedLandTypes, setSelectedLandTypes] = useState<Set<LandUseType>>(new Set());

  const filteredCities = useMemo(() => {
    return cities.filter(city => {
      const popMatch = city.population >= populationRange[0] && city.population <= populationRange[1];
      const areaMatch = city.built_up_area_m2 >= builtUpAreaRange[0] && city.built_up_area_m2 <= builtUpAreaRange[1];
      const zMatch = city.z_metric >= zMetricRange[0] && city.z_metric <= zMetricRange[1];
      const landTypeMatch = selectedLandTypes.size === 0 || selectedLandTypes.has(city.land_type);
      return popMatch && areaMatch && zMatch && landTypeMatch;
    });
  }, [populationRange, builtUpAreaRange, zMetricRange, selectedLandTypes]);

  useEffect(() => {
    if (selectedCity && !filteredCities.find(c => c.id === selectedCity.id)) {
      setSelectedCity(null);
    }
  }, [filteredCities, selectedCity]);

  const handleResetFilters = () => {
    setPopulationRange(populationExtent);
    setBuiltUpAreaRange(builtUpAreaExtent);
    setZMetricRange(zMetricExtent);
    setSelectedLandTypes(new Set());
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" className="w-[var(--sidebar-width)] transition-all" style={{'--sidebar-width': '24rem'} as React.CSSProperties}>
        <SidebarHeader>
          <h1 className="text-2xl font-bold font-headline text-primary">City Insights Hub</h1>
          <p className="text-sm text-muted-foreground">Urban Planning Dashboard</p>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <FiltersPanel
            populationRange={populationRange}
            onPopulationChange={setPopulationRange}
            populationExtent={populationExtent}
            builtUpAreaRange={builtUpAreaRange}
            onBuiltUpAreaChange={setBuiltUpAreaRange}
            builtUpAreaExtent={builtUpAreaExtent}
            zMetricRange={zMetricRange}
            onZMetricChange={setZMetricRange}
            zMetricExtent={zMetricExtent}
            selectedLandTypes={selectedLandTypes}
            onLandTypesChange={setSelectedLandTypes}
            onReset={handleResetFilters}
          />
          <ChartsPanel data={filteredCities} />
        </SidebarContent>
        <SidebarFooter>
          <MapLegend />
          <SettlementLegend />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <div className="relative flex-1">
          <CityMap
            cities={filteredCities}
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
