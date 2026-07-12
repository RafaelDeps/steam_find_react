import { useEffect } from 'react';

/**
 * Custom hook to map global ArrowLeft and ArrowRight keys to swipe actions.
 * Ignores keystrokes if the user has focus on input/select form components.
 */
export function useKeyboardSwipe({ onSwipeLeft, onSwipeRight, disabled }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return;

      // Disable swiping if focusing on inputs, textareas, or select dropdowns
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'SELECT' || activeTag === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onSwipeLeft();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onSwipeRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSwipeLeft, onSwipeRight, disabled]);
}
