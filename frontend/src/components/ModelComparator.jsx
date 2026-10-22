import React from 'react';
import { Cpu, CheckCircle2, BarChart2 } from 'lucide-react';

export default function ModelComparator({ activeModelId, onSelectModel }) {
  const models = [
    {
      id: "xgboost",
      name: "XGBoost Regressor",
      tag: "Best Performer",
      r2: 0.821,
      rmse: 48496,
      mae: 32453,
      advantage: "Highest R² score and lowest RMSE on held-out test data.",
      isBest: true
    },
    {
      id: "random_forest",
      name: "Random Forest Regressor",
      tag: "Lowest MAE",
      r2: 0.817,
      rmse: 48942,
      mae: 31628,
      advantage: "Ensemble of 100 decision trees; robust against outliers.",
      isBest: false
    },
    {
      id: "linear",
      name: "Linear Regression Baseline",
      tag: "Baseline Baseline",
      r2: 0.625,
      rmse: 70059,
      mae: 50670,
      advantage: "Ordinary Least Squares baseline demonstrating non-linear gains.",
      isBest: false
    }
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>Multi-Model Evaluation Benchmark</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase font-semibold">
                Test Set Metrics
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Evaluated on held-out 20% test dataset (4,128 properties)
            </p>
          </div>
        </div>
        <span className="text-xs text-slate-500 font-mono hidden sm:inline">Presentation Slide 10</span>
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {models.map((m) => {
          const isSelected = activeModelId === m.id;
          return (
            <div
              key={m.id}
              onClick={() => onSelectModel(m.id)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all space-y-3 relative overflow-hidden ${
                isSelected
                  ? 'bg-purple-950/20 border-purple-400/80 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    m.isBest
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {m.tag}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-100">{m.name}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{m.advantage}</p>
              </div>

              {/* R2 score bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">R² Score:</span>
                  <span className="font-bold text-slate-200">{(m.r2 * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      m.isBest ? 'bg-gradient-to-r from-brand-500 to-emerald-400' : 'bg-slate-500'
                    }`}
                    style={{ width: `${m.r2 * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Metrics table */}
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400">
                <div>
                  <span className="block text-slate-500">RMSE</span>
                  <span className="text-slate-200 font-semibold">${m.rmse.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="block text-slate-500">MAE</span>
                  <span className="text-slate-200 font-semibold">${m.mae.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
