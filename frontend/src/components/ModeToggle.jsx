import React from 'react';
import { MapPin, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function ModeToggle({ activeMode, setActiveMode }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 bg-slate-900/80 rounded-2xl border border-slate-800">
      <div className="flex items-center gap-2 px-3 py-1 text-xs text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-brand-400" />
        <span>Select Valuation Input Method:</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
        <button
          onClick={() => setActiveMode('map')}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeMode === 'map'
              ? 'bg-gradient-to-r from-brand-600 to-sky-500 text-white shadow-lg shadow-brand-500/25 border border-brand-400/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Interactive Map Mode</span>
        </button>

        <button
          onClick={() => setActiveMode('manual')}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeMode === 'manual'
              ? 'bg-gradient-to-r from-brand-600 to-sky-500 text-white shadow-lg shadow-brand-500/25 border border-brand-400/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Quick Manual Form (5 Fields)</span>
        </button>
      </div>
    </div>
  );
}
