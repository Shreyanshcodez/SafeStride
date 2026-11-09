import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ToastNotification } from './ToastNotification';
import { ShieldCheck, Info } from 'lucide-react';

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-navy-950 text-slate-100">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        {/* Demo banner clearly stating simulation nature */}
        <div className="bg-gradient-to-r from-violet-950/60 via-navy-900 to-navy-950 border-b border-navy-800/80 px-4 py-2 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
              <span>
                <strong className="text-slate-300 font-medium">SafeStride Demonstration Prototype:</strong> Journeys and check-ins are simulated locally for campus safety workflows.
              </span>
            </div>
            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-navy-800 text-teal-400 font-mono text-[11px] border border-navy-700">
              Demo Mode Active
            </span>
          </div>
        </div>

        {/* Dynamic page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>

        {/* Minimal Footer */}
        <footer className="border-t border-navy-850 py-6 px-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SafeStride — Smart Campus Safety Companion. Developed for college demonstration.</p>
        </footer>
      </div>

      {/* Global Toast Notifications */}
      <ToastNotification />
    </div>
  );
};

