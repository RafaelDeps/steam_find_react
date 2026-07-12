# Implementation Plan: Dynamic Genre Filter

**Branch**: `002-dynamic-genre-filter` | **Date**: 2026-07-11 | **Spec**: [spec.md](file:///home/rafael/steam_find_react/specs/002-dynamic-genre-filter/spec.md)

**Input**: Feature specification from `/specs/002-dynamic-genre-filter/spec.md`

## Summary
The goal is to modify the Gênero select dropdown list inside the filters panel. Instead of hardcoding a static subset of genres, the application will query the RAWG API `/genres` endpoint on initial mount, parse and normalize the response results, and dynamically render option elements. If the request fails, the application falls back cleanly to a predefined static list of primary genres.

---

## Technical Context

**Language/Version**: JavaScript (ES6+), React 18+

**Primary Dependencies**: None (native fetch API used within existing project)

**Storage**: In-memory React state inside the components

**Testing**: Manual validation scenarios (Console tracking and network request inspection)

**Target Platform**: Modern Web Browsers

**Project Type**: Front-end Web SPA

**Performance Goals**: Populate genres dropdown in <1.5s; fetch asynchronously without blocking recommendations load.

**Constraints**: Fall back silently on API failure to prevent blocking UI interactions.

---

## Constitution Check

- **Principle I (Separation of Concerns)**: The network request logic to fetch genres MUST be declared in `src/services/rawgApi.js`. React UI components must not directly manipulate fetch URLs or parse raw API results. (Status: **Passed**)
- **Principle II (Clean Code)**: Dynamic items mapping must use descriptive variable names and map unique key props (`id`) to React list items. (Status: **Passed**)
- **Principle IV (Data Resiliency)**: Graceful fallback error catching must be built to support API outages, rendering standard core genres if the endpoint is unreachable. (Status: **Passed**)

---

## Project Structure

### Documentation (this feature)

```text
specs/002-dynamic-genre-filter/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/
│   └── rawg-api-client.md # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (affected files)

```text
src/
├── components/
│   └── FiltersPanel.jsx # Affected (dropdown state & effect logic)
├── services/
│   └── rawgApi.js       # Affected (fetchGenres request addition)
```

**Structure Decision**: Option 1: Single project (DEFAULT) - integrating within existing files.

---

## Complexity Tracking

No violations. The proposed implementation strictly adheres to the project constitution.
