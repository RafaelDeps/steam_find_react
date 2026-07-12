# Research Notes: Dynamic Genre Filter

## Technical Decisions & Rationale

### 1. RAWG API Genres Endpoint Consumption
- **Decision**: Add a new API integration method `fetchGenres()` in `src/services/rawgApi.js` targeting the `GET /genres` endpoint.
- **Rationale**: Keeps with our project constitution principle of Separation of Concerns (UI isolated from network operations). The UI components consume normalized array data.
- **Alternatives considered**: Inline fetch calls inside components (rejected as it violates the project constitution).

### 2. Error Fallback Strategy
- **Decision**: Define a static, hardcoded list of primary genres inside the `FiltersPanel` component. If the `fetchGenres` request fails due to network issues or rate limiting, catch the error and fall back to the static list.
- **Rationale**: Ensures the application remains fully functional and degraded gracefully, instead of leaving the genre select empty or crashing the filter.
- **Alternatives considered**: Displaying an error state overlay blocking filters (rejected, too intrusive and ruins user experience).

### 3. Rendering UX / Loading State
- **Decision**: Display a "Carregando gêneros..." option while the network request is pending, disabling the dropdown select until resolution.
- **Rationale**: Prevents users from submitting incomplete queries and visually communicates that background loading is taking place.
