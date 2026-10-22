import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkHealth = async () => {
  try {
    const res = await api.get('/api/health');
    return res.data;
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
};

export const getModels = async () => {
  try {
    const res = await api.get('/api/models');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch models:', err);
    return [];
  }
};

export const getPresets = async () => {
  try {
    const res = await api.get('/api/presets');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch presets:', err);
    return [];
  }
};

export const predictPrice = async (payload) => {
  try {
    const res = await api.post('/api/predict', payload);
    return res.data;
  } catch (err) {
    console.error('Prediction failed:', err);
    throw err;
  }
};

export const getExplainability = async (payload) => {
  try {
    const res = await api.post('/api/explain', payload);
    return res.data;
  } catch (err) {
    console.error('Explainability failed:', err);
    return null;
  }
};

export const getComps = async (payload) => {
  try {
    const res = await api.post('/api/comps', payload);
    return res.data;
  } catch (err) {
    console.error('Comps retrieval failed:', err);
    return { comps: [] };
  }
};

export default api;
