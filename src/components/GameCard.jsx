import React from 'react';
import { Star, Calendar, Gamepad2, RefreshCw } from 'lucide-react';
import './GameCard.css';

export default function GameCard({ game, onPivot, isSwiping, swipeDirection }) {
  if (!game) return null;

  // CSS animation classes based on swipe state
  const animationClass = isSwiping
    ? swipeDirection === 'like'
      ? 'animate-swipe-right'
      : 'animate-swipe-left'
    : '';

  return (
    <div className={`game-card-container ${animationClass}`}>
      {/* Game Card */}
      <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-slate-200/30 dark:border-slate-800/30 shadow-2xl bg-slate-900 transition-all duration-300 transform hover:scale-[1.01]">
        
        {/* Cover Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${game.backgroundImage})` }}
        />
        
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          {/* Rating */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-full text-amber-400 font-bold border border-amber-400/20 text-sm shadow-lg">
            <Star size={16} fill="currentColor" />
            <span>{game.rating}</span>
          </div>

          {/* Release Date */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-full text-slate-300 font-medium border border-slate-700/20 text-sm shadow-lg">
            <Calendar size={16} />
            <span>{game.released.split('-')[0]}</span>
          </div>
        </div>

        {/* Card Content (Glassmorphism Bottom Panel) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/95 to-slate-950/10 backdrop-blur-[2px] text-white flex flex-col gap-4">
          
          {/* Title & Platforms */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight mb-2 drop-shadow-md leading-tight">
              {game.name}
            </h2>
            <div className="flex flex-wrap gap-1.5 text-xs text-indigo-300 font-semibold uppercase tracking-wide">
              {game.platforms.slice(0, 3).map((p, idx) => (
                <span key={idx} className="flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  <Gamepad2 size={10} />
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed drop-shadow-sm font-light">
            {game.shortDescription}
          </p>

          {/* Genres List */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/40">
            {game.genres.slice(0, 3).map((genre, idx) => (
              <span 
                key={idx} 
                className="text-xs bg-slate-800/60 dark:bg-slate-800/80 px-2.5 py-1 rounded-full text-slate-300 font-medium border border-slate-700/20"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Pivot Action Button */}
          <button
            onClick={() => onPivot(game.id)}
            className="flex items-center justify-center gap-2 mt-2 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-[0.98] focus-ring"
            title="Restart search using this game as base"
            aria-label={`Restart search using ${game.name} as base`}
          >
            <RefreshCw size={14} className="animate-spin-slow" />
            <span>Recomeçar Busca</span>
          </button>
        </div>
      </div>
    </div>
  );
}
