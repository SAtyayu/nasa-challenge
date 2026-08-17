# Urban Planning Dashboard — MADE FOR NASA SPACE APPS CHALLENGE 2025

It is an interactive dashboard to visualise data regarding environment and settlement across major cities in the world. For the time constraint due to hackathons 50 cities around the globe were included. It's meant as a tool for exploring how population, land use, and environmental risk relate across cities, and for surfacing candidate locations for new sustainable settlements.

## Overview

The dashboard renders an interactive Leaflet map with two layers:

- City markers — 50 cities, color-coded by a computed environmental risk score (z_metric), each with a popup showing population, land type, an environmental problem specific to that city, and a proposed solution.

- Optimal settlement markers — 10 candidate locations for new, sustainably-planned settlements, each with a priority score, estimated capacity, development timeline, and infrastructure/environmental notes.

## Tech stack

- Next.js 15 (App Router) + TypeScript

- Tailwind CSS + shadcn/ui components

- Leaflet.js for the map (loaded dynamically client-side)

- A single internal API route (/api/optimal-settlements) serving settlement data

## What's real vs. what's mocked
 This was built in a hackathon timeframe, and not every piece is a live data pipeline

- City and settlement data is a hand-built mock dataset (src/lib/*.json), not a live pull from NASA or Copernicus APIs. Fields like population, land type, environmental problem/solution text, and the z_metric score were authored manually to demonstrate what the dashboard would look like on real data.

- Built-up area and population fields are informed by Copernicus GHSL data conventions. z_metric is a manually-assigned composite risk score (0–1) inspired by GHSL urbanisation/settlement density concepts, not a live-computed GHSL output.

- Z_metric was computed outside the repo and is not available in the code. The methodology behind it was:

1. Started from a land-type/urbanization-tier base score (Greenspace ≈ 0.1 -- 0.2, Rural/Suburban ≈ 0.5 -- 0.6, Urban/Industrial ≈ 0.8+) — consistent with GHSL's Degree of Urbanisation concept.

2. Nudged that base value per city using population scale (log-scaled) and general real-world knowledge of that city's actual environmental/pollution reputation based on AQI

Finally a value obtained between 0 to 1 was the z_metric

- The /api/optimal-settlements route is an internal API, not an external one — it serves the local JSON dataset. The map component fetches from this route client-side.

- The map rendering, marker logic, color interpolation, and popup construction are custom-written
 this is the core logic I built myself: loading Leaflet dynamically, computing marker color from the risk score, and building two distinct popup templates for cities vs. proposed settlements.

- The UI shell (layout, sidebar, most components under src/components/ui) is AI-assisted/scaffolded (shadcn/Radix)
Usage of cursor and firebase studio for prototyping and interactive ui design which was within the allowed limit by the hackathon

## Running locally

```
git clone https://github.com/SAtyayu/nasa-challenge.git

cd nasa-challenge

npm install

npm run dev
```

Then open http://localhost:3000. This project is not currently hosted — it's meant to be run locally.

To build and run a production build instead:

```
npm run build

npm run start
```

## Known limitations

- No live external data source yet (NASA/Copernicus integration is present but not live but referenced from Z_metric).

- genkit AI dependencies are listed in package.json but unused — leftover scaffolding, not an active feature this was a result of time constrain limiting the implementation of the project

- Only 10 candidate settlement locations are included; the selection logic behind them is illustrative rather than derived from a real optimization model.

## Credits

Built for NASA Space Apps Challenge 2025. Frontend UI scaffolded with Figma;and cursor and firebase within the allowed AI limit and declared in hackathon. Data fetching logic, map rendering, marker/popup logic, and the mock dataset were built and debugged by me.
