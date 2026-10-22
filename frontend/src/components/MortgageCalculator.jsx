import React, { useState } from 'react';
import { Landmark, PieChart, Percent, Calendar, DollarSign } from 'lucide-react';

export default function MortgageCalculator({ propertyPriceUsd, currency }) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRatePct, setInterestRatePct] = useState(6.5);
  const [loanTenureYears, setLoanTenureYears] = useState(25);

  const price = propertyPriceUsd || 400000;
  const downPaymentUsd = (price * downPaymentPct) / 100.0;
  const loanPrincipalUsd = price - downPaymentUsd;

  // Monthly mortgage calculation: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = (interestRatePct / 100.0) / 12.0;
  const totalMonths = loanTenureYears * 12;
  
  const monthlyPaymentUsd =
    monthlyRate > 0
      ? (loanPrincipalUsd * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanPrincipalUsd / totalMonths;

  const totalPaymentUsd = monthlyPaymentUsd * totalMonths;
  const totalInterestUsd = totalPaymentUsd - loanPrincipalUsd;

  const USD_TO_INR = 86.5;

  const formatPrice = (usd) => {
    if (currency === 'INR') {
      const inr = usd * USD_TO_INR;
      if (inr >= 10000000) return `₹${(inr / 10000000).toFixed(2)} Cr`;
      if (inr >= 100000) return `₹${(inr / 100000).toFixed(2)} L`;
      return `₹${inr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    }
    return `$${usd.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
            <Landmark className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>Mortgage & Financing Planner</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase font-semibold">
                FinTech EMI
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Calculate monthly installment schedules based on estimated fair market valuation
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">Estimated Monthly EMI</span>
          <span className="text-base font-extrabold text-teal-300 font-mono">
            {formatPrice(monthlyPaymentUsd)} / mo
          </span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Down Payment Slider */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Down Payment ({downPaymentPct}%)</span>
            <span className="font-mono text-teal-400 font-bold">{formatPrice(downPaymentUsd)}</span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-teal-400"
          />
        </div>

        {/* Interest Rate */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Interest Rate</span>
            <span className="font-mono text-teal-400 font-bold">{interestRatePct}% p.a.</span>
          </div>
          <input
            type="range"
            min="3.0"
            max="12.0"
            step="0.25"
            value={interestRatePct}
            onChange={(e) => setInterestRatePct(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-teal-400"
          />
        </div>

        {/* Loan Tenure */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Loan Tenure</span>
            <span className="font-mono text-teal-400 font-bold">{loanTenureYears} Years</span>
          </div>
          <input
            type="range"
            min="10"
            max="30"
            step="5"
            value={loanTenureYears}
            onChange={(e) => setLoanTenureYears(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-teal-400"
          />
        </div>

      </div>

      {/* Summary Row */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase">Loan Principal</span>
          <span className="text-slate-200 font-bold">{formatPrice(loanPrincipalUsd)}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block uppercase">Total Interest</span>
          <span className="text-amber-400 font-bold">{formatPrice(totalInterestUsd)}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block uppercase">Total Repayment</span>
          <span className="text-teal-300 font-bold">{formatPrice(totalPaymentUsd)}</span>
        </div>
      </div>

    </div>
  );
}
