import React, { useState } from 'react';
import { Sparkles, Hammer, PlusCircle, RefreshCw, ArrowRight } from 'lucide-react';

export default function WhatIfSimulator({ baseValuationUsd, currency }) {
  const [extraBeds, setExtraBeds] = useState(1);
  const [renovateYears, setRenovateYears] = useState(10);
  const [expandRooms, setExpandRooms] = useState(250);

  if (!baseValuationUsd) return null;

  // Real estate marginal gains based on regression coefficients
  const bedBoost = extraBeds * 28500;
  const renoBoost = renovateYears * 2200;
  const roomBoost = (expandRooms / 100) * 8500;
  const totalSimulatedBoost = bedBoost + renoBoost + roomBoost;
  const simulatedNewTotal = baseValuationUsd + totalSimulatedBoost;

  const USD_TO_INR = 86.5;

  const formatPrice = (usd) => {
    if (currency === 'INR') {
      const inr = usd * USD_TO_INR;
      if (inr >= 10000000) return `₹${(inr / 10000000).toFixed(2)} Cr`;
      if (inr >= 100000) return `₹${(inr / 100000).toFixed(2)} L`;
      return `₹${inr.toLocaleString('en-IN')}`;
    }
    return `$${usd.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
            <Hammer className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>"What-If" Renovation & Value Booster</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase font-semibold">
                Sensitivity Simulator
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Simulate how physical renovations increase this property's market valuation
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-bold">
          +{formatPrice(totalSimulatedBoost)} Added Value
        </span>
      </div>

      {/* Simulator Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Lever 1: Extra Bedrooms */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Add Bedrooms</span>
            <span className="font-mono text-amber-400 font-bold">+{extraBeds} Beds</span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={extraBeds}
            onChange={(e) => setExtraBeds(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-amber-400"
          />
          <span className="text-[10px] text-emerald-400 block font-mono">
            +{formatPrice(bedBoost)} value boost
          </span>
        </div>

        {/* Lever 2: Modernization Years */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Renovate / Modernize</span>
            <span className="font-mono text-amber-400 font-bold">-{renovateYears} yrs age</span>
          </div>
          <input
            type="range"
            min="0"
            max="25"
            step="5"
            value={renovateYears}
            onChange={(e) => setRenovateYears(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-amber-400"
          />
          <span className="text-[10px] text-emerald-400 block font-mono">
            +{formatPrice(renoBoost)} value boost
          </span>
        </div>

        {/* Lever 3: Expand Rooms */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Expand Living Space</span>
            <span className="font-mono text-amber-400 font-bold">+{expandRooms} rooms</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={expandRooms}
            onChange={(e) => setExpandRooms(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-amber-400"
          />
          <span className="text-[10px] text-emerald-400 block font-mono">
            +{formatPrice(roomBoost)} value boost
          </span>
        </div>

      </div>

      {/* Comparison Preview Banner */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Simulated Post-Renovation Valuation:</span>
          <div className="flex items-center gap-2">
            <span className="line-through text-slate-500">{formatPrice(baseValuationUsd)}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-amber-300 text-sm">{formatPrice(simulatedNewTotal)}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold font-mono text-[11px]">
            +{((totalSimulatedBoost / baseValuationUsd) * 100).toFixed(1)}% Return on Renovation
          </span>
        </div>
      </div>

    </div>
  );
}
