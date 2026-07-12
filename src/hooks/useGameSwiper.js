import { useState, useEffect, useRef } from 'react';
import { fetchGames, fetchSimilarGames } from '../services/rawgApi';

export function useGameSwiper() {
  const [queue, setQueue] = useState([]);
  const [likedGames, setLikedGames] = useState(() => {
    try {
      const saved = localStorage.getItem('likedGames');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [dislikedGames, setDislikedGames] = useState(() => {
    try {
      const saved = localStorage.getItem('dislikedGames');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ genres: '', platforms: '', freeToPlay: false });
  const [seedId, setSeedId] = useState(null);

  // Use refs to keep track of values inside async calls to avoid state stale closure issues
  const stateRef = useRef({ queue, page, isLoading, filters, seedId, likedGames, dislikedGames });
  stateRef.current = { queue, page, isLoading, filters, seedId, likedGames, dislikedGames };

  // Persist liked/disliked lists in localStorage
  useEffect(() => {
    localStorage.setItem('likedGames', JSON.stringify(likedGames));
  }, [likedGames]);

  useEffect(() => {
    localStorage.setItem('dislikedGames', JSON.stringify(dislikedGames));
  }, [dislikedGames]);

  /**
   * Load more games from RAWG API and append to queue
   */
  const loadMoreGames = async (resetQueue = false) => {
    const current = stateRef.current;
    if (current.isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const queryPage = resetQueue ? 1 : current.page;
      let newGames = [];

      if (current.seedId) {
        // Query similar games based on seed
        newGames = await fetchSimilarGames(current.seedId);
      } else {
        // Query general list with filters
        // Free-to-play: RAWG tags value is 'free-to-play'
        const tagFilter = current.filters.freeToPlay ? 'free-to-play' : '';
        newGames = await fetchGames({
          page: queryPage,
          genres: current.filters.genres,
          platforms: current.filters.platforms,
          tags: tagFilter
        });
      }

      // Filter out duplicates (already in queue, or previously swiped)
      const swipedIds = new Set([
        ...current.likedGames.map(g => g.id),
        ...current.dislikedGames.map(g => g.id),
        ...(resetQueue ? [] : current.queue.map(g => g.id))
      ]);

      const filteredNewGames = newGames.filter(g => !swipedIds.has(g.id));

      setQueue(prev => (resetQueue ? filteredNewGames : [...prev, ...filteredNewGames]));
      setPage(prev => (resetQueue ? 2 : prev + 1));
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while loading recommendations.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadMoreGames(true);
  }, [filters, seedId]);

  // Load more when queue size drops below threshold
  useEffect(() => {
    if (queue.length > 0 && queue.length < 5 && !isLoading) {
      loadMoreGames(false);
    }
  }, [queue.length, isLoading]);

  /**
   * Remove active card and append to corresponding swipe history list
   * @param {string} direction - 'like' or 'dislike'
   */
  const swipe = (direction) => {
    if (queue.length === 0) return;

    const game = queue[0];
    const rest = queue.slice(1);
    setQueue(rest);

    if (direction === 'like') {
      setLikedGames(prev => [game, ...prev]);
    } else {
      setDislikedGames(prev => [game, ...prev]);
    }
  };

  /**
   * Set filter configuration parameters and reset swiper stack
   */
  const applyFilters = (newFilters) => {
    setSeedId(null); // Clear similarity seed when applying standard filters
    setFilters(newFilters);
  };

  /**
   * Set a specific game as seed for recommendations and reset queue
   */
  const pivotSearch = (gameId) => {
    setFilters({ genres: '', platforms: '', freeToPlay: false }); // Reset standard filters
    setSeedId(gameId);
  };

  /**
   * Reset swipe history
   */
  const clearHistory = () => {
    setLikedGames([]);
    setDislikedGames([]);
    // Reload queue
    loadMoreGames(true);
  };

  return {
    activeCard: queue[0] || null,
    queueSize: queue.length,
    likedGames,
    dislikedGames,
    isLoading,
    error,
    swipe,
    applyFilters,
    pivotSearch,
    clearHistory,
    retryFetch: () => loadMoreGames(true)
  };
}
