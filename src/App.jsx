import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { useGameSwiper } from './hooks/useGameSwiper';
import { useKeyboardSwipe } from './hooks/useKeyboardSwipe';
import GameCard from './components/GameCard';
import SwipeButtons from './components/SwipeButtons';
import FiltersPanel from './components/FiltersPanel';
import { LoadingSkeleton, ErrorState, EmptyState } from './components/FeedbackStates';
import { Sun, Moon, Sparkles, Flame, Star, RefreshCw, Trash2 } from 'lucide-react';

function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const { 
    activeCard, 
    likedGames, 
    dislikedGames, 
    isLoading, 
    error, 
    swipe, 
    applyFilters, 
    resetFilters,
    pivotSearch, 
    clearHistory,
    retryFetch 
  } = useGameSwiper();

  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Keyboard swiping navigation
  useKeyboardSwipe({
    onSwipeLeft: () => handleSwipe('dislike'),
    onSwipeRight: () => handleSwipe('like'),
    disabled: isSwiping || !activeCard
  });

  // Filters State
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');
  const [freeToPlay, setFreeToPlay] = useState(false);

  const handleSwipe = (direction) => {
    if (isSwiping || !activeCard) return;
    setSwipeDirection(direction);
    setIsSwiping(true);

    // Matches the duration of the CSS swipe animation (350ms)
    setTimeout(() => {
      swipe(direction);
      setIsSwiping(false);
      setSwipeDirection(null);
    }, 350);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    applyFilters({ genres: genre, platforms: platform, freeToPlay });
  };

  const handleResetFilters = () => {
    setGenre('');
    setPlatform('');
    setFreeToPlay(false);
    resetFilters();
  };

  const handlePivot = (gameId) => {
    pivotSearch(gameId);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
              <Flame size={22} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                SteamFind <span className="text-xs bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full dark:bg-indigo-500/20">Beta</span>
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Tinder-style Game Discovery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* History Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors focus-ring"
              aria-label="Toggle history drawer"
            >
              <Sparkles size={14} className="text-indigo-500" />
              <span>Matches ({likedGames.length})</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors focus-ring"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Filters Panel - Left Column (lg:col-span-4) */}
        <section className="lg:col-span-4">
          <FiltersPanel
            genre={genre}
            setGenre={setGenre}
            platform={platform}
            setPlatform={setPlatform}
            freeToPlay={freeToPlay}
            setFreeToPlay={setFreeToPlay}
            onSubmit={handleFilterSubmit}
          />
        </section>

        {/* Tinder Stack Container - Middle Column (lg:col-span-8) */}
        <section className="lg:col-span-8 flex flex-col items-center justify-center min-h-[580px]">
          {isLoading && activeCard === null ? (
            <LoadingSkeleton />
          ) : activeCard ? (
            /* Active Swiper Stack */
            <div className="flex flex-col items-center w-full relative">
              {error && (
                <div className="w-full max-w-[400px] mb-4 p-3.5 bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-between text-xs font-semibold shadow-sm">
                  <span className="flex-1 pr-2">Erro ao carregar mais recomendações em segundo plano.</span>
                  <button 
                    onClick={retryFetch} 
                    className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-bold whitespace-nowrap active:scale-[0.98] focus-ring"
                  >
                    Tentar Novamente
                  </button>
                </div>
              )}
              <GameCard 
                game={activeCard} 
                onPivot={handlePivot} 
                isSwiping={isSwiping}
                swipeDirection={swipeDirection}
              />
              <SwipeButtons 
                onSwipeLeft={() => handleSwipe('dislike')} 
                onSwipeRight={() => handleSwipe('like')}
                disabled={isSwiping}
              />
            </div>
          ) : error ? (
            <ErrorState error={error} onRetry={retryFetch} />
          ) : (
            <EmptyState onReset={handleResetFilters} />
          )}
        </section>
      </main>

      {/* Slide-out Match History Drawer */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-slide-in p-6 border-l border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-extrabold flex items-center gap-2">
                  <Sparkles size={20} className="text-indigo-500" />
                  <span>Jogos Favoritados</span>
                </h3>
                <p className="text-xs text-slate-500">Histórico de swipes positivos</p>
              </div>
              <button 
                onClick={() => setShowHistory(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold focus-ring"
              >
                Fechar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {likedGames.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-2 text-slate-400 py-12">
                  <Flame size={32} strokeWidth={1.5} />
                  <p className="text-sm">Nenhum match ainda. Comece a curtir cards para criar sua coleção!</p>
                </div>
              ) : (
                likedGames.map((game, idx) => (
                  <div key={idx} className="flex gap-3 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-16 rounded-xl bg-cover bg-center border border-slate-200/10"
                        style={{ backgroundImage: `url(${game.backgroundImage})` }}
                      />
                      <div>
                        <h4 className="font-bold text-sm line-clamp-1">{game.name}</h4>
                        <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                          <Star size={10} fill="currentColor" /> {game.rating}
                        </span>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{game.genres.slice(0, 2).join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handlePivot(game.id)}
                        title="Recomendar parecidos"
                        className="p-2 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg transition-colors focus-ring"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {likedGames.length > 0 && (
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                <button
                  onClick={clearHistory}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-xl text-sm font-semibold transition-all focus-ring"
                >
                  <Trash2 size={16} />
                  <span>Limpar Histórico</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer link to MkDocs */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50 py-6 px-6 mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 SteamFind. Desenvolvido com React, Vite e Tailwind CSS.</p>
          <a
            href="./docs/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-all focus-ring"
          >
            <span>Documentação</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
