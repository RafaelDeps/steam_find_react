# Tasks: Documentation and README Update

**Input**: Design documents from `/specs/004-documentation-update/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: No automated test suites are requested. Testing consists of manual validation of served markdown and built assets.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- Paths shown assume single project structure at repository root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic verification

- [X] T001 Verify MkDocs environment and configuration in mkdocs.yml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure checks

- [X] T002 Verify local Python and Node.js command configurations before editing documentation files

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Comprehensive Project Documentation Portal (Priority: P1) 🎯 MVP

**Goal**: Update the MkDocs main documentation file with complete details about the application structure, SDD methodology, and tech stack.

**Independent Test**: Build or serve the documentation and verify `docs/index.md` contains the SPA Tinder description, SDD methodology section, and the list of technologies.

### Implementation for User Story 1

- [X] T003 [US1] Update `docs/index.md` with complete project introduction describing SteamFind as a React SPA Tinder-style game recommendation app using RAWG API and dynamic pagination
- [X] T004 [US1] Add a dedicated section in `docs/index.md` explaining that the project was developed using Specification-Driven Development (SDD) via SpecKit
- [X] T005 [US1] List the tech stack (React, Vite, Tailwind CSS, MkDocs, GitHub Actions CI/CD) in `docs/index.md`

**Checkpoint**: At this point, User Story 1 should be fully complete and testable independently.

---

## Phase 4: User Story 2 - Root Repository README File (Priority: P1)

**Goal**: Create or update the root `README.md` with project description, SDD/SpecKit reference, installation/dev/docs local commands, and built docs access route.

**Independent Test**: Open and read the root `README.md` to verify it lists all onboarding information and local run commands.

### Implementation for User Story 2

- [X] T006 [US2] Update root `README.md` with project description and SDD/SpecKit methodology details
- [X] T007 [US2] Add clear instructions and terminal commands for local execution (`npm install`, `npm run dev`, `mkdocs serve`) in root `README.md`
- [X] T008 [US2] Document the path access for built documentation under the `/docs` route of the compiled production output in root `README.md`

**Checkpoint**: At this point, User Story 2 should be fully complete.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Verifying final built outputs and alignment.

- [X] T009 [P] Run static build commands to test compilation of Vite and MkDocs
- [X] T010 Run `specs/004-documentation-update/quickstart.md` validation scenarios to ensure complete coverage

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Stories (Phase 3 & 4)**: Depend on Foundational phase completion. US1 and US2 can run in parallel since they modify completely different files (`docs/index.md` and `README.md`).
- **Polish (Final Phase)**: Depends on both US1 and US2 being completed.

### Parallel Opportunities

- T003 (modifying `docs/index.md`) and T006 (modifying `README.md`) can be worked on in parallel.
- Build testing (T009) can run in parallel with general polish.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (`docs/index.md`)
4. Validate documentation rendering.

### Incremental Delivery

1. Complete US1.
2. Complete US2.
3. Validate entire integration.
