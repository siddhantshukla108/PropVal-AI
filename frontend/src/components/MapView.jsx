import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';

// Fix Leaflet default icon URLs in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom animated pulsing marker icon
const customMapIcon = L.divIcon({
  className: 'custom-pin',
  html: `
    <div style="
      position: relative;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #0ea5e9;
        opacity: 0.4;
        animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      "></div>
      <div style="
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #0284c7;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      "></div>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// Helper component to smoothly pan when coordinates change
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  }, [center, zoom, map]);
  return null;
}

// Helper component to handle user clicks directly on the map
function MapClickHandler({ onLocationChange }) {
  useMapEvents({
    click: (e) => {
      const lat = parseFloat(e.latlng.lat.toFixed(4));
      const lon = parseFloat(e.latlng.lng.toFixed(4));
      
      let ocean = 'INLAND';
      if (lat >= 32.4 && lat <= 42.1 && lon >= -124.6 && lon <= -114.0) {
        if (lon <= -122.0 && lat >= 37.0 && lat <= 38.2) ocean = 'NEAR BAY';
        else if (lon <= -121.5 || (lat <= 34.5 && lon <= -118.0)) ocean = 'NEAR OCEAN';
        else if (lon <= -117.5) ocean = '<1H OCEAN';
        else ocean = 'INLAND';
      }

      onLocationChange({
        latitude: lat,
        longitude: lon,
        city: 'Selected Coordinates',
        country: 'Custom Pin',
        locationName: `Lat ${lat}°, Lon ${lon}°`,
        ocean_proximity: ocean
      });
    },
  });
  return null;
}

export default function MapView({ latitude, longitude, locationName, onLocationChange, isCalifornia }) {
  const position = [latitude, longitude];

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
      <MapContainer
        center={position}
        zoom={isCalifornia ? 9 : 11}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeView center={position} zoom={isCalifornia ? 9 : 11} />
        <MapClickHandler onLocationChange={onLocationChange} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={customMapIcon}>
          <Popup className="custom-popup">
            <div className="text-slate-900 text-xs p-1">
              <strong className="block text-brand-600 font-bold mb-0.5">{locationName}</strong>
              <span>Lat: {latitude.toFixed(2)}°, Lon: {longitude.toFixed(2)}°</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Floating Info Badge on Map */}
      <div className="absolute top-3 right-3 z-[1000] px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs flex items-center gap-2 shadow-lg">
        <Navigation className="w-3.5 h-3.5 text-brand-400" />
        <span className="font-mono text-slate-200">
          {latitude.toFixed(2)}° N, {longitude.toFixed(2)}° W
        </span>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-3 z-[1000] px-3 py-1 rounded-lg bg-slate-900/85 border border-slate-800 text-[11px] text-slate-400 backdrop-blur-md">
        💡 Click anywhere on the map to place a pin
      </div>
    </div>
  );
}
