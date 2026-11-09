import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// Coordinates for campus mockup (e.g. University park style)
const CAMPUS_WAYPOINTS = {
  'Central Campus Library': [37.4275, -122.1697],
  'Student Activity Center': [37.4260, -122.1720],
  'North Hostel Quad': [37.4310, -122.1685],
  'South Residential Complex': [37.4220, -122.1680],
  'Engineering & Science Labs': [37.4290, -122.1740],
  'Athletics & Recreation Center': [37.4245, -122.1640],
  'Campus Transit Terminal': [37.4320, -122.1630],
  'Dining Commons & Cafe': [37.4265, -122.1705],
  'Graduate Research Wing': [37.4300, -122.1710],
  'Health & Wellness Center': [37.4230, -122.1730]
};

export const CampusMap = ({ origin, destination, progress = 0 }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);
  const markerLayerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet map
      const map = L.map(mapContainerRef.current, {
        center: [37.4275, -122.1697],
        zoom: 15,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      routeLayerRef.current = L.layerGroup().addTo(map);
      markerLayerRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;
    const routeGroup = routeLayerRef.current;
    const markerGroup = markerLayerRef.current;

    routeGroup.clearLayers();
    markerGroup.clearLayers();

    const startCoord = CAMPUS_WAYPOINTS[origin] || [37.4275, -122.1697];
    const endCoord = CAMPUS_WAYPOINTS[destination] || [37.4310, -122.1685];

    // Create custom pin icons using HTML
    const startIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="background-color: #8b5cf6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 12px rgba(139,92,246,0.8); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">A</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const endIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="background-color: #14b8a6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 12px rgba(20,184,166,0.8); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">B</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    // Add Start & End Markers
    L.marker(startCoord, { icon: startIcon }).bindPopup(`<b>Start:</b> ${origin || 'Origin'}`).addTo(markerGroup);
    L.marker(endCoord, { icon: endIcon }).bindPopup(`<b>Destination:</b> ${destination || 'Destination'}`).addTo(markerGroup);

    // Draw route line
    const latlngs = [startCoord, endCoord];
    const polyline = L.polyline(latlngs, {
      color: '#2dd4bf',
      weight: 4,
      opacity: 0.85,
      dashArray: '8, 8',
      lineCap: 'round'
    }).addTo(routeGroup);

    // If progress is active, calculate current simulated position
    if (progress > 0 && progress <= 100) {
      const currentLat = startCoord[0] + (endCoord[0] - startCoord[0]) * (progress / 100);
      const currentLng = startCoord[1] + (endCoord[1] - startCoord[1]) * (progress / 100);

      const movingIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background-color: #f59e0b; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 0 10px #f59e0b; animation: pulse 1.5s infinite;"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });

      L.marker([currentLat, currentLng], { icon: movingIcon }).bindPopup(`<b>Current Progress:</b> ${progress}%`).addTo(markerGroup);
    }

    // Fit bounds
    const bounds = L.latLngBounds([startCoord, endCoord]);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });

  }, [origin, destination, progress]);

  return (
    <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-navy-750 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      <div className="absolute bottom-2 right-2 z-20 px-2.5 py-1 rounded-lg bg-navy-950/80 backdrop-blur-md border border-navy-800 text-[10px] text-slate-400">
        OpenStreetMap • Leaflet Simulation
      </div>
    </div>
  );
};

