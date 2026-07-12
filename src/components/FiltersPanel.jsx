import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { fetchGenres } from '../services/rawgApi';

const STATIC_FALLBACK_GENRES = [
  { name: 'Ação', slug: 'action' },
  { name: 'Indie', slug: 'indie' },
  { name: 'Aventura', slug: 'adventure' },
  { name: 'RPG (Role-Playing)', slug: 'role-playing-games-rpg' },
  { name: 'Tiro (Shooter)', slug: 'shooter' },
  { name: 'Estratégia', slug: 'strategy' },
  { name: 'Esportes', slug: 'sports' },
  { name: 'Simulação', slug: 'simulation' }
];

export default function FiltersPanel({ 
  genre, 
  setGenre, 
  platform, 
  setPlatform, 
  freeToPlay, 
  setFreeToPlay, 
  onSubmit 
}) {
  const [genresList, setGenresList] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadGenres() {
      try {
        const data = await fetchGenres();
        if (isMounted) {
          setGenresList(data);
          setLoadingGenres(false);
        }
      } catch (err) {
        console.error('Error fetching RAWG genres, using fallback list:', err);
        if (isMounted) {
          setGenresList(STATIC_FALLBACK_GENRES);
          setLoadingGenres(false);
        }
      }
    }

    loadGenres();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 rounded-3xl shadow-sm">
      <h2 className="text-lg font-extrabold mb-5 flex items-center gap-2 text-slate-850 dark:text-slate-100">
        <SlidersHorizontal size={18} className="text-indigo-500" />
        <span>Filtros de Busca</span>
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Genre Selector */}
        <div>
          <label 
            htmlFor="genre-select" 
            className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wider"
          >
            Gênero
          </label>
          <select
            id="genre-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            disabled={loadingGenres}
            className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus-ring font-medium transition-all disabled:opacity-60"
          >
            {loadingGenres ? (
              <option value="">Carregando gêneros...</option>
            ) : (
              <>
                <option value="">Todos</option>
                {genresList.map((g) => (
                  <option key={g.id || g.slug} value={g.slug}>
                    {g.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* Platform Selector */}
        <div>
          <label 
            htmlFor="platform-select" 
            className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wider"
          >
            Plataforma
          </label>
          <select
            id="platform-select"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus-ring font-medium transition-all"
          >
            <option value="">Todas</option>
            <option value="4">PC (Windows)</option>
            <option value="187">PlayStation 5</option>
            <option value="186">Xbox Series S/X</option>
            <option value="7">Nintendo Switch</option>
            <option value="1">PlayStation 4</option>
          </select>
        </div>

        {/* Free to Play Checkbox */}
        <div className="flex items-center justify-between py-3.5 border-t border-b border-slate-100 dark:border-slate-850">
          <label 
            htmlFor="free-to-play-checkbox" 
            className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider cursor-pointer select-none"
          >
            Apenas Free-to-Play
          </label>
          <input
            id="free-to-play-checkbox"
            type="checkbox"
            checked={freeToPlay}
            onChange={(e) => setFreeToPlay(e.target.checked)}
            className="w-5 h-5 rounded-lg border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all focus-ring"
          />
        </div>

        {/* Submit Filter Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 transition-all focus-ring active:scale-[0.98]"
        >
          Aplicar Filtros
        </button>
      </form>
    </div>
  );
}
