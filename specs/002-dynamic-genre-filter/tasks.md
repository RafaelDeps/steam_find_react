# Tasks: Dynamic Genre Filter

**Input**: Design documents from `/specs/002-dynamic-genre-filter/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/rawg-api-client.md

**Tests**: None requested. Validation is handled manually using scenarios defined in [quickstart.md](file:///home/rafael/steam_find_react/specs/002-dynamic-genre-filter/quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verification of active codebase baseline

- [X] T001 Verify active development configurations and branch environment

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Backend integrations and API updates blocking user stories

- [X] T002 Implement the `fetchGenres` API method and mapping functions in `src/services/rawgApi.js`

**Checkpoint**: Foundation ready - UI story implementation can now begin.

---

## Phase 3: User Story 1 - Dynamic Genre Dropdown loading (Priority: P1) 🎯 MVP

**Goal**: Populate dropdown options dynamically from RAWG API `/genres`.

**Independent Test**: App loads, fetches genres, select menu populates and gets enabled.

### Implementation for User Story 1

- [X] T003 [US1] Create state hooks inside `src/components/FiltersPanel.jsx` to track loading, error, and list items
- [X] T004 [US1] Implement `useEffect` logic to trigger `fetchGenres` on mount in `src/components/FiltersPanel.jsx`
- [X] T005 [US1] Map dynamic genres items to `<option>` tags inside the dropdown select in `src/components/FiltersPanel.jsx`
- [X] T006 [US1] Implement try/catch block with fallback static list representation inside `src/components/FiltersPanel.jsx`

**Checkpoint**: Genre selection dropdown loads categories dynamically from API.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Testing validation and production builds

- [X] T007 Execute manual test scenarios from `quickstart.md` and verify Vite production build compilation

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup. Blocks User Story 1.
- **User Story 1 (Phase 3)**: Depends on Foundational completion.
- **Polish (Phase 4)**: Depends on User Story 1.

---

## Implementation Strategy
1. Add `fetchGenres` request to `src/services/rawgApi.js`.
2. Connect state, loading flags, and error falls in `src/components/FiltersPanel.jsx`.
3. Verify dropdown functions and build output.
