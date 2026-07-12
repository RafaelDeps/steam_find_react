# Quickstart & Validation Guide: Game Recommendation Tinder SPA

This guide outlines the environment setup and end-to-end scenarios to validate the implementation of the game recommendation SPA.

## Setup & Execution

### Prerequisites
- Node.js (v18+)
- A valid RAWG API key (register at [rawg.io/apikeys](https://rawg.io/apikeys))

### 1. Environment Configuration
Copy the sample environment file to your active development settings:
```bash
cp .env.example .env
```
Open the newly created `.env` file and insert your API key:
```ini
VITE_RAWG_API_KEY=your_actual_rawg_api_key_here
```

### 2. Dependency Installation
Install project dependencies from the repository root:
```bash
npm install
```

### 3. Running the Development Server
Start Vite's development dev-server:
```bash
npm run dev
```
Open your browser and navigate to the local hosting address (typically `http://localhost:5173`).

---

## Interactive Validation Scenarios

Follow these scenarios step-by-step to verify that the implementation matches the [Feature Specification](file:///home/rafael/steam_find_react/specs/001-game-recommendation-tinder/spec.md) and [API contracts](file:///home/rafael/steam_find_react/specs/001-game-recommendation-tinder/contracts/rawg-api-client.md).

### Scenario 1: Tinder-Style Card Swiping
1. Load the application in your browser.
2. Confirm that a central card renders displaying a game title, cover image, rating, genres, and a short description.
3. Click the **"Like"** button. The current game card must disappear immediately and be replaced by the next game in the queue.
4. Click the **"Dislike"** button. The card must transit instantly to the next game.

### Scenario 2: Keyboard Navigation & Focus Accessibility
1. Focus your mouse away from any interactive buttons.
2. Press the **Right Arrow Key** on your keyboard. Confirm that the card swiping animation triggers a "Like" action and displays a new card.
3. Press the **Left Arrow Key** on your keyboard. Confirm that a "Dislike" action is triggered instantly.
4. Use the **Tab key** on your keyboard to navigate the UI. Focus outlines must clearly enclose all button and select controls.

### Scenario 3: Filtering the Recommendation Stack
1. Locate the filter panel.
2. Select a specific platform (e.g., "PlayStation 5") and genre (e.g., "Shooter").
3. Click Like/Dislike. Confirm that the upcoming game cards display correct platforms and genre labels matching the selections.
4. Toggle the **"Free-to-Play"** checkbox. Swiped cards should filter to only show free-to-play games.

### Scenario 4: Similarity Search Pivot
1. Locate the active game card (e.g., "Portal 2").
2. Click the button on the card labeled **"Restart search using this game as base"**.
3. Verify that the recommendation queue resets and begins loading games related to the seed game (similar tags/genres).

### Scenario 5: Responsive Theme Control (Dark/Light)
1. Locate the dark/light toggle icon button (typically header top-right).
2. Click the button. The application background must switch cleanly between light themes and dark themes without visual artifacts or reloading.
