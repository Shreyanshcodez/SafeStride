import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Clock, 
  Navigation, 
  PhoneCall, 
  BookOpen, 
  History, 
  Settings,
  Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { name: 'Safety Check-In', path: '/app/check-in', icon: Clock },
  { name: 'Journey Tracker', path: '/app/journey', icon: Navigation },
  { name: 'Emergency Contacts', path: '/app/contacts', icon: PhoneCall },
  { name: 'Campus Safety Guide', path: '/app/guide', icon: BookOpen },
  { name: 'Safety History', path: '/app/history', icon: History },
  { name: 'Settings', path: '/app/settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-navy-800 bg-navy-900/90 backdrop-blur-xl h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 h-18 border-b border-navy-800/80">
        <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-600 to-teal-400 text-white shadow-lg shadow-violet-900/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            SafeStride
          </span>
          <span className="block text-[10px] uppercase font-bold tracking-widest text-teal-400">
            Campus Safety
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2">
          <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">Main Platform</p>
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600/20 to-teal-500/10 text-teal-300 border border-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Campus Companion Status Badge */}
      <div className="p-4 m-3 rounded-2xl bg-gradient-to-b from-navy-850 to-navy-800 border border-navy-700/60 shadow-lg">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-xs font-semibold text-slate-200">Campus Protocol</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          Simulated student safety dashboard for campus demonstration.
        </p>
        <div className="flex items-center gap-2 text-[11px] text-teal-400 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          System Online (Demo)
        </div>
      </div>
    </aside>
  );
};

