import React from 'react';
import { TrendingUp, Key, Percent, Award, ShieldAlert, LineChart } from 'lucide-react';

export default function InvestmentRadar({ investment, currency }) {
  if (!investment) return null;

  const formatCurrency = (usdVal, inrVal) => {
    if (currency === 'INR') {
      if (inrVal >= 10000000) return `₹${(inrVal / 10000000).toFixed(2)} Cr`;
      if (inrVal >= 100000) return `₹${(inrVal / 100000).toFixed(2)} Lakhs`;
      return `₹${inrVal.toLocaleString('en-IN')}`;
    }
    return `$${usdVal.toLocaleString()}`;
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>Investment & Rental Yield Radar</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-semibold">
                ROI Forecast
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Cash flow yields and 5-year capital appreciation projections
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            {investment.investment_grade}
          </span>
        </div>
      </div>

      {/* Grid of Key Financial Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* Metric 1: Monthly Rent */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Key className="w-3.5 h-3.5 text-brand-400" />
            <span>Monthly Rental</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-100 font-mono">
            {formatCurrency(investment.monthly_rent_usd, investment.monthly_rent_inr)}
          </div>
          <span className="text-[10px] text-slate-500 block">Estimated cash flow</span>
        </div>

        {/* Metric 2: Gross Yield */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Percent className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gross Rental Yield</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
            {investment.gross_rental_yield_pct}% / yr
          </div>
          <span className="text-[10px] text-slate-500 block">Annual return rate</span>
        </div>

        {/* Metric 3: 5-Year Projected Value */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <LineChart className="w-3.5 h-3.5 text-sky-400" />
            <span>5-Yr Projected Value</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-sky-300 font-mono">
            {formatCurrency(investment.five_year_value_usd, investment.five_year_value_inr)}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block">
            +{investment.five_year_gain_pct}% Appreciation
          </span>
        </div>

        {/* Metric 4: Investment Score */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Investment Rating</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-amber-400 font-mono">
            ⭐ {investment.investment_score} / 10
          </div>
          <span className="text-[10px] text-slate-500 block">Commercial Viability</span>
        </div>

      </div>

    </div>
  );
}
