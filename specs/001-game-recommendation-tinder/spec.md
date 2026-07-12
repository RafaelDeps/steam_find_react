# Feature Specification: Game Recommendation Tinder SPA

**Feature Branch**: `001-game-recommendation-tinder`

**Created**: 2026-07-11

**Status**: Ready

**Input**: User description: "App de recomendação de jogos estilo Tinder (SPA). Exibe um card central com dados da API do RAWG. Interatividade: Botões Like/Dislike removem o card e exibem o próximo instantaneamente via estado do React. Acessibilidade: Navegação por teclado. Pivotagem: Botão no card para 'recomeçar busca usando este jogo como base'. Filtros: Gêneros, Plataformas e 'free-to-play'. Configuração: O agente DEVE criar um arquivo '.env.example' na raiz contendo a declaração 'VITE_RAWG_API_KEY='."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Tinder-Style Game Swiping (Priority: P1)

Users can view game recommendations as cards one by one, swiping/voting them with "Like" or "Dislike" actions to find games of interest.

**Why this priority**: It is the core interaction of the application; without a central card and swiping mechanism, the app has no functional identity.

**Independent Test**: The app can be loaded, displays a single game recommendation, and clicking either "Like" or "Dislike" removes the current game and displays a new game card.

**Acceptance Scenarios**:

1. **Given** the application has loaded game recommendations, **When** the page renders, **Then** the user sees a single, centrally located game card displaying details (cover image, title, user rating, platforms, genres).
2. **Given** a game card is displayed, **When** the user clicks the "Like" button, **Then** the swiped game is saved to a list of liked games, the card is immediately removed, and the next game is loaded.
3. **Given** a game card is displayed, **When** the user clicks the "Dislike" button, **Then** the card is immediately removed, and the next game is loaded.

---

### User Story 2 - Recommendation Query Customization / Filters (Priority: P2)

Users can filter the game recommendations feed by specific genres, target platforms, and "free-to-play" availability.

**Why this priority**: Gives users control over what is recommended, preventing them from seeing irrelevant suggestions.

**Independent Test**: The user changes a filter selection, and the next swiped cards only display games matching the selected filter criteria.

**Acceptance Scenarios**:

1. **Given** the filter options panel is open, **When** the user selects a genre (e.g., "RPG"), **Then** the active recommendations stack is updated, and all subsequent game cards displayed belong to the "RPG" genre.
2. **Given** the filter options panel is open, **When** the user toggles the "Free-to-Play" filter, **Then** only games that are free-to-play are loaded into the card stack.

---

### User Story 3 - Search Pivoting (Priority: P2)

Users can use any recommended game card as a seed to discover other similar games, resetting the recommendations stack around it.

**Why this priority**: Enhances discovery by letting the user pivot the recommendation algorithm dynamically toward a specific title they enjoy.

**Independent Test**: The user clicks the pivot action on a card, and the next set of recommendations is generated based on similarity to that seed game.

**Acceptance Scenarios**:

1. **Given** a game card is displayed, **When** the user clicks the "Restart search using this game as base" button, **Then** the current search filters are augmented or reset to find games similar to the seed game, and a new recommendation queue is loaded.

---

### User Story 4 - Keyboard Accessibility (Priority: P3)

Users can browse and swipe game recommendations entirely using the keyboard.

**Why this priority**: Ensures accessibility for users with motor impairments or those who prefer keyboard navigation.

**Independent Test**: The user can perform all swiping actions and navigation using only the keyboard.

**Acceptance Scenarios**:

1. **Given** a game card is active, **When** the user presses the Right Arrow key, **Then** the card is marked as "Liked" and the next card is displayed.
2. **Given** a game card is active, **When** the user presses the Left Arrow key, **Then** the card is marked as "Disliked" and the next card is displayed.
3. **Given** the page is active, **When** the user tabs through the interface, **Then** a visible focus indicator highlights all active controls (buttons, selectors, toggles).

---

### Edge Cases

- **RAWG API Rate Limit / Network Errors**: If the RAWG API is down or rate-limited, the card area must show a clean, user-friendly error message detailing the issue and a "Try Again" action button.
- **Empty Recommendations Queue**: When filters are set too strictly and no matching games are found, the UI must display a message indicating no results were found and present a "Reset Filters" action button.
- **End of Card Stack**: When the pre-fetched queue is empty and new cards are loading, a smooth loading skeleton MUST be shown so the interface does not feel broken.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render a single-page application (SPA) layout containing a central game card display, an interactive controls bar, and a filters panel.
- **FR-002**: The system MUST retrieve game data from the RAWG API including title, cover image, rating, genres, platforms, and description.
- **FR-003**: The system MUST maintain a local queue of game cards to allow instant transitions (under 100ms) upon liking or disliking.
- **FR-004**: The system MUST provide interactive buttons for "Like" and "Dislike" that remove the current card and render the next game in the queue.
- **FR-005**: The system MUST allow filtering recommendations by Genres, Platforms, and Free-to-Play tag.
- **FR-006**: The system MUST support a pivot action ("recomeçar busca usando este jogo como base") that queries similar games via RAWG API endpoints (e.g., game series, same creators, or similar tags).
- **FR-007**: The system MUST map keyboard inputs (Left Arrow to Dislike, Right Arrow to Like) to card swiping actions.
- **FR-008**: The system MUST store and reference the RAWG API Key securely using environment variables (`VITE_RAWG_API_KEY`).

### Key Entities

- **GameCard**: Represents a single video game data payload with id, name, cover image URL, rating, description, platforms, and genres list.
- **FilterConfiguration**: Holds the active filter state (selected genres, selected platforms, and free-to-play toggle).
- **GameQueue**: Represents the ordered list of pre-fetched game data instances waiting to be rendered as active cards.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After clicking Like/Dislike or pressing arrow keys, the subsequent card MUST render on-screen in under 100 milliseconds (when next card data is pre-fetched/cached).
- **SC-002**: 100% of interactive controls MUST be accessible via keyboard tab navigation, with visible focus indicator rings.
- **SC-003**: When changing filters, the new stack of game cards MUST update and render within 2 seconds.

## Assumptions

- The user has a valid RAWG API key to configure in the application.
- The RAWG API provides enough similar games meta-information to support the pivoting search feature.
- Responsive design is expected; the card layout adjusts cleanly between mobile screen sizes and desktop screens.
