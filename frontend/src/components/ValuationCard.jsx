import React from 'react';
import { DollarSign, Award, TrendingUp, ShieldCheck, FileText, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ValuationCard({ valuation, currency, onOpenCertificate, loading }) {
  
  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  if (!valuation) {
    return (
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 text-center space-y-3">
        <Sparkles className="w-10 h-10 text-brand-400 mx-auto animate-pulse" />
        <h3 className="text-lg font-bold text-slate-200">Awaiting Property Inputs</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Adjust the sliders or click on the map / quick presets above to calculate the AI real estate valuation.
        </p>
      </div>
    );
  }

  // Format Indian Lakhs & Crores if INR
  const formatIndianNumber = (num) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const displayPrimaryPrice = () => {
    if (currency === 'INR') {
      return formatIndianNumber(valuation.price_inr);
    } else if (currency === 'EUR') {
      return `€${valuation.price_eur.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `$${valuation.price_usd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const displaySecondaryPrice = () => {
    if (currency === 'INR') {
      return `$${valuation.price_usd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return formatIndianNumber(valuation.price_inr);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-brand-500/30 shadow-2xl shadow-brand-500/10 space-y-6 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 w-56 h-56 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header status */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Valuation Generated Successfully
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[11px] font-semibold text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
          <span>{valuation.confidence_score}% Confidence</span>
        </div>
      </div>

      {/* Hero Estimated Value */}
      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          AI Fair Market Estimate
        </span>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-sky-100 to-brand-300 bg-clip-text text-transparent">
            {displayPrimaryPrice()}
          </h1>
          <span className="text-sm font-semibold text-slate-400">
            ({displaySecondaryPrice()})
          </span>
        </div>
        <p className="text-xs text-brand-400 font-medium pt-1">
          ⚙️ {valuation.engine_used}
        </p>
      </div>

      {/* Valuation Range (Conservative to Optimistic) */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Valuation Range (±7.5% Spread)</span>
          <span className="font-mono text-slate-300">Market Sensitivity</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2 rounded-lg bg-slate-800/50">
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">Conservative</span>
            <span className="text-xs font-bold text-slate-300">
              {currency === 'INR' ? formatIndianNumber(valuation.price_range.low_inr) : `$${valuation.price_range.low_usd.toLocaleString()}`}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-brand-500/20 border border-brand-500/40">
            <span className="block text-[10px] text-brand-300 uppercase font-semibold">Fair Value</span>
            <span className="text-xs font-bold text-brand-200">
              {displayPrimaryPrice()}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-800/50">
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">Optimistic</span>
            <span className="text-xs font-bold text-slate-300">
              {currency === 'INR' ? formatIndianNumber(valuation.price_range.high_inr) : `$${valuation.price_range.high_usd.toLocaleString()}`}
            </span>
          </div>
        </div>
      </div>

      {/* Property Key Ratios */}
      <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Est. Cost / Room</span>
          <span className="text-xs font-bold text-slate-200 font-mono">
            ${valuation.price_per_room_usd.toLocaleString()}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Rooms / Household</span>
          <span className="text-xs font-bold text-slate-200 font-mono">
            {valuation.rooms_per_household}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Bedrooms / Room</span>
          <span className="text-xs font-bold text-slate-200 font-mono">
            {(valuation.bedrooms_per_room * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Action Button: Download Official Valuation Certificate */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => {
            triggerConfetti();
            onOpenCertificate();
          }}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Download Official Appraisal Certificate</span>
        </button>
      </div>

    </div>
  );
}
