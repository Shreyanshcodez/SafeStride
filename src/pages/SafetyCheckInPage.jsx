import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Info,
  Timer,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { CAMPUS_LOCATIONS } from '../data/mockData';
import { ConfirmationDialog } from '../components/ConfirmationDialog';

export const SafetyCheckInPage = () => {
  const { 
    contacts, 
    userProfile, 
    activeCheckIn, 
    startCheckIn, 
    completeCheckIn, 
    cancelCheckIn 
  } = useSafety();

  // Form states
  const [destination, setDestination] = useState(CAMPUS_LOCATIONS[0]);
  const [customDestination, setCustomDestination] = useState('');
  const [isCustomDest, setIsCustomDest] = useState(false);
  const [targetMinutes, setTargetMinutes] = useState('20');
  const [trustedContactId, setTrustedContactId] = useState(() => 
    userProfile?.defaultContactId || (contacts[0]?.id || '')
  );
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  // Time remaining state for active check-in
  const [timeLeft, setTimeLeft] = useState('');
  const [isOverdue, setIsOverdue] = useState(false);

  React.useEffect(() => {
    if (!activeCheckIn) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const end = new Date(activeCheckIn.expiresAt).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setIsOverdue(true);
        const overdue = Math.abs(Math.floor(diff / 1000));
        setTimeLeft(`Overdue by ${Math.floor(overdue / 60)}m ${overdue % 60}s`);
      } else {
        setIsOverdue(false);
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${mins}m ${secs < 10 ? '0' : ''}${secs}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeCheckIn]);

  const handleStartSession = (e) => {
    e.preventDefault();
    const finalDest = isCustomDest ? customDestination.trim() : destination;

    if (!finalDest) {
      setErrorMsg('Please specify a valid destination.');
      return;
    }

    const contact = contacts.find(c => c.id === trustedContactId) || contacts[0];

    startCheckIn({
      destination: finalDest,
      origin: 'Current Campus Location',
      targetMinutes: parseInt(targetMinutes, 10) || 20,
      trustedContactId: contact ? contact.id : 'default',
      trustedContactName: contact ? contact.name : 'Campus Dispatcher',
      notes: notes.trim()
    });

    setErrorMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Clock className="w-5 h-5 text-violet-400" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Safety Check-In Session
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Set an expected arrival time for your commute. Holds you accountable with simulated safety timestamps.
        </p>
      </div>

      {/* Disclaimers & Backend Explanation Note */}
      <div className="p-4 rounded-2xl bg-navy-900 border border-teal-500/30 flex items-start gap-3 shadow-lg">
        <Info className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-teal-300 font-semibold block mb-0.5">
            Frontend Demonstration Notice:
          </strong>
          This is an interactive frontend student safety demo. Automated external SMS / push alerts to emergency responders require an integrated backend server and telecommunications gateway. Never rely solely on this demo during life-threatening situations.
        </div>
      </div>

      {/* If Session is Active, display the active tracking console */}
      {activeCheckIn ? (
        <div className="rounded-2xl border border-navy-700 bg-gradient-to-b from-navy-850 to-navy-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping" />
                Active Check-In Session
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Heading to {activeCheckIn.destination}
              </h2>
            </div>
            <div className="px-4 py-2 rounded-xl bg-navy-950 border border-navy-800 text-right">
              <span className="text-[11px] text-slate-400 block uppercase tracking-wider">
                Status
              </span>
              <span className={`text-sm font-bold ${isOverdue ? 'text-rose-400' : 'text-teal-400'}`}>
                {isOverdue ? 'Arrival Overdue' : 'En Route Normal'}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid sm:grid-cols-3 gap-4 py-6">
            <div className="p-4 rounded-xl bg-navy-950/70 border border-navy-800">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                Destination
              </span>
              <p className="text-base font-semibold text-white">{activeCheckIn.destination}</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/70 border border-navy-800">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <UserCheck className="w-3.5 h-3.5 text-teal-400" />
                Designated Contact
              </span>
              <p className="text-sm font-semibold text-white truncate">{activeCheckIn.trustedContactName}</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/70 border border-navy-800">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                Remaining Time
              </span>
              <p className={`text-base font-mono font-bold ${isOverdue ? 'text-rose-400' : 'text-teal-300'}`}>
                {timeLeft || 'Calculating...'}
              </p>
            </div>
          </div>

          {activeCheckIn.notes && (
            <div className="mb-6 p-3.5 rounded-xl bg-navy-950/40 border border-navy-800/80 text-xs text-slate-300">
              <span className="text-slate-500 font-semibold uppercase text-[10px] block mb-0.5">Session Note:</span>
              {activeCheckIn.notes}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-navy-800">
            <button
              onClick={completeCheckIn}
              className="flex-1 py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-xl shadow-teal-950/50 flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              Mark as Safely Arrived
            </button>
            <button
              onClick={() => setConfirmCancelOpen(true)}
              className="py-3 px-6 rounded-xl font-semibold text-slate-400 hover:text-rose-300 hover:bg-navy-800 border border-navy-750 flex items-center justify-center gap-2 transition-colors"
            >
              <XCircle className="w-5 h-5" />
              Cancel Check-In
            </button>
          </div>

          <ConfirmationDialog
            isOpen={confirmCancelOpen}
            onClose={() => setConfirmCancelOpen(false)}
            onConfirm={cancelCheckIn}
            title="Cancel Active Check-In"
            message="Are you sure you want to cancel this check-in session? This action will mark your session as cancelled in your local safety log."
            confirmText="Yes, Cancel Session"
            danger={true}
          />
        </div>
      ) : (
        /* Create New Check-In Form */
        <div className="rounded-2xl border border-navy-750 bg-navy-900/80 p-6 sm:p-8 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            Configure Your Check-In
          </h2>

          <form onSubmit={handleStartSession} className="space-y-6">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select Destination
              </label>
              {!isCustomDest ? (
                <div className="space-y-2">
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
                  <button
                    type="button"
                    onClick={() => setIsCustomDest(true)}
                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium"
                  >
                    + Enter a custom location instead
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="e.g. Science Block Room 302, West Gate Cafe"
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomDest(false)}
                    className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    ← Choose from campus landmarks
                  </button>
                </div>
              )}
            </div>

            {/* Expected Arrival Duration */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Expected Arrival Time (Minutes)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {['10', '20', '30', '45'].map((mins) => (
                  <button
                    type="button"
                    key={mins}
                    onClick={() => setTargetMinutes(mins)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      targetMinutes === mins
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                        : 'bg-navy-850 text-slate-400 border-navy-750 hover:bg-navy-800'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                max="180"
                value={targetMinutes}
                onChange={(e) => setTargetMinutes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
                placeholder="Or type custom minutes"
              />
            </div>

            {/* Trusted Contact Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Designate Trusted Contact
              </label>
              <select
                value={trustedContactId}
                onChange={(e) => setTrustedContactId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.id} className="bg-navy-900 text-white">
                    {c.name} ({c.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Optional Notes (Route details, walking companions)
              </label>
              <input
                type="text"
                placeholder="e.g. Walking with study group along north boulevard"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 shadow-xl shadow-violet-950/50 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Start Safety Check-In Session</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

