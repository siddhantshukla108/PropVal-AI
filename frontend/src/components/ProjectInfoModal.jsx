import React from 'react';
import { X, Award, Users } from 'lucide-react';

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
            Team Overview
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            PropVal AI Engineering Team
          </h2>
          <p className="text-xs text-slate-400">
            Department of Computer Science & Engineering • UCER Prayagraj (2026)
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
              { name: "Shubham Mishra", id: "2300100100408", role: "ML Architecture" },
              { name: "Siddhant Shukla", id: "2300100100411", role: "Full-Stack Dev" },
              { name: "Sudhanshu P. Singh", id: "2300100100424", role: "ML Engineer" },
              { name: "Suyash Srivastav", id: "2300100100434", role: "Data Analyst" },
            ].map((member, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs space-y-0.5">
                <span className="font-bold text-slate-100 block truncate">{member.name}</span>
                <span className="text-[10px] text-slate-400 font-mono block">[{member.id}]</span>
                <span className="text-[10px] text-brand-400 font-semibold block">{member.role}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 pt-1">
            <strong>Project Guide:</strong> Mr. Subhash Chaganti (UCER Prayagraj)
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
        >
          Close Team Overview
        </button>

      </div>
    </div>
  );
}
