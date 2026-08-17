# Architecture

A high-level look at how the dashboard is put together.

## Data flow

- City data lives in `src/lib/*.json` and is imported directly into the map component — no API round-trip for cities.
- Settlement data is served by a single internal API route, `/api/optimal-settlements`, which reads `optimal-settlement-data.json` and returns it as-is. The map component fetches from this route client-side rather than importing it directly.

## Map rendering

- Leaflet is loaded **dynamically**, client-side only — it isn't imported at the top of the module, since Leaflet depends on `window` and breaks under Next.js server-side rendering if loaded eagerly.
- Marker **color** is computed by interpolating along a color scale keyed to each city's `z_metric` value (0 → green, 1 → red).
- Two separate **popup templates** are built: one for city markers (population / land use / Z-metric / problem / solution), one for settlement markers (type / priority score / capacity / timeline / notes) — see [Reading a City Card](guide-city-card.md) and [Reading a Settlement Card](guide-settlement-card.md) for what each renders.

## UI shell

- Sidebar, layout, and most components under `src/components/ui` are shadcn/Radix-based and AI-assisted/scaffolded.
- The map component, marker/color logic, and both popup templates are hand-written.

See [Scope & Limitations](scope.md) for the full breakdown of what's custom-built vs. scaffolded vs. mocked.
