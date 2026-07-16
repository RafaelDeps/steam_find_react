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
  
  // Declaring 'currentPage' state as required
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ genres: '', platforms: '', freeToPlay: false });
  const [seedId, setSeedId] = useState(null);

  // Keep stateRef in sync to prevent closures from capturing stale values inside async calls
  const stateRef = useRef({ queue, currentPage, isLoading, filters, seedId, likedGames, dislikedGames });
  stateRef.current = { queue, currentPage, isLoading, filters, seedId, likedGames, dislikedGames };

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
      const queryPage = resetQueue ? 1 : current.currentPage;
      let newGames = [];

      if (current.seedId) {
        // Query similar games based on seed
        newGames = await fetchSimilarGames(current.seedId);
      } else {
        // Query general list with filters
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
      setCurrentPage(prev => (resetQueue ? 2 : prev + 1));
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while loading recommendations.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load when filters or seedId changes
  useEffect(() => {
    loadMoreGames(true);
  }, [filters, seedId]);

  // Load more when queue size drops below threshold
  useEffect(() => {
    if (queue.length < 5 && currentPage > 1 && !isLoading && !error && !seedId) {
      loadMoreGames(false);
    }
  }, [queue.length, currentPage, isLoading, error, seedId]);

  /**
   * Remove active card and append to corresponding swipe history list
   */
  const swipe = (direction) => {
    setQueue(prev => {
      if (prev.length === 0) return prev;
      const game = prev[0];

      if (direction === 'like') {
        setLikedGames(history => {
          if (history.some(g => g.id === game.id)) return history;
          return [game, ...history];
        });
      } else {
        setDislikedGames(history => {
          if (history.some(g => g.id === game.id)) return history;
          return [game, ...history];
        });
      }

      return prev.slice(1);
    });
  };

  /**
   * Set filter configuration parameters and reset swiper stack
   */
  const applyFilters = (newFilters) => {
    setSeedId(null);
    setFilters(newFilters);
  };

  /**
   * Reset filters, re-define currentPage to 1, clear queue, and trigger fresh fetch
   */
  const resetFilters = () => {
    setQueue([]);
    setCurrentPage(1);

    const alreadyDefault = filters.genres === '' && filters.platforms === '' && !filters.freeToPlay && seedId === null;
    if (alreadyDefault) {
      loadMoreGames(true);
    } else {
      setSeedId(null);
      setFilters({ genres: '', platforms: '', freeToPlay: false });
    }
  };

  /**
   * Set a specific game as seed for recommendations and reset queue
   */
  const pivotSearch = (gameId) => {
    setFilters({ genres: '', platforms: '', freeToPlay: false });
    setSeedId(gameId);
  };

  /**
   * Reset swipe history
   */
  const clearHistory = () => {
    setLikedGames([]);
    setDislikedGames([]);
    setQueue([]);
    setCurrentPage(1);

    const alreadyDefault = filters.genres === '' && filters.platforms === '' && !filters.freeToPlay && seedId === null;
    if (alreadyDefault) {
      loadMoreGames(true);
    } else {
      setSeedId(null);
      setFilters({ genres: '', platforms: '', freeToPlay: false });
    }
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
    resetFilters,
    pivotSearch,
    clearHistory,
    retryFetch: () => loadMoreGames(false)
  };
}
