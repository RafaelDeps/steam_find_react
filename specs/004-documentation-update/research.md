# Research: Documentation and README Update

## Decisions & Rationale

### Decision 1: Structure and Layout of `docs/index.md`
- **Chosen Option**: Comprehensive single-page overview containing project introduction, SDD methodology section, and tech stack details.
- **Rationale**: SteamFind is a single-page application (SPA), so a highly detailed, clean single-page documentation index is much easier to read and maintain than a complex nested site hierarchy.
- **Alternatives Considered**: A multi-page setup with separate pages for technical architecture, development guide, and deployment instructions. This was rejected because the scope of the app is small, and keeping the information consolidated on a single page prevents fragmentation and improves scannability.

### Decision 2: Root `README.md` Organization
- **Chosen Option**: Standard project onboarding format featuring: Project Summary, SDD/SpecKit Methodology section, Local Run Instructions (Node + Python), and Documentation Access route.
- **Rationale**: Centralizing both Node.js React/Vite instructions and Python MkDocs serve commands in the root README ensures developers have a single source of truth for setting up and running all aspects of the repository.
- **Alternatives Considered**: Split README instructions (a README.md in the root and another under `docs/`). This was rejected as it increases friction for developers, who would have to look in multiple places to set up the dev environment.

### Decision 3: Local MkDocs Development Flow
- **Chosen Option**: Run `mkdocs serve` for local previewing during documentation development.
- **Rationale**: `mkdocs serve` runs a local development server with live reload, making it simple to preview markdown changes immediately in the browser.
- **Alternatives Considered**: Building MkDocs locally and opening the static `.html` files in the browser manually. This was rejected because manual building is slow and lacks auto-reload features.
