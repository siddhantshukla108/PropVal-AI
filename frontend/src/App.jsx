import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ModeToggle from './components/ModeToggle';
import LocationSearch from './components/LocationSearch';
import MapView from './components/MapView';
import ManualInputForm from './components/ManualInputForm';
import PresetSelector from './components/PresetSelector';
import PropertySliders from './components/PropertySliders';
import ValuationCard from './components/ValuationCard';
import ExplainabilityWaterfall from './components/ExplainabilityWaterfall';
import InvestmentRadar from './components/InvestmentRadar';
import WhatIfSimulator from './components/WhatIfSimulator';
import ComparableComps from './components/ComparableComps';
import ModelComparator from './components/ModelComparator';
import MortgageCalculator from './components/MortgageCalculator';
import ValuationCertificate from './components/ValuationCertificate';
import ProjectInfoModal from './components/ProjectInfoModal';

import { predictPrice, getExplainability, getComps } from './api/client';
import { DEFAULT_PRESETS } from './data/presets';
import { Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState('USD');
  const [activeMode, setActiveMode] = useState('map');
  const [activePresetId, setActivePresetId] = useState('silicon_valley');
  
  const [formData, setFormData] = useState({
    latitude: 37.4419,
    longitude: -122.1430,
    housing_median_age: 12,
    total_rooms: 3800,
    total_bedrooms: 650,
    population: 1100,
    households: 380,
    median_income: 12.8,
    ocean_proximity: "NEAR BAY",
    model_type: "xgboost",
    city: "Palo Alto",
    country: "United States",
    locationName: "Palo Alto, California, USA"
  });

  const [valuation, setValuation] = useState(null);
  const [waterfall, setWaterfall] = useState([]);
  const [comps, setComps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Check if current location is in California
  const isCalifornia = 
    formData.latitude >= 32.4 &&
    formData.latitude <= 42.1 &&
    formData.longitude >= -124.6 &&
    formData.longitude <= -114.0;

  // Execute full valuation prediction & side analyses
  const runValuation = useCallback(async (currentForm) => {
    setLoading(true);
    try {
      // 1. Predict Price
      const predResult = await predictPrice({
        latitude: currentForm.latitude,
        longitude: currentForm.longitude,
        housing_median_age: currentForm.housing_median_age,
        total_rooms: currentForm.total_rooms,
        total_bedrooms: currentForm.total_bedrooms,
        population: currentForm.population,
        households: currentForm.households,
        median_income: currentForm.median_income,
        ocean_proximity: currentForm.ocean_proximity,
        model_type: currentForm.model_type,
        city: currentForm.city,
        country: currentForm.country,
        is_california: currentForm.latitude >= 32.4 && currentForm.latitude <= 42.1 && currentForm.longitude >= -124.6 && currentForm.longitude <= -114.0
      });

      setValuation(predResult);

      // 2. Fetch Explainable AI (XAI) Waterfall
      const xaiResult = await getExplainability({
        median_income: currentForm.median_income,
        housing_median_age: currentForm.housing_median_age,
        total_rooms: currentForm.total_rooms,
        total_bedrooms: currentForm.total_bedrooms,
        ocean_proximity: currentForm.ocean_proximity,
        price_usd: predResult.price_usd
      });

      if (xaiResult && xaiResult.waterfall) {
        setWaterfall(xaiResult.waterfall);
      }

      // 3. Fetch Nearby Ground-Truth Comps
      const compsResult = await getComps({
        latitude: currentForm.latitude,
        longitude: currentForm.longitude,
        base_price: predResult.price_usd,
        housing_median_age: currentForm.housing_median_age,
        total_rooms: currentForm.total_rooms,
        total_bedrooms: currentForm.total_bedrooms,
        ocean_proximity: currentForm.ocean_proximity
      });

      if (compsResult && compsResult.comps) {
        setComps(compsResult.comps);
      }

    } catch (err) {
      console.error("Valuation pipeline error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run on mount with default preset
  useEffect(() => {
    runValuation(formData);
  }, []);

  // Handle Preset selection
  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    const updated = {
      ...formData,
      latitude: preset.latitude,
      longitude: preset.longitude,
      housing_median_age: preset.housing_median_age,
      total_rooms: preset.total_rooms,
      total_bedrooms: preset.total_bedrooms,
      population: preset.population,
      households: preset.households,
      median_income: preset.median_income,
      ocean_proximity: preset.ocean_proximity,
      city: preset.city,
      country: preset.country,
      locationName: preset.location_name
    };
    setFormData(updated);
    runValuation(updated);
  };

  // Handle Map / Search location change
  const handleLocationChange = (loc) => {
    setActivePresetId(null);
    const updated = {
      ...formData,
      latitude: loc.latitude,
      longitude: loc.longitude,
      city: loc.city || formData.city,
      country: loc.country || formData.country,
      locationName: loc.locationName || formData.locationName,
      ocean_proximity: loc.ocean_proximity || formData.ocean_proximity
    };
    setFormData(updated);
    runValuation(updated);
  };

  // Handle Model switch
  const handleSelectModel = (modelId) => {
    const updated = { ...formData, model_type: modelId };
    setFormData(updated);
    runValuation(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onOpenInfoModal={() => setIsInfoModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Hero Section Banner */}
        <section className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Summer Internship Innovation • CSE Department (2026)</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Global Real Estate <span className="bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">AI Valuation</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-1">
                Spatial machine learning pipeline powered by fine-tuned <strong>XGBoost (R²: 0.821)</strong>, explainable feature waterfall, investment radar, and interactive geocoding.
              </p>
            </div>

            {/* Quick Benchmark Stats Pill */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
              <div className="px-3 border-r border-slate-800">
                <span className="block text-[10px] text-slate-500 uppercase">Best Model</span>
                <span className="font-bold text-brand-400">XGBoost (0.82 R²)</span>
              </div>
              <div className="px-3 border-r border-slate-800">
                <span className="block text-[10px] text-slate-500 uppercase">Test RMSE</span>
                <span className="font-bold text-emerald-400">$48,496</span>
              </div>
              <div className="px-3">
                <span className="block text-[10px] text-slate-500 uppercase">Dataset</span>
                <span className="font-bold text-slate-200">20.6k Rows</span>
              </div>
            </div>
          </div>
        </section>

        {/* 1-Click Showcase Presets (Critical for 10-Minute Viva) */}
        <section>
          <PresetSelector
            onSelectPreset={handleSelectPreset}
            activePresetId={activePresetId}
          />
        </section>

        {/* Input Mode Switcher */}
        <section>
          <ModeToggle
            activeMode={activeMode}
            setActiveMode={setActiveMode}
          />
        </section>

        {/* Main Workspace 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Input Controls (Map Mode vs Manual Mode) */}
          <div className="lg:col-span-6 space-y-6">
            
            {activeMode === 'map' ? (
              <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                    <Compass className="w-4 h-4 text-brand-400" />
                    <span>Mode 1: Spatial Map & Global Search</span>
                  </div>
                  <span className="text-[11px] text-brand-400 font-semibold font-mono">
                    {isCalifornia ? '📍 California Benchmark' : '🌐 Global Synthesizer'}
                  </span>
                </div>

                {/* Global Search Bar */}
                <LocationSearch
                  onSelectLocation={handleLocationChange}
                  isCalifornia={isCalifornia}
                  currentLocationName={formData.locationName}
                />

                {/* Interactive Leaflet Map */}
                <MapView
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  locationName={formData.locationName}
                  onLocationChange={handleLocationChange}
                  isCalifornia={isCalifornia}
                />

                {/* Real-time Fine Tuning Sliders */}
                <PropertySliders
                  formData={formData}
                  setFormData={setFormData}
                  onTriggerValuation={() => runValuation(formData)}
                />
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    <span>Mode 2: Quick Manual Entry (5-Field Direct Form)</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">No Map Required</span>
                </div>

                <ManualInputForm
                  formData={formData}
                  setFormData={setFormData}
                  onTriggerValuation={() => runValuation(formData)}
                />
              </div>
            )}

            {/* Multi-Model Benchmark Comparison */}
            <ModelComparator
              activeModelId={formData.model_type}
              onSelectModel={handleSelectModel}
            />

          </div>

          {/* RIGHT COLUMN: Real-time Valuations, Standout Features & Financial Radar */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Hero Valuation Card */}
            <ValuationCard
              valuation={valuation}
              currency={currency}
              onOpenCertificate={() => setIsCertificateOpen(true)}
              loading={loading}
            />

            {/* 🌟 Killer Feature 1: Explainable AI (XAI) Waterfall */}
            <ExplainabilityWaterfall
              waterfall={waterfall}
              baselineUsd={206855}
              finalUsd={valuation?.price_usd}
            />

            {/* 🌟 Killer Feature 2: Real Estate Investment & Rental Yield Radar */}
            <InvestmentRadar
              investment={valuation?.investment_radar}
              currency={currency}
            />

            {/* 🌟 Killer Feature 3: What-If Renovation Value Booster */}
            <WhatIfSimulator
              baseValuationUsd={valuation?.price_usd}
              currency={currency}
            />

            {/* 🌟 Killer Feature 5: Nearby Comparable Properties ("Comps" Radar) */}
            <ComparableComps
              comps={comps}
              currency={currency}
            />

            {/* Mortgage & EMI Calculator */}
            <MortgageCalculator
              propertyPriceUsd={valuation?.price_usd}
              currency={currency}
            />

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-6 mt-12 text-center text-xs text-slate-500 space-y-1">
        <p>
          House Price Prediction System • UCER, Prayagraj (2026)
        </p>
        <p className="text-[11px] text-slate-600">
          Built by Shubham Mishra, Siddhant Shukla, Sudhanshu P. Singh, Suyash Srivastav
        </p>
      </footer>

      {/* 🌟 Killer Feature 4: 1-Click Official Valuation PDF Appraisal Certificate Modal */}
      <ValuationCertificate
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        valuation={valuation}
        formData={formData}
      />

      {/* Team & Presentation Info Modal */}
      <ProjectInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />

    </div>
  );
}
