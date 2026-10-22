import React from 'react';
import { Building, MapPin, CheckCircle, Compass, Bed, Home, Calendar } from 'lucide-react';

export default function ComparableComps({ comps, currency }) {
  if (!comps || comps.length === 0) return null;

  const formatPrice = (usd, inr) => {
    if (currency === 'INR') {
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
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>Nearby Comparable Transactions ("Comps" Radar)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase font-semibold">
                Ground Truth
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Nearest spatial sales verified from the housing census benchmark dataset
            </p>
          </div>
        </div>
        <span className="text-xs text-slate-500 font-mono hidden sm:inline">KNN Spatial Radius</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {comps.map((comp, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                {comp.distance_km} km away
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Actual Sale
              </span>
            </div>

            <div>
              <div className="text-lg font-black text-slate-100 font-mono">
                {formatPrice(comp.price_usd, comp.price_inr)}
              </div>
              <span className="text-[11px] text-slate-400">
                {comp.ocean_proximity} block
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-1 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Home className="w-3 h-3 text-slate-500" />
                {comp.total_rooms} rooms
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                {comp.housing_median_age} yrs age
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
