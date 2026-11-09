import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Bell, 
  HelpCircle, 
  LayoutDashboard, 
  Clock, 
  Navigation, 
  PhoneCall, 
  BookOpen, 
  History, 
  Settings,
  AlertTriangle
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { name: 'Safety Check-In', path: '/app/check-in', icon: Clock },
  { name: 'Journey Tracker', path: '/app/journey', icon: Navigation },
  { name: 'Emergency Contacts', path: '/app/contacts', icon: PhoneCall },
  { name: 'Campus Safety Guide', path: '/app/guide', icon: BookOpen },
  { name: 'Safety History', path: '/app/history', icon: History },
  { name: 'Settings', path: '/app/settings', icon: Settings },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userProfile, activeCheckIn, activeJourney } = useSafety();
  const location = useLocation();

  const isPublicLanding = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-800 bg-navy-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo (Public or mobile fallback) */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-600 to-teal-400 text-white shadow-md shadow-violet-900/30 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                SafeStride
              </span>
            </Link>

            {/* Active Status Indicator Pill */}
            {!isPublicLanding && (
              <div className="hidden sm:flex items-center gap-2 ml-4 px-2.5 py-1 rounded-full text-xs font-medium bg-navy-850 border border-navy-750">
                {activeCheckIn || activeJourney ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    <span className="text-teal-400">
                      {activeCheckIn && activeJourney ? 'Active Check-In & Journey' : activeCheckIn ? 'Check-In Active' : 'Journey In-Progress'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-slate-500"></span>
                    <span className="text-slate-400">Normal Standby</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Section Navigation */}
          <div className="flex items-center gap-3">
            {isPublicLanding ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/app/guide"
                  className="hidden sm:inline-flex text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
                >
                  Campus Guide
                </Link>
                <Link
                  to="/app"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 rounded-xl shadow-lg shadow-violet-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Enter App
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/app/contacts"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-all"
                  title="Campus Emergency Contacts"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>SOS Numbers</span>
                </Link>

                <Link
                  to="/app/settings"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-750 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-teal-500 flex items-center justify-center text-[11px] font-bold text-white uppercase">
                    {userProfile?.name?.charAt(0) || 'S'}
                  </div>
                  <span className="text-xs font-medium hidden md:inline">
                    {userProfile?.studentId || 'Profile'}
                  </span>
                </Link>

                {/* Mobile hamburger button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-navy-800 bg-navy-900/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-1">
          <p className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">Navigation</p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/app'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-violet-600/20 text-teal-300 border border-teal-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};

