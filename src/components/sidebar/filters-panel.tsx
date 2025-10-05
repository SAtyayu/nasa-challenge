"use client";

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { LandUseType } from '@/lib/types';
import { LAND_USE_TYPES } from '@/lib/constants';
import { LandUseIcon } from '../icons';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';

interface FiltersPanelProps {
  populationRange: [number, number];
  onPopulationChange: (value: [number, number]) => void;
  populationExtent: [number, number];
  builtUpAreaRange: [number, number];
  onBuiltUpAreaChange: (value: [number, number]) => void;
  builtUpAreaExtent: [number, number];
  zMetricRange: [number, number];
  onZMetricChange: (value: [number, number]) => void;
  zMetricExtent: [number, number];
  selectedLandTypes: Set<LandUseType>;
  onLandTypesChange: (value: Set<LandUseType>) => void;
  onReset: () => void;
}

const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  populationRange, onPopulationChange, populationExtent,
  builtUpAreaRange, onBuiltUpAreaChange, builtUpAreaExtent,
  zMetricRange, onZMetricChange, zMetricExtent,
  selectedLandTypes, onLandTypesChange, onReset
}) => {

  const handleLandTypeChange = (type: LandUseType, checked: boolean) => {
    const newSet = new Set(selectedLandTypes);
    if (checked) {
      newSet.add(type);
    } else {
      newSet.delete(type);
    }
    onLandTypesChange(newSet);
  };
  
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['population', 'land-use']} className="w-full">
        <AccordionItem value="population">
          <AccordionTrigger>Population</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatNumber(populationRange[0])}</span>
              <span>{formatNumber(populationRange[1])}</span>
            </div>
            <Slider
              min={populationExtent[0]}
              max={populationExtent[1]}
              step={100000}
              value={populationRange}
              onValueChange={(value) => onPopulationChange(value as [number, number])}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="land-use">
          <AccordionTrigger>Land Use Type</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {LAND_USE_TYPES.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedLandTypes.has(type)}
                  onCheckedChange={(checked) => handleLandTypeChange(type, !!checked)}
                />
                <Label htmlFor={type} className="flex items-center gap-2 font-normal">
                  <LandUseIcon landType={type} />
                  {type}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="built-up-area">
          <AccordionTrigger>Built-up Area (km²)</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatNumber(builtUpAreaRange[0] / 1_000_000)}</span>
                <span>{formatNumber(builtUpAreaRange[1] / 1_000_000)}</span>
            </div>
            <Slider
                min={builtUpAreaExtent[0]}
                max={builtUpAreaExtent[1]}
                step={10000000}
                value={builtUpAreaRange}
                onValueChange={(value) => onBuiltUpAreaChange(value as [number, number])}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="z-metric">
          <AccordionTrigger>Environmental (Z) Metric</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
             <div className="flex justify-between text-xs text-muted-foreground">
              <span>{zMetricRange[0].toFixed(2)}</span>
              <span>{zMetricRange[1].toFixed(2)}</span>
            </div>
            <Slider
              min={zMetricExtent[0]}
              max={zMetricExtent[1]}
              step={0.01}
              value={zMetricRange}
              onValueChange={(value) => onZMetricChange(value as [number, number])}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FiltersPanel;
