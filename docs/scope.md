# Scope & Limitations

This was built in a hackathon timeframe, so it's worth being precise about what's real vs. authored.

## Mocked

- City and settlement data is a hand-built mock dataset — not a live pull from NASA or Copernicus APIs.
- Built-up area and population fields follow Copernicus GHSL data *conventions* (structure and value ranges), not live GHSL values.
- The Z-metric is manually assigned per city — see [The Z-Metric](ref-z-metric.md) for the methodology — not a live-computed GHSL output.
- `/api/optimal-settlements` is an internal route serving the local JSON dataset, not an external NASA/Copernicus call.

## Real

- The app is a real, deployable Next.js application that builds cleanly.
- Map rendering, marker color interpolation, and both popup templates are custom-written — see [Architecture](ref-architecture.md).

## AI-assisted

- The UI shell (layout, sidebar, most `src/components/ui` components) is AI-assisted/scaffolded using Cursor and Firebase Studio, within the hackathon's allowed AI limit and declared in the submission.

## Known limitations

- No live external data source — NASA/Copernicus integration is referenced by the Z-metric methodology, but not live.
- `genkit` AI dependencies are listed in `package.json` but unused — leftover scaffolding, not an active feature.
- Only 10 candidate settlement locations are included, and the selection logic behind them is illustrative rather than derived from a real optimization model.
