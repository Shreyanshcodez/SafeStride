import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Navigation, 
  PhoneCall, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Users, 
  HeartHandshake,
  Compass
} from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-violet-500 selection:text-white">
      {/* Navbar Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/15 to-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-850 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-8 shadow-lg shadow-teal-950/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Next-Gen Student Safety Prototype
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Your Safety. <span className="bg-gradient-to-r from-violet-400 via-teal-300 to-teal-400 bg-clip-text text-transparent">Your Campus.</span> Your Peace of Mind.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A smarter way to stay connected, check in safely, and navigate student life with confidence.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/app"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 shadow-xl shadow-violet-950/50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-slate-300 hover:text-white bg-navy-850/80 hover:bg-navy-800 border border-navy-700 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Features</span>
              <Compass className="w-4 h-4 text-teal-400" />
            </a>
          </div>

          {/* Value Props Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
              <span className="text-xl font-bold text-white block">24/7</span>
              <span className="text-xs text-slate-400">Emergency Dispatch Directory</span>
            </div>
            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
              <span className="text-xl font-bold text-teal-400 block">100% Free</span>
              <span className="text-xs text-slate-400">Client-Side Privacy Demo</span>
            </div>
            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
              <span className="text-xl font-bold text-violet-400 block">Instant</span>
              <span className="text-xs text-slate-400">Arrival Accountability Timers</span>
            </div>
            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
              <span className="text-xl font-bold text-white block">Offline</span>
              <span className="text-xs text-slate-400">Local Storage Data Safety</span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features Cards */}
      <section id="features" className="py-20 bg-navy-900/40 border-y border-navy-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 block mb-2">
              Engineered For Campus Life
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
              Proactive Safety at Your Fingertips
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Designed to solve late-night transits, isolated library walk-backs, and urgent campus communication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-800 hover:border-violet-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Safety Check-In</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Set estimated arrival times when returning to dorms or labs. Keep yourself accountable with visual countdown timers.
                </p>
              </div>
              <Link to="/app/check-in" className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1">
                Try Check-In <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-800 hover:border-teal-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Journey Tracker</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Simulate footpaths, bike journeys, and shuttle routes across campus with interactive OpenStreetMap views.
                </p>
              </div>
              <Link to="/app/journey" className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1">
                Explore Routes <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-800 hover:border-rose-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Emergency Contacts</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Instant one-tap speed dial for campus security, urgent care medical centers, and custom trusted friends.
                </p>
              </div>
              <Link to="/app/contacts" className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1">
                View Contacts <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-800 hover:border-violet-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Campus Safety Guide</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Curated best practices for night walking, hostel security, rideshare safety, and mental awareness.
                </p>
              </div>
              <Link to="/app/guide" className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1">
                Read Protocols <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400 block mb-2">
              Seamless Workflow
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
              How SafeStride Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 text-center relative">
              <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-900/40">
                1
              </div>
              <h4 className="text-base font-bold text-white mb-2">Set Your Commute</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your destination (e.g. North Hostel or Central Library) and specify your estimated walking duration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 text-center relative">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-900/40">
                2
              </div>
              <h4 className="text-base font-bold text-white mb-2">Simulate & Navigate</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Follow the illuminated route on the campus map with live progress checkpoints and direct contact shortcuts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 text-center relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-900/40">
                3
              </div>
              <h4 className="text-base font-bold text-white mb-2">Confirm Safe Arrival</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tap once to conclude the check-in and automatically record your safe arrival in your permanent local log.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Preparedness Section */}
      <section className="py-16 bg-gradient-to-r from-navy-900 via-purple-950 to-navy-900 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-navy-700 p-8 sm:p-12 bg-navy-950/70 backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                Emergency Preparedness
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Speed Matters in Campus Emergencies
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                SafeStride provides pre-configured direct lines to Campus Police, Medical Urgent Care, and Residence Wardens. No searching through contacts during distress.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Direct dial telephone links
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Customizable trusted contacts
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Zero external server dependencies
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link
                to="/app/contacts"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-xl shadow-rose-950/50 transition-all text-center text-sm"
              >
                Access Emergency Directory
              </Link>
              <Link
                to="/app"
                className="px-6 py-3 rounded-xl font-semibold text-slate-200 bg-navy-800 hover:bg-navy-700 border border-navy-700 transition-all text-center text-sm"
              >
                Launch Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-850 py-12 bg-navy-950 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-violet-600 text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-200 text-sm">SafeStride</span>
            <span className="text-slate-500">— Campus Safety Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/app" className="hover:text-slate-200 transition-colors">Dashboard</Link>
            <Link to="/app/check-in" className="hover:text-slate-200 transition-colors">Check-In</Link>
            <Link to="/app/journey" className="hover:text-slate-200 transition-colors">Journey</Link>
            <Link to="/app/contacts" className="hover:text-slate-200 transition-colors">Emergency</Link>
            <Link to="/app/guide" className="hover:text-slate-200 transition-colors">Safety Guide</Link>
          </div>

          <p className="text-slate-500">
            Frontend Demonstration Prototype. No real 911 or dispatch monitoring.
          </p>
        </div>
      </footer>
    </div>
  );
};

