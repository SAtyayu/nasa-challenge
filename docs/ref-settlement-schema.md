# Settlement Data Schema

Each of the 10 candidate settlements in `optimal-settlement-data.json` follows this structure.

| Field | Type | Description |
|---|---|---|
| `name` | string | Settlement name |
| `type` | string | Settlement archetype (e.g. Mountain City, Coastal City) |
| `priority_score` | number (0–100) | Ranking of how strong a candidate this location is |
| `capacity` | string/range | Estimated resident capacity range |
| `timeline` | string | Estimated development horizon, in years |
| `environmental_advantages` | string | Natural conditions favoring the site |
| `infrastructure_potential` | string | Infrastructure types the location supports |
| `urban_planning` | string | Planning approach notes for the site |
| `latitude` / `longitude` | number | Marker coordinates on the map |

Served by the internal `/api/optimal-settlements` route — see [Architecture](ref-architecture.md) for how the map fetches it.
