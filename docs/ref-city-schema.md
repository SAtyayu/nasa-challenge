# City Data Schema

Each of the 50 cities in `src/lib/*.json` follows this structure.

| Field | Type | Description |
|---|---|---|
| `name` | string | City name |
| `population` | number | Population figure |
| `land_type` | string | One of: Urban, Rural, Suburban, Industrial, Greenspace |
| `z_metric` | number (0–1) | Computed environmental risk score — see [The Z-Metric](ref-z-metric.md) |
| `environmental_problem` | string | Free-text description of a specific issue facing the city |
| `environmental_solution` | string | Free-text proposed response to that problem |
| `latitude` / `longitude` | number | Marker coordinates on the map |

This is a hand-built mock dataset — see [Scope & Limitations](scope.md) for what's real vs. authored.
