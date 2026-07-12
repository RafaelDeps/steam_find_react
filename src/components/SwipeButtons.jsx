import React from 'react';
import { Heart, X } from 'lucide-react';

export default function SwipeButtons({ onSwipeLeft, onSwipeRight, disabled }) {
  return (
    <div className="flex justify-center items-center gap-8 mt-6">
      {/* Dislike / Nope Button */}
      <button
        onClick={onSwipeLeft}
        disabled={disabled}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-95 shadow-lg hover:shadow-red-500/20 hover:scale-105 transition-all duration-200 focus-ring disabled:opacity-40 disabled:scale-100 disabled:pointer-events-none"
        title="Dislike (Seta Esquerda)"
        aria-label="Dislike game"
      >
        <X size={30} strokeWidth={2.5} />
      </button>

      {/* Like / Yeah Button */}
      <button
        onClick={onSwipeRight}
        disabled={disabled}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 active:scale-95 shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-200 focus-ring disabled:opacity-40 disabled:scale-100 disabled:pointer-events-none"
        title="Like (Seta Direita)"
        aria-label="Like game"
      >
        <Heart size={28} fill="currentColor" />
      </button>
    </div>
  );
}
