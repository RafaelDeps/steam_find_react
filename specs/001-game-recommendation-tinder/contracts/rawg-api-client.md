# API Client & Normalization Contract

This document specifies the contract for communicating with the external RAWG API and the mapping function used to normalize raw external JSON responses into our clean, internal application types.

## RAWG API Integration

### Base URL & Authentication
- **Base URL**: `https://api.rawg.io/api`
- **Query Parameter Auth**: All requests MUST append the RAWG API key to the query parameters: `?key={API_KEY}`

---

## Endpoint Contracts consumed

### 1. Retrieve Games List (`GET /games`)
Fetches games with pagination, genre/platform filters, and tagging filters.

#### Request Parameters
- `key` (string, required): API authorization key.
- `page` (number, optional): Page index to query (defaults to `1`).
- `page_size` (number, optional): Number of results to return (defaults to `20`).
- `genres` (string, optional): Comma-separated list of genre slugs (e.g., `action,indie`).
- `platforms` (string, optional): Comma-separated list of platform IDs (e.g., `4,187`).
- `tags` (string, optional): Tag slugs filter. Free-to-play filter uses `free-to-play`.

#### Response Structure (Truncated JSON Schema)
```json
{
  "count": "number",
  "results": [
    {
      "id": "number",
      "name": "string",
      "slug": "string",
      "released": "string",
      "background_image": "string",
      "rating": "number",
      "genres": [
        { "name": "string" }
      ],
      "platforms": [
        { "platform": { "name": "string" } }
      ]
    }
  ]
}
```

---

### 2. Retrieve Game Detail (`GET /games/{id}`)
Used when pivoting search to fetch the seed game's tag list, ensuring we can search by shared tags.

#### Request Parameters
- `key` (string, required): API authorization key.

#### Response Structure (Truncated JSON Schema)
```json
{
  "id": "number",
  "name": "string",
  "description_raw": "string",
  "genres": [
    { "id": "number", "slug": "string" }
  ],
  "tags": [
    { "id": "number", "slug": "string" }
  ]
}
```

---

## Data Normalization Contract

To prevent external API changes from breaking UI components, the service layer MUST process the RAWG API response through the following normalization contract before adding entities to the queue:

```javascript
/**
 * Normalizes a raw RAWG API game object into the application-internal GameCard format.
 * 
 * @param {object} rawGame - Raw JSON item from RAWG API response results
 * @returns {GameCard} - Normalized entity
 */
function normalizeGame(rawGame) {
  return {
    id: rawGame.id,
    name: rawGame.name || 'Untitled Game',
    slug: rawGame.slug || '',
    backgroundImage: rawGame.background_image || '/assets/game-placeholder.jpg',
    rating: typeof rawGame.rating === 'number' ? Number(rawGame.rating.toFixed(1)) : 0.0,
    released: rawGame.released || 'Unknown',
    genres: Array.isArray(rawGame.genres) 
      ? rawGame.genres.map(g => g.name) 
      : [],
    platforms: Array.isArray(rawGame.platforms) 
      ? rawGame.platforms.map(p => p.platform?.name).filter(Boolean) 
      : [],
    shortDescription: rawGame.description_raw 
      ? rawGame.description_raw.slice(0, 150) + '...'
      : 'No description available.'
  };
}
```
