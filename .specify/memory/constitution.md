<!--
Sync Impact Report:
- Version change: None (Initial) -> 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] -> I. Single Responsibility & Separation of Concerns
  - [PRINCIPLE_2_NAME] -> II. Modular Componentization & Clean Code
  - [PRINCIPLE_3_NAME] -> III. Tailwind CSS Styling & Theme Support (Dark/Light)
  - [PRINCIPLE_4_NAME] -> IV. RAWG API Data Source Integration
  - [PRINCIPLE_5_NAME] -> V. Zero-Based Base Infrastructure & GitHub Pages Hosting
- Added sections:
  - Tech Stack and Infrastructure Constraints
  - Coding and Architecture Standards
- Removed sections: None
- Templates requiring updates:
  - `.specify/templates/plan-template.md` (✅ updated/aligned)
  - `.specify/templates/spec-template.md` (✅ updated/aligned)
  - `.specify/templates/tasks-template.md` (✅ updated/aligned)
- Follow-up TODOs: None
-->

# Steam Find React Constitution

## Core Principles

### I. Single Responsibility & Separation of Concerns
All raw data fetching, API requests, and business logic MUST be completely isolated from the UI presentation layer. Components MUST only consume formatted data and handle local user interaction. API interactions MUST reside in dedicated services and hooks under the `src/services/` and `src/hooks/` directories.

### II. Modular Componentization & Clean Code
Code MUST be structured into reusable, atomic, and modular UI components. All variables, functions, and files MUST use clear, descriptive English naming conventions. Magic numbers and hardcoded configurations MUST be avoided, favoring constants and configuration objects.

### III. Tailwind CSS Styling & Theme Support
All application styling MUST be implemented using Tailwind CSS utility classes. Styling custom CSS rules MUST be avoided unless Tailwind cannot support them. The application MUST support Dark and Light themes natively, toggled dynamically (via a Tailwind `class` approach or system preference).

### IV. RAWG API Data Source Integration
The RAWG API (rawg.io) MUST be the sole data source for game information. All API requests MUST implement robust handling of loading, empty, and error states to ensure a fluid and resilient user experience. Raw API responses SHOULD be structured and validated before delivery to components.

### V. Zero-Based Base Infrastructure & GitHub Pages Hosting
The project setup MUST configure base infrastructure configuration files (`package.json`, `vite.config.js`, `tailwind.config.js`) from scratch without depending on pre-made boilerplate templates. The build pipeline MUST produce static assets optimized for hosting on GitHub Pages, including proper base-path configuration.

## Tech Stack and Infrastructure Constraints
- Stack Tecnológica: React, Vite, JavaScript (JSX), and Tailwind CSS.
- Configuration: All base config files MUST be initialized from scratch (`package.json`, `vite.config.js`, `tailwind.config.js`).
- Deployment: Must build to static files ready for deployment on GitHub Pages.

## Coding and Architecture Standards
- Separar lógica de API da camada de UI (API client em `src/services/`).
- Nomenclatura clara e Clean Code.
- Componentes modulares e reutilizáveis em `src/components/`.

## Governance
- All code reviews, development phases, and plans MUST be validated against this Constitution.
- Any deviation from the core principles MUST be documented, justified, and ratified.
- Amendments to this constitution require a version bump (MAJOR for removals/redefinitions, MINOR for additions, PATCH for clarifications) and must update the amendment dates.

**Version**: 1.0.0 | **Ratified**: 2026-07-11 | **Last Amended**: 2026-07-11
