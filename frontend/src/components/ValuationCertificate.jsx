import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, Building, Calendar, MapPin, Award } from 'lucide-react';

export default function ValuationCertificate({ isOpen, onClose, valuation, formData }) {
  if (!isOpen || !valuation) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateId = `MNNIT-VAL-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100 print:bg-white print:text-black print:border-none print:shadow-none print:m-0 print:p-4">
        
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Header with MNNIT Branding */}
        <div className="border-b-2 border-brand-500/40 pb-4 text-center space-y-1 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-[11px] font-bold uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" />
            Official Valuation Certificate
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white print:text-black uppercase">
            MNNIT Innovation & Incubation Hub
          </h2>
          <p className="text-xs text-slate-400 print:text-gray-600">
            Center for Machine Learning & Spatial Intelligence • CSE Department (2026)
          </p>
        </div>

        {/* Certificate Metadata Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-800/40 print:bg-gray-100 p-3 rounded-xl border border-slate-700/60 print:border-gray-300 font-mono">
          <div>
            <span className="block text-[10px] text-slate-400 print:text-gray-500 uppercase">Appraisal ID</span>
            <span className="font-bold text-brand-300 print:text-blue-800">{certificateId}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 print:text-gray-500 uppercase">Issue Date</span>
            <span className="font-semibold">{currentDate}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 print:text-gray-500 uppercase">Model Pipeline</span>
            <span className="font-semibold text-emerald-400 print:text-emerald-700">XGBoost Regressor</span>
          </div>
        </div>

        {/* Core Valuation Big Box */}
        <div className="text-center p-5 rounded-2xl bg-gradient-to-b from-brand-950/40 to-slate-800/40 print:bg-blue-50 border border-brand-500/30 print:border-blue-300 space-y-1">
          <span className="text-xs uppercase tracking-widest text-slate-400 print:text-gray-600 font-semibold">
            Certified Fair Market Value
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white print:text-black font-mono">
            ${valuation.price_usd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="text-sm font-bold text-brand-300 print:text-blue-700">
            ₹{(valuation.price_inr).toLocaleString('en-IN', { maximumFractionDigits: 0 })} INR
          </div>
          <div className="text-[11px] text-emerald-400 print:text-green-700 font-semibold pt-1">
            ✓ Statistical Confidence Score: {valuation.confidence_score}%
          </div>
        </div>

        {/* Property Specs Breakdown Table */}
        <div className="space-y-1.5 text-xs">
          <span className="font-bold text-slate-300 print:text-gray-800 uppercase tracking-wider text-[11px]">
            Appraised Property Characteristics
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono">
            <div className="p-2.5 rounded-lg bg-slate-800/60 print:bg-gray-100">
              <span className="block text-[10px] text-slate-400 print:text-gray-500">Coordinates</span>
              <span className="font-semibold text-[11px]">{formData.latitude.toFixed(2)}°N, {formData.longitude.toFixed(2)}°W</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/60 print:bg-gray-100">
              <span className="block text-[10px] text-slate-400 print:text-gray-500">Proximity</span>
              <span className="font-semibold text-[11px]">{formData.ocean_proximity}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/60 print:bg-gray-100">
              <span className="block text-[10px] text-slate-400 print:text-gray-500">Total Rooms</span>
              <span className="font-semibold text-[11px]">{formData.total_rooms}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/60 print:bg-gray-100">
              <span className="block text-[10px] text-slate-400 print:text-gray-500">Property Age</span>
              <span className="font-semibold text-[11px]">{formData.housing_median_age} Yrs</span>
            </div>
          </div>
        </div>

        {/* Official Signatures & Verification */}
        <div className="border-t border-slate-800 print:border-gray-300 pt-4 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">Faculty Guide</span>
            <span className="font-bold text-slate-200 print:text-black">Mr. Subhash Chaganti</span>
            <span className="block text-[10px] text-slate-400 print:text-gray-600">Innovation & Incubation Hub, MNNIT</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">Team Lead</span>
            <span className="font-bold text-slate-200 print:text-black">Shubham Mishra</span>
            <span className="block text-[10px] text-slate-400 print:text-gray-600">CSE Department (2026)</span>
          </div>
        </div>

        {/* Print & Action Buttons (Hidden on Print) */}
        <div className="flex gap-3 pt-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
