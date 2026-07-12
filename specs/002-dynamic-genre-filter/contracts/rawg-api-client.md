# API Client & Normalization Contract: Dynamic Genres

This document specifies the interface contract for consuming the `/genres` endpoint of the RAWG API.

## RAWG API Integration

### Retrieve Genres (`GET /genres`)
Fetches all official genres cataloged in the RAWG database.

#### Request Parameters
- `key` (string, required): API authorization key.

#### Response Structure (JSON Schema)
```json
{
  "count": "number",
  "next": "string | null",
  "previous": "string | null",
  "results": [
    {
      "id": "number",
      "name": "string",
      "slug": "string",
      "games_count": "number",
      "image_background": "string"
    }
  ]
}
```

---

## Data Normalization mapping

The API client service layer must return a clean list mapping the response result values.

```javascript
/**
 * Normalizes a raw RAWG API genre item.
 * 
 * @param {object} rawGenre - Raw JSON item
 * @returns {Genre} - Normalized genre object
 */
export function normalizeGenre(rawGenre) {
  return {
    id: rawGenre.id,
    name: rawGenre.name,
    slug: rawGenre.slug
  };
}
```
