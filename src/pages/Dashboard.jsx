import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Navigation, 
  PhoneCall, 
  BookOpen, 
  Sparkles, 
  History, 
  ArrowRight, 
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { SafetyStatusCard } from '../components/SafetyStatusCard';
import { CheckInCard } from '../components/CheckInCard';
import { JourneyCard } from '../components/JourneyCard';
import { SAFETY_TIPS } from '../data/mockData';
import { EmptyState } from '../components/EmptyState';

export const Dashboard = () => {
  const { contacts, history } = useSafety();

  // Random/rotating safety tip
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * SAFETY_TIPS.length));

  const currentTip = SAFETY_TIPS[tipIndex] || SAFETY_TIPS[0];

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % SAFETY_TIPS.length);
  };

  const emergencyContacts = contacts.filter(c => c.isEmergencyService);
  const recentActivities = history.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* 1. Safety Overview Header Card */}
      <SafetyStatusCard />

      {/* 2. Quick Actions Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white tracking-tight">Quick Actions</h2>
          <span className="text-xs text-slate-400">Essential Safety Controls</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/app/check-in"
            className="p-5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-850 border border-navy-750 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-950/30 transition-all flex flex-col justify-between group"
          >
            <div className="p-3 rounded-xl bg-violet-500/15 text-violet-400 w-fit mb-3 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                Safety Check-In
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Log scheduled arrival times
              </p>
            </div>
          </Link>

          <Link
            to="/app/journey"
            className="p-5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-850 border border-navy-750 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-950/30 transition-all flex flex-col justify-between group"
          >
            <div className="p-3 rounded-xl bg-teal-500/15 text-teal-400 w-fit mb-3 group-hover:scale-105 transition-transform">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                Start Journey
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Track your campus route
              </p>
            </div>
          </Link>

          <Link
            to="/app/contacts"
            className="p-5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-850 border border-navy-750 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-950/30 transition-all flex flex-col justify-between group"
          >
            <div className="p-3 rounded-xl bg-rose-500/15 text-rose-400 w-fit mb-3 group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                Emergency Contacts
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Campus dispatch speed-dial
              </p>
            </div>
          </Link>

          <Link
            to="/app/guide"
            className="p-5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-850 border border-navy-750 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-950/30 transition-all flex flex-col justify-between group"
          >
            <div className="p-3 rounded-xl bg-violet-500/15 text-violet-400 w-fit mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                Safety Guide
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Preventative protocols & advice
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Active Sessions Row (CheckInCard & JourneyCard) */}
      <section className="grid lg:grid-cols-2 gap-6">
        <CheckInCard />
        <JourneyCard />
      </section>

      {/* 4. Safety Tips & Emergency Shortcuts Grid */}
      <section className="grid lg:grid-cols-3 gap-6">
        {/* Rotating Safety Tip Box */}
        <div className="lg:col-span-2 rounded-2xl border border-navy-750 bg-gradient-to-br from-navy-900 via-navy-850 to-purple-950/40 p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Featured Safety Insight • {currentTip.category}
                </span>
              </div>
              <button
                onClick={handleNextTip}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 bg-navy-800/80 px-2.5 py-1 rounded-lg border border-navy-700"
              >
                <span>Rotate Tip</span>
                <Sparkles className="w-3 h-3 text-violet-400" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug">
              {currentTip.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {currentTip.summary}
            </p>

            {currentTip.highlight && (
              <div className="p-3 rounded-xl bg-navy-950/60 border border-navy-800 text-xs text-slate-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span>{currentTip.highlight}</span>
              </div>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-navy-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing tip {tipIndex + 1} of {SAFETY_TIPS.length}
            </span>
            <Link
              to="/app/guide"
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
            >
              Browse Full Safety Guide <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Emergency Contacts Shortcut Section */}
        <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-b from-navy-900 to-rose-950/20 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Emergency Hotline
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/40">
                24/7 Response
              </span>
            </div>

            <div className="space-y-3 mb-4">
              {emergencyContacts.slice(0, 2).map((contact) => (
                <div
                  key={contact.id}
                  className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 flex items-center justify-between"
                >
                  <div className="pr-2">
                    <h4 className="text-xs font-bold text-white">{contact.name}</h4>
                    <p className="text-[11px] font-mono text-teal-400 mt-0.5">{contact.phone}</p>
                  </div>
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md shadow-rose-950/50"
                    title={`Call ${contact.name}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/app/contacts"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-center transition-colors block"
          >
            Manage All Emergency Contacts
          </Link>
        </div>
      </section>

      {/* 5. Recent Activity Table / List */}
      <section className="rounded-2xl border border-navy-800 bg-navy-900/60 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-violet-400" />
            <h2 className="text-base font-bold text-white">Recent Safety Activity</h2>
          </div>
          <Link
            to="/app/history"
            className="text-xs font-medium text-teal-400 hover:text-teal-300 flex items-center gap-1"
          >
            Full Log <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentActivities.length === 0 ? (
          <EmptyState
            title="No activity recorded yet"
            description="Your completed check-ins and journey tracking logs will appear here."
            actionLabel="Start a Check-In"
            onAction={() => window.location.href = '#/app/check-in'}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-navy-800">
                <tr>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Destination / Route</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60">
                {recentActivities.map((item) => (
                  <tr key={item.id} className="hover:bg-navy-850/40 transition-colors">
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        item.type === 'check-in' 
                          ? 'bg-violet-500/15 text-violet-300' 
                          : 'bg-teal-500/15 text-teal-300'
                      }`}>
                        {item.type === 'check-in' ? <Clock className="w-3 h-3" /> : <Navigation className="w-3 h-3" />}
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-200">
                      {item.destination}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 font-medium ${
                        item.status === 'completed' ? 'text-teal-400' : 'text-slate-400'
                      }`}>
                        {item.status === 'completed' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span className="capitalize">{item.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono">
                      {new Date(item.timestamp).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

