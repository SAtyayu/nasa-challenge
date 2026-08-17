# The Z-Metric

The Z-metric is the 0–1 environmental risk score that drives every city marker's color on the map. It's a manually-assigned composite score, not a live-computed output — it was derived in a two-step process, outside the app's code.

## Step 1 — Land-type base score

Each city starts from a base score tied to its land-use tier, consistent with GHSL's Degree of Urbanisation concept:

| Land type | Approximate base score |
|---|---|
| Greenspace | 0.1 – 0.2 |
| Rural / Suburban | 0.5 – 0.6 |
| Urban / Industrial | 0.8+ |

## Step 2 — Adjustment

That base value is nudged per city using:

- **Population scale** (log-scaled, since population is heavily right-skewed across a global city set)
- **General real-world knowledge of the city's environmental/pollution reputation**, based on AQI

## Result

The final value is directionally consistent with land type and population scale, but there's no single fixed equation that reproduces it — it's a qualitative composite score assigned per city, not a formula you could re-derive from the dataset alone.

This score is what [Filtering Cities](guide-filters.md) filters against, and what determines [marker color](guide-map.md).
