import React from 'react';
import { Sliders, Home, Bed, Users, DollarSign, Calendar, Compass, Cpu } from 'lucide-react';

export default function PropertySliders({ formData, setFormData, onTriggerValuation }) {
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const oceanOptions = [
    { value: "<1H OCEAN", label: "<1 Hour to Coast" },
    { value: "INLAND", label: "Inland / Valley" },
    { value: "NEAR BAY", label: "Near Bay Area" },
    { value: "NEAR OCEAN", label: "Near Ocean (Beachfront)" },
    { value: "ISLAND", label: "Island Property" }
  ];

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
          <Sliders className="w-4 h-4 text-brand-400" />
          <span>Property Specifications & Neighborhood Demographics</span>
        </div>
        <span className="text-xs text-slate-400">Live Synchronized Sliders</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Median Income Slider */}
        <div className="space-y-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Median Income (Primary Driver)
            </span>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-emerald-400 font-bold">{formData.median_income}</span>
              <span className="text-[10px] text-slate-500">(~${(formData.median_income * 10000).toLocaleString()})</span>
            </div>
          </div>
          <input
            type="range"
            min="1.0"
            max="15.0"
            step="0.1"
            value={formData.median_income}
            onChange={(e) => handleChange('median_income', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>$10,000 / yr</span>
            <span>$75,000 / yr (Avg)</span>
            <span>$150,000+ / yr</span>
          </div>
        </div>

        {/* Housing Median Age Slider */}
        <div className="space-y-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-400" />
              Property Median Age
            </span>
            <span className="font-mono text-brand-400 font-bold">{formData.housing_median_age} Years</span>
          </div>
          <input
            type="range"
            min="1"
            max="52"
            step="1"
            value={formData.housing_median_age}
            onChange={(e) => handleChange('housing_median_age', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>1 yr (Modern)</span>
            <span>25 yrs (Standard)</span>
            <span>52 yrs (Vintage)</span>
          </div>
        </div>

        {/* Total Rooms */}
        <div className="space-y-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-sky-400" />
              Total Block Rooms
            </span>
            <input
              type="number"
              min="50"
              max="15000"
              value={formData.total_rooms}
              onChange={(e) => handleChange('total_rooms', parseInt(e.target.value) || 100)}
              className="w-20 px-2 py-0.5 rounded-lg bg-slate-800 text-xs text-right font-mono text-sky-300 border border-slate-700"
            />
          </div>
          <input
            type="range"
            min="200"
            max="8000"
            step="50"
            value={formData.total_rooms}
            onChange={(e) => handleChange('total_rooms', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Total Bedrooms */}
        <div className="space-y-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-indigo-400" />
              Total Bedrooms
            </span>
            <input
              type="number"
              min="20"
              max="3000"
              value={formData.total_bedrooms}
              onChange={(e) => handleChange('total_bedrooms', parseInt(e.target.value) || 50)}
              className="w-20 px-2 py-0.5 rounded-lg bg-slate-800 text-xs text-right font-mono text-indigo-300 border border-slate-700"
            />
          </div>
          <input
            type="range"
            min="50"
            max="1800"
            step="20"
            value={formData.total_bedrooms}
            onChange={(e) => handleChange('total_bedrooms', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Population & Households */}
        <div className="space-y-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              Block Population
            </span>
            <span className="font-mono text-purple-300 font-bold">{formData.population} People</span>
          </div>
          <input
            type="range"
            min="100"
            max="5000"
            step="50"
            value={formData.population}
            onChange={(e) => handleChange('population', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Households */}
        <div className="space-y-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-pink-400" />
              Households (Family Units)
            </span>
            <span className="font-mono text-pink-300 font-bold">{formData.households} Units</span>
          </div>
          <input
            type="range"
            min="50"
            max="2000"
            step="25"
            value={formData.households}
            onChange={(e) => handleChange('households', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Ocean Proximity Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-400" />
            Coastal & Ocean Proximity
          </label>
          <select
            value={formData.ocean_proximity}
            onChange={(e) => handleChange('ocean_proximity', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-brand-400 font-medium"
          >
            {oceanOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} ({opt.value})
              </option>
            ))}
          </select>
        </div>

        {/* Model Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-brand-400" />
            Inference Model
          </label>
          <select
            value={formData.model_type}
            onChange={(e) => handleChange('model_type', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-brand-400 font-medium"
          >
            <option value="xgboost">XGBoost Regressor (Best - R²: 0.821)</option>
            <option value="random_forest">Random Forest Regressor (R²: 0.817)</option>
            <option value="linear">Linear Regression Baseline (R²: 0.625)</option>
          </select>
        </div>

      </div>

      <button
        onClick={onTriggerValuation}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
      >
        ⚡ Run AI Property Valuation
      </button>

    </div>
  );
}
