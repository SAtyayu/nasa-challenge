(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/map/fresh-city-map.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const FreshCityMap = ({ cities, selectedCity, onSelectCity })=>{
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FreshCityMap.useEffect": ()=>{
            if (!mapRef.current) return;
            // Load Leaflet dynamically
            const loadMap = {
                "FreshCityMap.useEffect.loadMap": async ()=>{
                    // Load CSS
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                    document.head.appendChild(link);
                    // Load JS
                    const script = document.createElement('script');
                    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                    script.onload = ({
                        "FreshCityMap.useEffect.loadMap": async ()=>{
                            // Initialize map
                            const L = window.L;
                            const map = L.map(mapRef.current).setView([
                                20,
                                0
                            ], 2);
                            // Add tile layer
                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            }).addTo(map);
                            // Load optimal settlements data
                            const optimalSettlements = await fetch('/api/optimal-settlements').then({
                                "FreshCityMap.useEffect.loadMap": (res)=>res.json()
                            }["FreshCityMap.useEffect.loadMap"]).catch({
                                "FreshCityMap.useEffect.loadMap": ()=>[]
                            }["FreshCityMap.useEffect.loadMap"]);
                            // Helper function to get marker color
                            const getMarkerColor = {
                                "FreshCityMap.useEffect.loadMap.getMarkerColor": (z_metric)=>{
                                    const hue = (1 - z_metric) * 120;
                                    return `hsl(${hue}, 90%, 45%)`;
                                }
                            }["FreshCityMap.useEffect.loadMap.getMarkerColor"];
                            // Add existing city markers
                            cities.forEach({
                                "FreshCityMap.useEffect.loadMap": (city)=>{
                                    const marker = L.circleMarker([
                                        city.latitude,
                                        city.longitude
                                    ], {
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
                                    marker.on('click', {
                                        "FreshCityMap.useEffect.loadMap": ()=>{
                                            onSelectCity(city);
                                        }
                                    }["FreshCityMap.useEffect.loadMap"]);
                                }
                            }["FreshCityMap.useEffect.loadMap"]);
                            // Add optimal settlement markers
                            optimalSettlements.forEach({
                                "FreshCityMap.useEffect.loadMap": (settlement)=>{
                                    const marker = L.circleMarker([
                                        settlement.latitude,
                                        settlement.longitude
                                    ], {
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
                                }
                            }["FreshCityMap.useEffect.loadMap"]);
                            mapInstanceRef.current = map;
                        }
                    })["FreshCityMap.useEffect.loadMap"];
                    document.head.appendChild(script);
                }
            }["FreshCityMap.useEffect.loadMap"];
            loadMap();
            // Cleanup
            return ({
                "FreshCityMap.useEffect": ()=>{
                    if (mapInstanceRef.current) {
                        mapInstanceRef.current.remove();
                        mapInstanceRef.current = null;
                    }
                }
            })["FreshCityMap.useEffect"];
        }
    }["FreshCityMap.useEffect"], [
        cities,
        onSelectCity
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mapRef,
        className: "h-full w-full"
    }, void 0, false, {
        fileName: "[project]/src/components/map/fresh-city-map.tsx",
        lineNumber: 137,
        columnNumber: 10
    }, this);
};
_s(FreshCityMap, "HGOaeZ8o3YxgkGMPZTdc6qMIX/A=");
_c = FreshCityMap;
const __TURBOPACK__default__export__ = FreshCityMap;
var _c;
__turbopack_context__.k.register(_c, "FreshCityMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/map/fresh-city-map.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/map/fresh-city-map.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_components_map_fresh-city-map_tsx_bc482459._.js.map