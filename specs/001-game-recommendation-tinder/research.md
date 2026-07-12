# Research Notes: Game Recommendation Tinder SPA

## Technical Decisions & Rationale

### 1. Pivoting / Similar Games discovery on Free Tier API
- **Decision**: Query the standard `/api/games` RAWG endpoint filtering by the active seed game's `genres` and `tags`.
- **Rationale**: The dedicated `/api/games/{id}/suggested` endpoint is restricted to RAWG API business/enterprise paid tiers. Simulating recommendations via intersection of genres and tags using query params `genres=<ids>&tags=<ids>` yields high-quality similarity results without paying for the commercial tier.
- **Alternatives considered**: 
  - `/api/games/{id}/game-series`: Restricted to sequels and direct prequels. Too narrow for general recommendations.
  - `/api/games/{id}/additions`: Only returns DLCs and expansions.

### 2. State & Queue Buffer Management for Instant Swiping
- **Decision**: Keep an in-memory React state queue array of 20 `Game` entities. Trigger pre-fetching of the next page of games when the queue drops below 5 elements.
- **Rationale**: Guarantees sub-100ms transition time between swipes (SC-001) as the UI doesn't block on network roundtrips.
- **Alternatives considered**: 
  - On-demand fetching: Fetching the next game only after swiping the current one. Rejected because of network roundtrip delays (500ms+ depending on API latency) which breaks the "instant card transition" UX requirement.

### 3. Keyboard Event Handling & Navigation
- **Decision**: Register a global window event listener (`keydown`) within a custom React hook `useKeyboardSwipe`. Map `ArrowLeft` to Dislike, and `ArrowRight` to Like. Maintain standard `<button>` tags with visible `:focus-visible` rings for form elements.
- **Rationale**: Ensures intuitive keyboard control. Restricting the swiping listener to the document window allows swiping regardless of active focus, while using native buttons preserves default tab navigation access.
- **Alternatives considered**: 
  - Attaching keypress listeners to the card element only. Rejected because it requires the user to click the card first to focus it before keyboard navigation works.

### 4. Styling & Light/Dark Theme Integration
- **Decision**: Implement theme switching using React Context (`ThemeContext`) which toggles a `.dark` class on the root `<html>` element, enabling Tailwind's `dark:` styling modifiers natively.
- **Rationale**: Extremely lightweight, fast to implement, aligns perfectly with Tailwind CSS theme guidelines, and avoids external CSS overrides.
- **Alternatives considered**: 
  - Inline style objects based on React state variables. Rejected as it violates the Tailwind CSS core styling constitution principle.
