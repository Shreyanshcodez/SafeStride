import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Footprints, 
  Bike, 
  Bus, 
  CheckCircle2, 
  XCircle, 
  Info,
  Route,
  Play,
  RotateCcw
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { CAMPUS_LOCATIONS } from '../data/mockData';
import { CampusMap } from '../components/CampusMap';
import { ConfirmationDialog } from '../components/ConfirmationDialog';

export const JourneyTrackerPage = () => {
  const { 
    activeJourney, 
    startJourney, 
    completeJourney, 
    cancelJourney, 
    setActiveJourney 
  } = useSafety();

  const [origin, setOrigin] = useState(CAMPUS_LOCATIONS[0]);
  const [destination, setDestination] = useState(CAMPUS_LOCATIONS[2]);
  const [travelMode, setTravelMode] = useState('Walking');
  const [estimatedMinutes, setEstimatedMinutes] = useState('15');
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const travelModes = [
    { id: 'Walking', icon: Footprints, defaultTime: '15' },
    { id: 'Cycling', icon: Bike, defaultTime: '8' },
    { id: 'Campus Shuttle', icon: Bus, defaultTime: '10' }
  ];

  const handleModeChange = (mode) => {
    setTravelMode(mode.id);
    setEstimatedMinutes(mode.defaultTime);
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (origin === destination) {
      alert('Origin and destination should be distinct campus locations.');
      return;
    }
    startJourney({
      origin,
      destination,
      travelMode,
      estimatedMinutes: parseInt(estimatedMinutes, 10) || 15
    });
  };

  const handleManualAdvance = () => {
    if (!activeJourney) return;
    setActiveJourney(prev => {
      const current = prev.progressPercent || 0;
      const next = Math.min(100, current + 20);
      return { ...prev, progressPercent: next };
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Navigation className="w-5 h-5 text-teal-400" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Campus Journey Tracker
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Simulate routes between academic halls, sports centers, and residential blocks with interactive map telemetry.
        </p>
      </div>

      {/* Simulated GPS Notice */}
      <div className="p-4 rounded-2xl bg-navy-900 border border-teal-500/30 flex items-start gap-3 shadow-lg">
        <Info className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-teal-300 font-semibold block mb-0.5">
            Simulated Campus Route Tracking:
          </strong>
          This feature uses simulated waypoints and browser animation. Real GPS device coordinates are not polled or streamed to external servers to preserve complete privacy.
        </div>
      </div>

      {/* Active Journey View vs Configurator */}
      {activeJourney ? (
        <div className="space-y-6">
          {/* Map view */}
          <CampusMap
            origin={activeJourney.origin}
            destination={activeJourney.destination}
            progress={activeJourney.progressPercent || 0}
          />

          {/* Live Progress Controls */}
          <div className="rounded-2xl border border-navy-700 bg-navy-900/90 p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-navy-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Route className="w-4 h-4 animate-pulse" />
                  Active Journey In Progress
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeJourney.origin} → {activeJourney.destination}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-xl bg-navy-850 border border-navy-750 text-slate-300 font-medium">
                  Mode: {activeJourney.travelMode}
                </span>
                <span className="text-xs px-3 py-1 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 font-mono font-bold">
                  {activeJourney.progressPercent || 0}% Complete
                </span>
              </div>
            </div>

            {/* Progress Slider Display */}
            <div className="py-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Departed: {activeJourney.origin}</span>
                <span>Destination: {activeJourney.destination}</span>
              </div>
              <div className="w-full bg-navy-800 h-3 rounded-full overflow-hidden p-0.5 border border-navy-700">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 via-violet-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeJourney.progressPercent || 0}%` }}
                />
              </div>
            </div>

            {/* Fast-forward simulation button for demo judges */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950/60 border border-navy-800 text-xs text-slate-400 mb-6">
              <span>Showcase Tip: Advance route simulation manually:</span>
              <button
                onClick={handleManualAdvance}
                className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-teal-300 border border-navy-700 font-medium transition-colors"
              >
                + Advance 20%
              </button>
            </div>

            {/* Completion Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={completeJourney}
                className="flex-1 py-3 px-6 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-xl shadow-teal-950/50 flex items-center justify-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-5 h-5" />
                Complete Journey Safely
              </button>
              <button
                onClick={() => setConfirmCancelOpen(true)}
                className="py-3 px-6 rounded-xl font-semibold text-slate-400 hover:text-rose-300 hover:bg-navy-800 border border-navy-750 flex items-center justify-center gap-2 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Cancel Journey
              </button>
            </div>
          </div>

          <ConfirmationDialog
            isOpen={confirmCancelOpen}
            onClose={() => setConfirmCancelOpen(false)}
            onConfirm={cancelJourney}
            title="Cancel Journey Simulation"
            message="Are you sure you want to stop this route tracker? It will be marked cancelled in your safety logs."
            confirmText="Yes, Stop Journey"
            danger={true}
          />
        </div>
      ) : (
        /* Journey Setup Form & Preview Map */
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Setup Form */}
          <div className="rounded-2xl border border-navy-750 bg-navy-900/80 p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Play className="w-5 h-5 text-teal-400" />
              Plan Campus Commute
            </h2>

            <form onSubmit={handleStart} className="space-y-6">
              {/* Origin */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Starting Point
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
                >
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-navy-900 text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Campus Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
                >
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-navy-900 text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Select Travel Mode
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {travelModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        type="button"
                        key={mode.id}
                        onClick={() => handleModeChange(mode)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                          travelMode === mode.id
                            ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-md'
                            : 'bg-navy-850 text-slate-400 border-navy-750 hover:bg-navy-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-semibold">{mode.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Estimated Time */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Estimated Duration (Minutes)
                </label>
                <input
                  type="number"
                  min="2"
                  max="120"
                  value={estimatedMinutes}
                  onChange={(e) => setEstimatedMinutes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-teal-600 to-violet-600 hover:from-teal-500 hover:to-violet-500 shadow-xl shadow-teal-950/50 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Journey Simulation</span>
              </button>
            </form>
          </div>

          {/* Interactive Preview Map */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-violet-400" />
              Route Preview
            </h3>
            <CampusMap origin={origin} destination={destination} progress={0} />
            <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 text-xs text-slate-400 space-y-1">
              <p>• Route line marks verified illuminated night pathways.</p>
              <p>• Waypoints are within range of campus emergency blue light boxes.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

