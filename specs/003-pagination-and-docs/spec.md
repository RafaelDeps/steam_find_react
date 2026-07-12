# Feature Specification: Pagination Bug Fix and MkDocs Structure

**Feature Branch**: `003-pagination-and-docs`

**Created**: 2026-07-11

**Status**: Ready

**Input**: User description: "Correção de Bug (Paginação RAWG): O sistema esgota os jogos porque consome apenas a primeira página. Adicione um estado de 'currentPage'. Quando o array de jogos locais zerar ou chegar aos últimos itens, o sistema deve incrementar o 'currentPage' e fazer um novo fetch automático para alimentar a fila. O botão 'Resetar Filtros' deve obrigatoriamente redefinir a página para 1, limpar o array de jogos e engatilhar um novo fetch. Nova Feature (MkDocs): O agente deve criar a estrutura base do MkDocs (mkdocs.yml na raiz e pasta docs/ com index.md documentando o projeto). No footer do aplicativo React principal, adicione um botão de 'Documentação' que direcione para a rota dos docs."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Endless Swiping Pagination (Priority: P1)

Users can swipe games indefinitely because the application dynamically fetches the next page of recommendations from the RAWG API when the local buffer queue runs low.

**Why this priority**: Resolves a critical bug where the game discovery feed gets exhausted after swiping the first 20 games.

**Independent Test**: Swipe past 15 games. Confirm that the application automatically fetches the next page and appends new cards to the queue without halting the user swiping experience.

**Acceptance Scenarios**:

1. **Given** the swiping queue has 20 games and the current page is `1`, **When** swiped items reduce the queue length to less than `5` items, **Then** the system increments the `currentPage` state to `2` and issues a fetch request for page `2`.
2. **Given** the system has retrieved page `2` games, **When** the new list is normalized and deduped against already swiped games, **Then** the new games are appended to the end of the queue, bringing the queue size above the buffer threshold.
3. **Given** the user is viewing the "Fim da fila!" empty queue state, **When** the user clicks the "Resetar Filtros" button, **Then** the system sets `currentPage` back to `1`, clears the swiped histories or queue, and triggers a fresh request for page `1`.

---

### User Story 2 - MkDocs Documentation Structure & Link (Priority: P2)

Users and developers can access the project's technical documentation via a link in the application footer that opens the generated MkDocs site.

**Why this priority**: Enhances the project's maintainability by establishing a standardized documentation architecture.

**Independent Test**: Click the "Documentação" button in the footer and verify it redirects to the correct static documentation route.

**Acceptance Scenarios**:

1. **Given** the React application is running, **When** the user scrolls to the bottom footer, **Then** a "Documentação" button is visible.
2. **Given** the "Documentação" button is clicked, **When** triggered, **Then** the browser navigates to the documentation site route (e.g. `/docs/` or `./docs/index.html`).

---

### Edge Cases

- **Page Fetch Errors**: If a subsequent page (e.g., page 3) fails to fetch, the app must display an error message but retain the current queue cards so the user can finish swiping whatever is left in memory. Clicking "Tentar Novamente" should retry the failed page (not page 1).
- **Reset during pending fetch**: If a reset is clicked while a page-fetch is pending, the pending fetch must be ignored/canceled, and page 1 must load fresh.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST store and increment `currentPage` state in the recommendation state controller.
- **FR-002**: The system MUST fetch the next page of games automatically when the queue size drops below `5` elements.
- **FR-003**: The "Reset Filters" action MUST reset `currentPage` to `1` and reload the stack.
- **FR-004**: The project root MUST contain a valid `mkdocs.yml` configuration.
- **FR-005**: The `docs/` folder MUST exist and contain an `index.md` file introducing the project.
- **FR-006**: The React application footer MUST include a link button navigating to the documentation route.

### Key Entities

- **PaginationState**: Tracks the active page index (`currentPage`).
- **MkDocsConfig**: The configuration structure defining site name, nav structure, and theme.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The swiper MUST allow continuous swiping past 50+ cards without running out of items (as long as RAWG catalog has items).
- **SC-002**: The "Reset Filters" operation must resolve and render page 1 in less than 2 seconds.

## Assumptions

- The MkDocs site will be deployed alongside the React app as static files.
- The base path of the documentation is relative to the application's root directory.
