# Feature Specification: Dynamic Genre Filter

**Feature Branch**: `002-dynamic-genre-filter`

**Created**: 2026-07-11

**Status**: Ready

**Input**: User description: "Correção no filtro de Gêneros: O menu dropdown de gêneros atualmente possui uma lista estática e incompleta no código. O sistema deve fazer um fetch dinâmico no endpoint '/genres' da API do RAWG quando a aplicação carregar, e popular as opções do dropdown dinamicamente com a lista completa e oficial de gêneros retornada pela API."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dynamic Genre Dropdown loading (Priority: P1)

Users can select from the full list of official game genres dynamically fetched from the RAWG API, ensuring filter accuracy.

**Why this priority**: Corrects the current limitation of hardcoded filters, enabling users to discover games from any genre available in the RAWG database.

**Independent Test**: The app loads, requests genres from the RAWG API, and the genre dropdown displays options populated directly from the API response instead of a hardcoded subset.

**Acceptance Scenarios**:

1. **Given** the application has started, **When** the filters panel loads, **Then** an API request is sent to the `/genres` endpoint.
2. **Given** the `/genres` API request is pending, **When** the user views the genre dropdown, **Then** the dropdown displays a "Carregando gêneros..." loading text option and is temporarily disabled.
3. **Given** the `/genres` API request succeeds, **When** the user opens the dropdown, **Then** all fetched genre names are displayed as options in their original API sort order, with their values mapped to the genre slugs.
4. **Given** the `/genres` API request fails, **When** the dropdown is rendered, **Then** the dropdown falls back to showing a default static list of core genres (Action, Indie, Adventure, RPG, Shooter, Strategy) so the filter remains usable, logging the failure details in the console.

---

### Edge Cases

- **Slow Network Connection**: The user interacts with the filter panel before the genres have loaded. The dropdown must remain disabled with a "Loading..." placeholder until the data is fully ready.
- **API Failure / Rate Limiting**: If the `/genres` request fails due to network or rate limiting issues, the app must not crash. It must silently fallback to a local static list of primary genres as a safeguard.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST query the RAWG API endpoint `GET /genres` on initial application mount.
- **FR-002**: The system MUST render a loading state indicator inside the select input element while the API request is active.
- **FR-003**: The system MUST populate the `<option>` elements of the select dropdown using the `name` as label and the `slug` as value for each returned genre.
- **FR-004**: The system MUST catch any network/API errors from `/genres` and fall back to a hardcoded list of primary genres to ensure continuous service.

### Key Entities

- **Genre**: Represents a game genre with fields: `id`, `name`, and `slug`.
- **GenreListState**: Holds the loading status, error status, and list of fetched `Genre` objects in state.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The genres select element dropdown options MUST populate within 1.5 seconds of application start (assuming standard network latency).
- **SC-002**: The dynamic fetch operation MUST NOT block the initial loading of recommendation cards (cards and genres fetch in parallel).

## Assumptions

- The RAWG API key is configured and valid.
- The `/genres` API format conforms to standard RAWG response layouts containing a `results` array with `name` and `slug` attributes.
