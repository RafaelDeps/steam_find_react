# Quickstart & Validation Guide: Pagination & Docs

This guide outlines manual verification scenarios to test pagination increments, filter resets, and documentation integration.

## Setup & Preparation
- Ensure `VITE_RAWG_API_KEY` is configured in your `.env` file.
- Run `npm run dev` to start the development server.

---

## Interactive Validation Scenarios

### Scenario 1: Infinite Swiping Pagination
1. Load the application in your browser.
2. Open your browser's developer tools and navigate to the **Network** tab (filter by `fetch` or `/games`).
3. Observe that the initial request is made to `games?page=1`.
4. Swipe card recommendations (either click Like/Dislike or use keyboard Arrow keys).
5. Once you swipe card number `16` (leaving 4 cards in the queue, which is below the threshold of 5), verify that a new network request is automatically issued to `games?page=2`.
6. Confirm that swiped cards are replaced seamlessly without card stack disruption or flickering.

### Scenario 2: Filter Reset & Page Clearance
1. Swipe a few cards until the network tab registers a request to `games?page=2` or `games?page=3`.
2. Scroll to the "Fim da fila!" screen or keep swiping, then click the **"Resetar Filtros"** button.
3. Inspect the network console. Verify that:
   - The queue list is cleared.
   - A fresh API request is immediately issued to `games?page=1`.
   - The swiping card stack is repopulated starting back from page 1.

### Scenario 3: Documentation File Structure & Link
1. Verify the existence of `mkdocs.yml` in the project root folder.
2. Verify the existence of `docs/index.md` containing project details.
3. Scroll to the bottom footer of the React application.
4. Verify that a link button labeled **"Documentação"** is rendered.
5. Click the button. Confirm that the browser attempts to navigate to the docs target URL.
