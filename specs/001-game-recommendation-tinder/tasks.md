# Tasks: Game Recommendation Tinder SPA

**Input**: Design documents from `/specs/001-game-recommendation-tinder/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/rawg-api-client.md

**Tests**: None requested. Verification is handled via manual browser interactions defined in [quickstart.md](file:///home/rafael/steam_find_react/specs/001-game-recommendation-tinder/quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base configuration files

- [X] T001 Initialize React and Vite package dependencies in `package.json`
- [X] T002 Configure Vite bundler options and output path in `vite.config.js`
- [X] T003 Configure Tailwind CSS design tokens and dark mode variant in `tailwind.config.js`
- [X] T004 Create Tailwind entry stylesheet in `src/styles/index.css`
- [X] T005 Create HTML entry document in `index.html` referencing `src/main.jsx`
- [X] T006 Create React mounting entrypoint in `src/main.jsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that must be complete before any user story can start

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T007 Implement the RAWG API client and normalization mapper functions in `src/services/rawgApi.js`
- [X] T008 Setup theme context provider (Dark/Light) and toggle hook in `src/components/ThemeProvider.jsx`
- [X] T009 Create queue buffering custom hook `useGameSwiper` to pre-fetch recommendations in `src/hooks/useGameSwiper.js`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Tinder-Style Game Swiping (Priority: P1) 🎯 MVP

**Goal**: Display a single game card with swipe controls (Like/Dislike) and transition between cards instantly.

**Independent Test**: App loads a card. Clicking Like or Dislike removes it and renders the next card instantly.

### Implementation for User Story 1

- [X] T010 [P] [US1] Create the swiping Game Card component in `src/components/GameCard.jsx`
- [X] T011 [P] [US1] Create the swiping Action Buttons (Like/Dislike) component in `src/components/SwipeButtons.jsx`
- [X] T012 [US1] Integrate the swiping hook and card stack layout in `src/App.jsx`
- [X] T013 [US1] Implement card swiping animation effects in `src/components/GameCard.css`

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Recommendation Query Customization / Filters (Priority: P2)

**Goal**: Filter recommendations by Genre, Platform, and Free-to-Play status.

**Independent Test**: Selecting a Genre/Platform updates the cards to match.

### Implementation for User Story 2

- [X] T014 [US2] Create the filter options control panel component in `src/components/FiltersPanel.jsx`
- [X] T015 [P] [US2] Update the API client in `src/services/rawgApi.js` to filter by genres, platforms, and free-to-play tags
- [X] T016 [US2] Integrate the active filter configuration state with the swiping hook in `src/App.jsx`

**Checkpoint**: Filters work and correctly reload the game swiping deck.

---

## Phase 5: User Story 3 - Search Pivoting (Priority: P2)

**Goal**: Use a card as a seed for discovery, restarting search.

**Independent Test**: Click "Restart search using this game as base" and cards update to similar games.

### Implementation for User Story 3

- [X] T017 [US3] Add the pivot search action button to the Game Card component in `src/components/GameCard.jsx`
- [X] T018 [P] [US3] Add detail fetch endpoint to API client in `src/services/rawgApi.js` to retrieve seed game tags and genres
- [X] T019 [US3] Implement similar game pivot queue loading state changes in `src/hooks/useGameSwiper.js`

**Checkpoint**: Users can pivot recommendations stack based on any game card.

---

## Phase 6: User Story 4 - Keyboard Accessibility (Priority: P3)

**Goal**: Allow swiping via Left/Right Arrow keys and provide visible tab focus states.

**Independent Test**: Press Left/Right arrow keys to swipe card, and use Tab to navigate with visible outlines.

### Implementation for User Story 4

- [X] T020 [US4] Create keyboard binding event listener hook `useKeyboardSwipe` in `src/hooks/useKeyboardSwipe.js`
- [X] T021 [US4] Integrate keypress controls with card swipe state actions in `src/App.jsx`
- [X] T022 [US4] Configure visible focus outline class states for all button and control elements in `src/styles/index.css`

**Checkpoint**: Full keyboard swiping and focus-ring accessibility features are active.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: UX adjustments, state preservation, and production configurations

- [X] T023 Create clean loading skeletons and error state components in `src/components/FeedbackStates.jsx`
- [X] T024 Integrate `localStorage` cache for liked and disliked histories in `src/hooks/useGameSwiper.js`
- [X] T025 Adjust base path build configs for GitHub Pages path rendering in `vite.config.js`
- [X] T026 Execute manual testing scenarios from `quickstart.md` and clean code annotations

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion. Blocks all User Stories.
- **User Stories (Phases 3 to 6)**: All depend on Foundational completion. Can run in parallel or sequentially.
- **Polish (Phase 7)**: Depends on all User Story phases.

### Parallel Opportunities
- In Phase 3: `T010` (GameCard) and `T011` (SwipeButtons) can be built in parallel.
- In Phase 4: `T015` (API filter updates) can be done in parallel with filter UI design (`T014`).
- In Phase 5: `T018` (API seed query detail) can run in parallel with card button placement (`T017`).
- In Phase 6: Hook configuration (`T020`) and focus styling design (`T022`) can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (User Story 1 - Swiping Interface).
3. Validate swiping functions in browser before continuing to filters or pivot features.
