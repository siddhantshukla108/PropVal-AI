import React from 'react';
import { MANUAL_REGIONS, MANUAL_CONFIGS, MANUAL_INCOME_TIERS, MANUAL_AGE_TIERS } from '../data/presets';
import { Sparkles, Home, Layers, DollarSign, Clock, Users, Cpu } from 'lucide-react';

export default function ManualInputForm({ formData, setFormData, onTriggerValuation }) {
  
  const handleRegionChange = (regId) => {
    const reg = MANUAL_REGIONS.find(r => r.id === regId);
    if (!reg) return;
    setFormData(prev => ({
      ...prev,
      ocean_proximity: reg.ocean_proximity,
      latitude: reg.lat,
      longitude: reg.lon,
      city: reg.name,
      country: "USA",
      locationName: reg.name
    }));
  };

  const handleConfigChange = (cfgId) => {
    const cfg = MANUAL_CONFIGS.find(c => c.id === cfgId);
    if (!cfg) return;
    setFormData(prev => ({
      ...prev,
      total_rooms: cfg.rooms,
      total_bedrooms: cfg.beds,
      households: cfg.households,
      population: cfg.population
    }));
  };

  const handleIncomeChange = (incId) => {
    const inc = MANUAL_INCOME_TIERS.find(i => i.id === incId);
    if (!inc) return;
    setFormData(prev => ({
      ...prev,
      median_income: inc.value
    }));
  };

  const handleAgeChange = (ageId) => {
    const a = MANUAL_AGE_TIERS.find(ag => ag.id === ageId);
    if (!a) return;
    setFormData(prev => ({
      ...prev,
      housing_median_age: a.age
    }));
  };

  return (
    <div className="space-y-5">
      <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-xs text-brand-300 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
        <span>Direct 5-Field Mode: Select property characteristics below to get an instant valuation without touching the map.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Field 1: Region / Environment */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-brand-400" />
            1. Geographic Setting / Location Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MANUAL_REGIONS.map((reg) => (
              <button
                key={reg.id}
                type="button"
                onClick={() => handleRegionChange(reg.id)}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  formData.ocean_proximity === reg.ocean_proximity
                    ? 'bg-brand-500/20 border-brand-400 text-white shadow-md shadow-brand-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="text-base mb-0.5">{reg.icon}</div>
                <div className="font-semibold text-slate-200">{reg.name}</div>
                <div className="text-[10px] text-slate-500">{reg.ocean_proximity}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Field 2: BHK Configuration */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-brand-400" />
            2. Property Configuration & Scale
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MANUAL_CONFIGS.map((cfg) => (
              <button
                key={cfg.id}
                type="button"
                onClick={() => handleConfigChange(cfg.id)}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  formData.total_rooms === cfg.rooms
                    ? 'bg-brand-500/20 border-brand-400 text-white shadow-md shadow-brand-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-slate-200">{cfg.label}</div>
                <div className="text-[10px] text-slate-500">{cfg.rooms} total rooms • {cfg.beds} beds</div>
              </button>
            ))}
          </div>
        </div>

        {/* Field 3: Household Income Tier */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-brand-400" />
            3. Neighborhood Income Level
          </label>
          <select
            value={formData.median_income}
            onChange={(e) => setFormData(prev => ({ ...prev, median_income: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-brand-400"
          >
            {MANUAL_INCOME_TIERS.map(inc => (
              <option key={inc.id} value={inc.value}>
                {inc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Field 4: Property Age */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            4. Property Age (Depreciation Index)
          </label>
          <select
            value={formData.housing_median_age}
            onChange={(e) => setFormData(prev => ({ ...prev, housing_median_age: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-brand-400"
          >
            {MANUAL_AGE_TIERS.map(ag => (
              <option key={ag.id} value={ag.age}>
                {ag.label}
              </option>
            ))}
          </select>
        </div>

        {/* Field 5: Model Selection */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-brand-400" />
            5. Machine Learning Model Architecture
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'xgboost', label: 'XGBoost Regressor', score: 'R² 0.821 (Best)', tag: 'Best' },
              { id: 'random_forest', label: 'Random Forest', score: 'R² 0.817', tag: 'Lowest MAE' },
              { id: 'linear', label: 'Linear Baseline', score: 'R² 0.625', tag: 'Baseline' }
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, model_type: m.id }))}
                className={`p-2 rounded-xl border text-left transition-all ${
                  formData.model_type === m.id
                    ? 'bg-brand-500/20 border-brand-400 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold">{m.label}</div>
                <div className="text-[10px] text-brand-400 font-mono">{m.score}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      <button
        onClick={onTriggerValuation}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>Calculate AI Valuation</span>
      </button>
    </div>
  );
}
