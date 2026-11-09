import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Footprints, Bike, Bus, CheckCircle2, XCircle, Route } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { ConfirmationDialog } from './ConfirmationDialog';
import { Link } from 'react-router-dom';

export const JourneyCard = () => {
  const { activeJourney, completeJourney, cancelJourney, setActiveJourney } = useSafety();
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  useEffect(() => {
    if (!activeJourney) return;

    // Simulate progress advance over time
    const interval = setInterval(() => {
      setActiveJourney(prev => {
        if (!prev) return null;
        const currentPct = prev.progressPercent || 0;
        if (currentPct >= 95) return prev;
        return {
          ...prev,
          progressPercent: Math.min(95, currentPct + 2)
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [activeJourney, setActiveJourney]);

  if (!activeJourney) {
    return (
      <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-teal-400" />
              Journey Tracker
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-navy-800 text-slate-400 border border-navy-700">
              Idle
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Simulate a Campus Route</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Record your walk, bike ride, or campus shuttle transfer across university grounds with visual route progress tracking.
          </p>
        </div>
        <Link
          to="/app/journey"
          className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-violet-600 hover:from-teal-500 hover:to-violet-500 shadow-md shadow-teal-950/40 transition-all"
        >
          Plan & Start Journey
        </Link>
      </div>
    );
  }

  const getModeIcon = (mode) => {
    if (mode === 'Cycling') return Bike;
    if (mode === 'Campus Shuttle') return Bus;
    return Footprints;
  };

  const ModeIcon = getModeIcon(activeJourney.travelMode);

  return (
    <div className="rounded-2xl border border-navy-700 bg-gradient-to-b from-navy-850 to-navy-900 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
            <Route className="w-4 h-4 animate-pulse text-teal-400" />
            Live Journey Simulation
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 font-medium">
            En Route
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950/70 border border-navy-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                <ModeIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Mode</span>
                <span className="text-sm font-semibold text-slate-200">{activeJourney.travelMode}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Est. Time</span>
              <span className="text-sm font-semibold text-teal-300">{activeJourney.estimatedMinutes} mins</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2.5">
              <div className="h-2 w-2 rounded-full bg-violet-400 mt-1.5" />
              <div>
                <span className="text-[11px] text-slate-400 block">From</span>
                <p className="font-medium text-slate-300">{activeJourney.origin}</p>
              </div>
            </div>
            <div className="border-l border-dashed border-navy-700 ml-1 h-3" />
            <div className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block">To</span>
                <p className="font-semibold text-white">{activeJourney.destination}</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Simulation Progress</span>
              <span className="font-mono text-teal-400 font-bold">{activeJourney.progressPercent || 0}%</span>
            </div>
            <div className="w-full bg-navy-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-violet-500 transition-all duration-700 rounded-full"
                style={{ width: `${activeJourney.progressPercent || 15}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2 border-t border-navy-800">
        <button
          onClick={completeJourney}
          className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 flex items-center justify-center gap-2 shadow-lg shadow-teal-950/40 transition-all"
        >
          <CheckCircle2 className="w-4 h-4" />
          Complete Journey
        </button>
        <button
          onClick={() => setConfirmCancelOpen(true)}
          className="w-full py-2 px-4 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-navy-800 flex items-center justify-center gap-1.5 transition-colors"
        >
          <XCircle className="w-3.5 h-3.5" />
          Cancel Simulation
        </button>
      </div>

      <ConfirmationDialog
        isOpen={confirmCancelOpen}
        onClose={() => setConfirmCancelOpen(false)}
        onConfirm={cancelJourney}
        title="Cancel Journey Simulation"
        message="Are you sure you want to stop this journey simulation? The entry will be marked cancelled in your logs."
        confirmText="Yes, Stop Journey"
        danger={true}
      />
    </div>
  );
};

