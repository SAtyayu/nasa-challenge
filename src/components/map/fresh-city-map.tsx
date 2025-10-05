"use client";

import React, { useEffect, useRef } from 'react';
import type { City, OptimalSettlement } from '@/lib/types';

interface CityMapProps {
  cities: City[];
  selectedCity: City | null;
  onSelectCity: (city: City | null) => void;
}

const FreshCityMap: React.FC<CityMapProps> = ({ cities, selectedCity, onSelectCity }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Load Leaflet dynamically
    const loadMap = async () => {
      // Load CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Load JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = async () => {
        // Initialize map
        const L = (window as any).L;
        const map = L.map(mapRef.current).setView([20, 0], 2);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Load optimal settlements data
        const optimalSettlements = await fetch('/api/optimal-settlements').then(res => res.json()).catch(() => []);

        // Helper function to get marker color
        const getMarkerColor = (z_metric: number) => {
          const hue = (1 - z_metric) * 120;
          return `hsl(${hue}, 90%, 45%)`;
        };

        // Add existing city markers
        cities.forEach(city => {
          const marker = L.circleMarker([city.latitude, city.longitude], {
            radius: 12,
            fillColor: getMarkerColor(city.z_metric),
            color: 'white',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(map);

          // Add popup
          const popupContent = `
            <div style="background: white; padding: 15px; border-radius: 8px; min-width: 300px; max-width: 400px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <div style="font-weight: bold; font-size: 18px; margin-bottom: 10px; color: #2c3e50;">${city.name}</div>
              <div style="font-size: 12px; color: #666; margin-bottom: 15px;">
                <div style="margin-bottom: 5px;"><strong>Population:</strong> ${city.population.toLocaleString()}</div>
                <div style="margin-bottom: 5px;"><strong>Z-Metric:</strong> ${city.z_metric}</div>
                <div style="margin-bottom: 5px;"><strong>Land Use:</strong> ${city.land_type}</div>
              </div>
              <div style="border-top: 1px solid #eee; padding-top: 10px;">
                <div style="font-weight: bold; color: #e74c3c; font-size: 14px; margin-bottom: 8px;">🌍 Environmental Problem:</div>
                <div style="font-size: 11px; color: #666; margin-bottom: 10px; line-height: 1.4;">${city.environmental_problem}</div>
                <div style="font-weight: bold; color: #27ae60; font-size: 14px; margin-bottom: 8px;">💡 Solution:</div>
                <div style="font-size: 11px; color: #666; line-height: 1.4;">${city.environmental_solution}</div>
              </div>
            </div>
          `;
          
          marker.bindPopup(popupContent);
          
          // Add click handler
          marker.on('click', () => {
            onSelectCity(city);
          });
        });

        // Add optimal settlement markers
        optimalSettlements.forEach(settlement => {
          const marker = L.circleMarker([settlement.latitude, settlement.longitude], {
            radius: 15,
            fillColor: '#2ecc71',
            color: '#27ae60',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(map);

          // Add popup for settlements
          const popupContent = `
            <div style="background: linear-gradient(135deg, #2ecc71, #27ae60); color: white; padding: 15px; border-radius: 8px; min-width: 350px; max-width: 450px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <div style="font-weight: bold; font-size: 18px; margin-bottom: 10px;">🏙️ ${settlement.name}</div>
              <div style="font-size: 12px; margin-bottom: 15px; opacity: 0.9;">
                <div style="margin-bottom: 5px;"><strong>Type:</strong> ${settlement.settlement_type}</div>
                <div style="margin-bottom: 5px;"><strong>Priority Score:</strong> ${settlement.priority_score}/100</div>
                <div style="margin-bottom: 5px;"><strong>Capacity:</strong> ${settlement.estimated_capacity}</div>
                <div style="margin-bottom: 5px;"><strong>Timeline:</strong> ${settlement.development_timeline}</div>
              </div>
              <div style="border-top: 1px solid rgba(255,255,255,0.3); padding-top: 10px;">
                <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">🌱 Environmental Advantages:</div>
                <div style="font-size: 11px; margin-bottom: 10px; line-height: 1.4; opacity: 0.9;">${settlement.environmental_advantages}</div>
                <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">🏗️ Infrastructure Potential:</div>
                <div style="font-size: 11px; margin-bottom: 10px; line-height: 1.4; opacity: 0.9;">${settlement.infrastructure_potential}</div>
                <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">💡 Urban Planning:</div>
                <div style="font-size: 11px; line-height: 1.4; opacity: 0.9;">${settlement.urban_planning_recommendations}</div>
              </div>
            </div>
          `;
          
          marker.bindPopup(popupContent);
        });

        mapInstanceRef.current = map;
      };
      document.head.appendChild(script);
    };

    loadMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [cities, onSelectCity]);

  return <div ref={mapRef} className="h-full w-full" />;
};

export default FreshCityMap;
