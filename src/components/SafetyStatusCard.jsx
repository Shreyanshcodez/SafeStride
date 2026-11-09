import React from 'react';
import { Shield, ShieldAlert, CheckCircle2, Clock, Navigation } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { Link } from 'react-router-dom';

export const SafetyStatusCard = () => {
  const { activeCheckIn, activeJourney, history } = useSafety();

  const lastCompleted = history.find(h => h.status === 'completed');

  const hasActiveSession = Boolean(activeCheckIn || activeJourney);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-navy-750 bg-gradient-to-br from-navy-900 via-navy-850 to-purple-950 p-6 shadow-xl">
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Status indicator */}
        <div className="flex items-start gap-4">
          <div className={`p-3.5 rounded-2xl border ${
            hasActiveSession 
              ? 'bg-teal-500/15 border-teal-500/30 text-teal-300 shadow-lg shadow-teal-950/40' 
              : 'bg-violet-500/15 border-violet-500/30 text-violet-300 shadow-lg shadow-violet-950/40'
          }`}>
            {hasActiveSession ? (
              <Shield className="w-8 h-8 text-teal-400 animate-pulse" />
            ) : (
              <ShieldCheck className="w-8 h-8 text-violet-400" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                hasActiveSession
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${hasActiveSession ? 'bg-teal-400 animate-ping' : 'bg-violet-400'}`} />
                {hasActiveSession ? 'Active Safety Session' : 'Campus Standby Active'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {hasActiveSession ? 'Monitoring Active Sessions' : 'All Safety Protocols Normal'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              {hasActiveSession
                ? 'Your simulated check-in or journey is currently logged. Keep your trusted circle informed.'
                : 'Campus emergency numbers are on standby. Initiate a check-in or route tracking anytime you commute.'}
            </p>
          </div>
        </div>

        {/* Quick session snapshot metrics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:border-l md:border-navy-750 md:pl-6 min-w-[240px]">
          <div className="bg-navy-950/50 border border-navy-800 p-3 rounded-xl">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Active Check-In
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className={`w-4 h-4 ${activeCheckIn ? 'text-teal-400' : 'text-slate-500'}`} />
              <span className="text-sm font-semibold text-slate-200">
                {activeCheckIn ? activeCheckIn.destination : 'None active'}
              </span>
            </div>
          </div>

          <div className="bg-navy-950/50 border border-navy-800 p-3 rounded-xl">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Active Journey
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Navigation className={`w-4 h-4 ${activeJourney ? 'text-teal-400' : 'text-slate-500'}`} />
              <span className="text-sm font-semibold text-slate-200">
                {activeJourney ? activeJourney.destination : 'None active'}
              </span>
            </div>
          </div>

          <div className="col-span-2 bg-navy-950/50 border border-navy-800 p-3 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Last Completed Activity
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {lastCompleted ? `${lastCompleted.type === 'check-in' ? 'Check-in at' : 'Journey to'} ${lastCompleted.destination}` : 'No recent completed logs'}
              </span>
            </div>
            {lastCompleted && (
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Re-export ShieldCheck icon wrapper
function ShieldCheck(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

