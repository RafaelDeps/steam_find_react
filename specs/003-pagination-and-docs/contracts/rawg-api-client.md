# API Client & Normalization Contract: Pagination

This document outlines the pagination request mapping.

## RAWG API Integration

### Consuming Page Indexes (`GET /games`)
To request subsequent pages of recommendations, the system appends the `page` query parameter.

#### Request Parameters
- `key` (string, required): API authorization key.
- `page` (number, optional): Page index to query. Defaults to `1`.
- `page_size` (number, optional): Defaults to `20`.

#### Mapping Function
```javascript
// Request url generation inside rawgApi.js
const params = new URLSearchParams({
  key: apiKey,
  page: String(currentPage), // Must stringify the numerical state page
  page_size: String(pageSize),
});
```
