const BASE_URL = 'https://api.rawg.io/api';

// Retrieve RAWG API key from Vite environment
const getApiKey = () => {
  const key = import.meta.env.VITE_RAWG_API_KEY;
  if (!key) {
    console.warn('VITE_RAWG_API_KEY is not defined. Please add it to your .env file.');
  }
  return key;
};

/**
 * Normalizes raw game data from RAWG API to clean application entity format.
 */
export function normalizeGame(raw) {
  return {
    id: raw.id,
    name: raw.name || 'Untitled Game',
    slug: raw.slug || '',
    backgroundImage: raw.background_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop', // Fallback premium tech image
    rating: typeof raw.rating === 'number' ? Number(raw.rating.toFixed(1)) : 0.0,
    released: raw.released || 'Unknown',
    genres: Array.isArray(raw.genres) ? raw.genres.map(g => g.name) : [],
    platforms: Array.isArray(raw.platforms) ? raw.platforms.map(p => p.platform?.name).filter(Boolean) : [],
    shortDescription: raw.description_raw 
      ? raw.description_raw.slice(0, 160) + '...'
      : 'Slide or vote this game to see more. Explore recommendations built around your custom filters.'
  };
}

/**
 * Fetch a list of games from RAWG API.
 * Supports filters like page, genres, platforms, and tags.
 */
export async function fetchGames({ page = 1, genres = '', platforms = '', tags = '', pageSize = 20 } = {}) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API Key missing. Setup VITE_RAWG_API_KEY in your .env file.');

  const params = new URLSearchParams({
    key: apiKey,
    page: String(page),
    page_size: String(pageSize),
  });

  if (genres) params.append('genres', genres);
  if (platforms) params.append('platforms', platforms);
  if (tags) params.append('tags', tags);

  const response = await fetch(`${BASE_URL}/games?${params.toString()}`);
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to fetch games from RAWG API: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return (data.results || []).map(normalizeGame);
}

/**
 * Fetch detailed information for a single game.
 */
export async function fetchGameDetails(id) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API Key missing.');

  const response = await fetch(`${BASE_URL}/games/${id}?key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch game details for ID ${id}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Simulates finding similar games by querying games with intersecting genres and tags of a seed game.
 * Uses RAWG Free-tier friendly parameter intersection search.
 */
export async function fetchSimilarGames(seedGameId) {
  // 1. Get seed details
  const seedDetails = await fetchGameDetails(seedGameId);

  // 2. Extract genre and tag slugs/ids
  const genreSlugs = (seedDetails.genres || []).slice(0, 2).map(g => g.slug).join(',');
  const tagSlugs = (seedDetails.tags || []).slice(0, 3).map(t => t.slug).join(',');

  // 3. Query list of games with matching tags and genres
  const apiKey = getApiKey();
  const params = new URLSearchParams({
    key: apiKey,
    page: '1',
    page_size: '20',
  });

  if (genreSlugs) params.append('genres', genreSlugs);
  if (tagSlugs) params.append('tags', tagSlugs);

  const response = await fetch(`${BASE_URL}/games?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch similar games for seed ID ${seedGameId}`);
  }

  const data = await response.json();
  // Filter out the seed game itself from suggestions
  const filtered = (data.results || []).filter(g => g.id !== seedGameId);
  return filtered.map(normalizeGame);
}

/**
 * Fetch all genres from the RAWG API.
 * Returns a list of normalized genre entities.
 */
export async function fetchGenres() {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API Key missing. Setup VITE_RAWG_API_KEY in your .env file.');

  const response = await fetch(`${BASE_URL}/genres?key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch genres from RAWG API: ${response.status}`);
  }

  const data = await response.json();
  return (data.results || []).map(g => ({
    id: g.id,
    name: g.name,
    slug: g.slug
  }));
}
