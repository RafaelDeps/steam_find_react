# Tasks: Pagination & Docs

**Input**: Design documents from `/specs/003-pagination-and-docs/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/rawg-api-client.md

**Tests**: None requested. Validation is handled manually using scenarios defined in [quickstart.md](file:///home/rafael/steam_find_react/specs/003-pagination-and-docs/quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: MkDocs setup and baseline initialization

- [X] T001 Initialize `mkdocs.yml` configuration file in the project root
- [X] T002 Initialize `docs/index.md` project overview document

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core workspace baseline verification

- [X] T003 Verify active development environment configurations

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Endless Swiping Pagination (Priority: P1) 🎯 MVP

**Goal**: Automatically fetch next pages and append to queue, support complete reset to page 1.

**Independent Test**: Swiping triggers automatic page increment fetches, reset filters restores page 1.

### Implementation for User Story 1

- [X] T004 [US1] Rename the `page` state variable to `currentPage` in `src/hooks/useGameSwiper.js`
- [X] T005 [US1] Update queryPage offset logic to map `currentPage` inside `src/hooks/useGameSwiper.js`
- [X] T006 [US1] Update loadMoreGames pagination increments inside `src/hooks/useGameSwiper.js`
- [X] T007 [US1] Implement explicit filters resetting behavior to force reset `currentPage` back to `1` in `src/hooks/useGameSwiper.js`

**Checkpoint**: Application automatically pagination-loads games without feed depletion.

---

## Phase 4: User Story 2 - MkDocs Documentation Link (Priority: P2)

**Goal**: Render documentation link in layout footer.

**Independent Test**: Footer link redirects to local docs directory path.

### Implementation for User Story 2

- [X] T008 [US2] Update `src/App.jsx` filter handlers to trigger page-clearing reset calls
- [X] T009 [US2] Create footer element inside `src/App.jsx` showing copyright details and links to documentation

**Checkpoint**: Developer document site link is integrated in React layout shell.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Verification and builds

- [X] T010 Execute manual testing scenarios from `quickstart.md` and check compilation builds

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup.
- **User Story 1 (Phase 3)**: Depends on Foundational completion.
- **User Story 2 (Phase 4)**: Can run in parallel with Phase 3 (since footer linking and swiper logic touch different files).
- **Polish (Phase 5)**: Depends on all User Story phases.

---

## Implementation Strategy
1. Build MkDocs baseline structures.
2. Integrate `currentPage` state mapping changes inside `src/hooks/useGameSwiper.js`.
3. Link and style footer references inside `src/App.jsx`.
4. Validate builds.
