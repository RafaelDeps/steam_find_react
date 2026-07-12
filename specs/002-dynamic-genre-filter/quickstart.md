# Quickstart & Validation Guide: Dynamic Genre Filter

This guide outlines manual verification scenarios to test the dynamic genre loading filter.

## Setup & Preparation
- Ensure `VITE_RAWG_API_KEY` is set in your `.env` file.
- Run `npm run dev` to start the development server.

---

## Interactive Validation Scenarios

### Scenario 1: Dynamic Load Verification
1. Load the application in your browser.
2. Locate the **Gênero** select menu dropdown inside the filters panel.
3. Immediately upon rendering, confirm that the select box briefly displays **"Carregando gêneros..."** and is disabled.
4. Within 1.5 seconds, the dropdown must become enabled.
5. Click on the select dropdown. Verify that it displays the complete list of RAWG genres (such as Action, Indie, RPG, Platformer, Arcade, Puzzle, casual, etc. - usually around 19 categories).

### Scenario 2: Swiping with Dynamic Genres
1. Select a newly loaded genre from the dropdown (e.g., "Puzzle" or "Casual" which weren't in the static list).
2. Click **"Aplicar Filtros"**.
3. Confirm that the cards loaded in the recommendation stack display the chosen genre in their tags list.

### Scenario 3: API Error Graceful Fallback
1. Open your browser console or network emulator tab.
2. Simulate a network disconnect, block requests to `api.rawg.io/api/genres`, or rename/delete `VITE_RAWG_API_KEY` in your `.env` file.
3. Reload the application.
4. Verify that the **Gênero** select box does not stay permanently disabled or empty. It must immediately fall back to showing the static primary genres (Action, Indie, Adventure, RPG, Shooter, Strategy, Sports, Simulation).
