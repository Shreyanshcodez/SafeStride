import React, { useState, useEffect } from 'react';
import { Clock, MapPin, UserCheck, CheckCircle2, XCircle, AlertCircle, Timer } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { ConfirmationDialog } from './ConfirmationDialog';
import { Link } from 'react-router-dom';

export const CheckInCard = () => {
  const { activeCheckIn, completeCheckIn, cancelCheckIn } = useSafety();
  const [timeLeft, setTimeLeft] = useState('');
  const [percentRemaining, setPercentRemaining] = useState(100);
  const [isOverdue, setIsOverdue] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  useEffect(() => {
    if (!activeCheckIn) return;

    const updateTimer = () => {
      const now = Date.now();
      const end = new Date(activeCheckIn.expiresAt).getTime();
      const start = new Date(activeCheckIn.startTime).getTime();
      const totalDuration = end - start;
      const remaining = end - now;

      if (remaining <= 0) {
        setIsOverdue(true);
        const overdueSeconds = Math.abs(Math.floor(remaining / 1000));
        const mins = Math.floor(overdueSeconds / 60);
        const secs = overdueSeconds % 60;
        setTimeLeft(`Overdue by ${mins}m ${secs}s`);
        setPercentRemaining(0);
      } else {
        setIsOverdue(false);
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(`${mins}m ${secs < 10 ? '0' : ''}${secs}s`);
        const pct = Math.max(0, Math.min(100, Math.round((remaining / totalDuration) * 100)));
        setPercentRemaining(pct);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeCheckIn]);

  if (!activeCheckIn) {
    return (
      <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-violet-400" />
              Safety Check-In
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-navy-800 text-slate-400 border border-navy-700">
              Inactive
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Active Check-In</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Planning to walk to your hostel, lab, or campus gate? Set an expected arrival timer and select a contact to hold yourself accountable.
          </p>
        </div>
        <Link
          to="/app/check-in"
          className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 shadow-md shadow-violet-950/40 transition-all"
        >
          Start New Check-In
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-navy-700 bg-gradient-to-b from-navy-850 to-navy-900 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
      {/* Top indicator */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            Active Session
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
            isOverdue 
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' 
              : 'bg-teal-500/20 text-teal-300 border-teal-500/40'
          }`}>
            {isOverdue ? 'Action Required' : 'In Progress'}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Destination</span>
              <p className="text-base font-semibold text-white">{activeCheckIn.destination}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <UserCheck className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs text-slate-400 block">Designated Contact</span>
              <p className="text-sm font-medium text-slate-200">{activeCheckIn.trustedContactName}</p>
            </div>
          </div>

          {/* Time Remaining Bar */}
          <div className="p-3 rounded-xl bg-navy-950/60 border border-navy-800">
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Timer className="w-3.5 h-3.5 text-slate-400" />
                Remaining Time
              </span>
              <span className={`font-mono font-bold ${isOverdue ? 'text-rose-400' : 'text-teal-300'}`}>
                {timeLeft}
              </span>
            </div>
            <div className="w-full bg-navy-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  isOverdue ? 'bg-rose-500' : 'bg-gradient-to-r from-teal-500 to-violet-500'
                }`}
                style={{ width: `${percentRemaining}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2 border-t border-navy-800">
        <button
          onClick={completeCheckIn}
          className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 flex items-center justify-center gap-2 shadow-lg shadow-teal-950/40 transition-all"
        >
          <CheckCircle2 className="w-4 h-4" />
          I Have Arrived Safely
        </button>
        <button
          onClick={() => setConfirmCancelOpen(true)}
          className="w-full py-2 px-4 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-navy-800 flex items-center justify-center gap-1.5 transition-colors"
        >
          <XCircle className="w-3.5 h-3.5" />
          Cancel Check-In Session
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationDialog
        isOpen={confirmCancelOpen}
        onClose={() => setConfirmCancelOpen(false)}
        onConfirm={cancelCheckIn}
        title="Cancel Safety Check-In"
        message="Are you sure you want to cancel this check-in session? The cancellation will be logged in your local safety history."
        confirmText="Yes, Cancel Session"
        danger={true}
      />
    </div>
  );
};

