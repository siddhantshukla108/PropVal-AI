import React from 'react';
import { X, Award, Users, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function ProjectInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Project & Viva Overview
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            House Price Prediction System
          </h2>
          <p className="text-xs text-slate-400">
            Summer Internship, Innovation & Incubation Hub, MNNIT Foundation • CSE (2026)
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-400" />
            Project Team Members & Roles
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { name: "Shubham Mishra", id: "2300100100408", role: "Team Leader" },
              { name: "Sudhanshu P. Singh", id: "2300100100424", role: "ML Engineer" },
              { name: "Suyash Srivastav", id: "2300100100434", role: "Data Analyst" },
              { name: "Siddhant Shukla", id: "2300100100411", role: "Full-Stack Dev" },
            ].map((member, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs space-y-0.5">
                <span className="font-bold text-slate-100 block truncate">{member.name}</span>
                <span className="text-[10px] text-slate-400 font-mono block">[{member.id}]</span>
                <span className="text-[10px] text-brand-400 font-semibold block">{member.role}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 pt-1">
            <strong>Project Guide:</strong> Mr. Subhash Chaganti (Innovation & Incubation Hub, MNNIT Foundation)
          </p>
        </div>

        {/* 10-Minute Viva Secret Script */}
        <div className="p-4 rounded-2xl bg-brand-950/30 border border-brand-500/30 space-y-2 text-xs">
          <h4 className="font-bold text-brand-300 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-brand-400" />
            10-Minute Viva Pitch (What to tell the Judges)
          </h4>
          <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
            <li>
              <strong>Architecture:</strong> Industry-standard decoupled microservice (React 19 SPA on Vercel + Python Flask API on Render).
            </li>
            <li>
              <strong>ML Benchmark:</strong> Tested Linear Regression ($R^2=0.625$), Random Forest ($R^2=0.817$), and selected <strong>XGBoost ($R^2=0.821$)</strong> for production.
            </li>
            <li>
              <strong>Dual Spatial Engine:</strong> High-precision census pipeline for California paired with real-time web geocoding and purchasing power parity (PPP) synthesis for global cities.
            </li>
            <li>
              <strong>Explainable AI (XAI):</strong> Transparent waterfall breakdown proving model decisions are driven by economic indicators ($r=0.69$ income correlation).
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
        >
          Close Project Overview
        </button>

      </div>
    </div>
  );
}
