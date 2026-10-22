import React from 'react';
import { DEFAULT_PRESETS } from '../data/presets';
import { Zap, MapPin } from 'lucide-react';

export default function PresetSelector({ onSelectPreset, activePresetId }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>1-Click Showcase Demos (Quick Viva Test Scenarios)</span>
        </div>
        <span className="text-[11px] text-slate-500 hidden sm:inline">Click to instantly populate & value</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {DEFAULT_PRESETS.map((p) => {
          const isSelected = activePresetId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPreset(p)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-brand-500/15 border-brand-400 shadow-lg shadow-brand-500/20'
                  : 'bg-slate-900/80 border-slate-800/90 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-brand-300 border border-slate-700/60">
                  {p.badge}
                </span>
                <span className="text-xs">
                  {p.country === 'India' ? '🇮🇳' : (p.country === 'United Kingdom' ? '🇬🇧' : '🇺🇸')}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-100 group-hover:text-brand-300 transition-colors truncate">
                {p.title}
              </h4>

              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 truncate">
                <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                <span>{p.city}</span>
              </p>

              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>{p.bhk_tag}</span>
                <span className="font-mono text-slate-400">${(p.median_income * 10).toFixed(0)}k inc</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
