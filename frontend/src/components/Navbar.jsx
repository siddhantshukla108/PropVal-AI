import React, { useState, useEffect } from 'react';
import { Building2, Sparkles, Server, DollarSign, Globe2, Info, Users, CheckCircle2 } from 'lucide-react';
import { checkHealth } from '../api/client';

export default function Navbar({ currency, setCurrency, onOpenInfoModal }) {
  const [engineStatus, setEngineStatus] = useState('checking');

  useEffect(() => {
    let isMounted = true;
    const verifyBackend = async () => {
      const res = await checkHealth();
      if (isMounted) {
        if (res && res.status === 'online') {
          setEngineStatus('online');
        } else {
          setEngineStatus('standby');
        }
      }
    };
    verifyBackend();
    const interval = setInterval(verifyBackend, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Project Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-sky-400 flex items-center justify-center shadow-lg shadow-brand-500/20 text-white font-bold text-xl">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                PropVal <span className="text-brand-400 font-black">AI</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                v2.0 Dual Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              MNNIT Foundation • CSE Mini Project
            </p>
          </div>
        </div>

        {/* Center / Right controls: Currency, Backend Status & Team Info */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Backend Health Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border bg-slate-900/60 border-slate-800">
            {engineStatus === 'online' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-semibold hidden md:inline">AI Engine Online</span>
                <span className="text-emerald-400 font-semibold md:hidden">Online</span>
              </>
            ) : engineStatus === 'checking' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-amber-400 hidden md:inline">Warming Engine...</span>
                <span className="text-amber-400 md:hidden">Warming...</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="text-slate-300 hidden md:inline">Local Active</span>
                <span className="text-slate-300 md:hidden">Active</span>
              </>
            )}
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                currency === 'USD'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="US Dollars ($)"
            >
              USD $
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                currency === 'INR'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Indian Rupees (₹ Lakhs & Crores)"
            >
              INR ₹
            </button>
            <button
              onClick={() => setCurrency('EUR')}
              className={`px-2.5 py-1.5 rounded-lg transition-all hidden sm:block ${
                currency === 'EUR'
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Euro (€)"
            >
              EUR €
            </button>
          </div>

          {/* Presentation & Team Info Button */}
          <button
            onClick={onOpenInfoModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 transition-all hover:border-slate-600"
            title="Project Team & Presentation Guide"
          >
            <Users className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">Project Team</span>
          </button>

        </div>
      </div>
    </header>
  );
}
