import React from 'react';

/**
 * Pulse skeleton loader for card stack.
 */
export function LoadingSkeleton() {
  return (
    <div className="w-full max-w-[400px] h-[520px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-xl flex flex-col items-center justify-center p-8 gap-5 animate-pulse">
      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
      <div className="w-3/4 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      <div className="w-full h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl mt-4" />
      <div className="flex gap-4 w-full mt-4">
        <div className="flex-1 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="flex-1 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * Graceful error feedback fallback component.
 */
export function ErrorState({ error, onRetry }) {
  return (
    <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 border border-red-200/40 dark:border-red-950/40 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center gap-4">
      <div className="w-14 h-14 bg-red-100 dark:bg-red-950/40 text-red-500 rounded-full flex items-center justify-center font-bold text-xl">
        ⚠️
      </div>
      <h3 className="text-lg font-bold text-red-600 dark:text-red-400">Falha ao buscar dados</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {error?.includes('VITE_RAWG_API_KEY') 
          ? 'Por favor, insira sua VITE_RAWG_API_KEY no arquivo .env para acessar a API do RAWG.' 
          : error || 'Erro de rede desconhecido ao carregar recomendações.'}
      </p>
      <button
        onClick={onRetry}
        className="mt-3 px-6 py-3 bg-slate-950 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-all focus-ring active:scale-[0.98]"
      >
        Tentar Novamente
      </button>
    </div>
  );
}

/**
 * End of queue deck placeholder.
 */
export function EmptyState({ onReset }) {
  return (
    <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center gap-4">
      <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full flex items-center justify-center font-bold text-lg">
        🏁
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Fim da fila!</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Não restam mais recomendações para o filtro ativo. Mude os filtros ou clique abaixo para recomeçar.
      </p>
      <button
        onClick={onReset}
        className="mt-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all focus-ring active:scale-[0.98]"
      >
        Resetar Filtros
      </button>
    </div>
  );
}
