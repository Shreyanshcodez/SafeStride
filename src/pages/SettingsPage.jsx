import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  RotateCcw, 
  Save, 
  Sliders, 
  Volume2, 
  Moon, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { ConfirmationDialog } from '../components/ConfirmationDialog';

export const SettingsPage = () => {
  const { userProfile, setUserProfile, contacts, resetDemoData, addToast } = useSafety();

  const [name, setName] = useState(userProfile.name || '');
  const [studentId, setStudentId] = useState(userProfile.studentId || '');
  const [residence, setResidence] = useState(userProfile.residence || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  const [defaultContactId, setDefaultContactId] = useState(userProfile.defaultContactId || '');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile(prev => ({
      ...prev,
      name: name.trim(),
      studentId: studentId.trim(),
      residence: residence.trim(),
      email: email.trim(),
      phone: phone.trim(),
      defaultContactId
    }));
    addToast('Profile information successfully saved.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Settings className="w-5 h-5 text-teal-400" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Settings & Preferences
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Manage your campus student profile, default emergency buddy, and client-side application preferences.
        </p>
      </div>

      {/* Profile Form */}
      <div className="rounded-2xl border border-navy-750 bg-navy-900/80 p-6 sm:p-8 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-violet-400" />
          Student Profile Details
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name / Alias
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Campus Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Campus Residence / Hostel
              </label>
              <input
                type="text"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Student Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Emergency Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Default Trusted Check-In Contact
              </label>
              <select
                value={defaultContactId}
                onChange={(e) => setDefaultContactId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400"
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.id} className="bg-navy-900 text-white">
                    {c.name} ({c.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-navy-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 shadow-lg shadow-violet-950/40 flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Preferences</span>
            </button>
          </div>
        </form>
      </div>

      {/* Safety & Demo Environment Settings */}
      <div className="rounded-2xl border border-navy-750 bg-navy-900/80 p-6 sm:p-8 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-teal-400" />
          Safety Preferences & Visual Theme
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-navy-850 border border-navy-800">
            <div>
              <span className="text-sm font-semibold text-white block">Visual Theme</span>
              <span className="text-xs text-slate-400">Optimized high-contrast dark navy & deep purple palette</span>
            </div>
            <span className="px-3 py-1 rounded-lg bg-navy-800 text-xs text-teal-300 border border-navy-700 font-semibold">
              Deep Navy / Purple
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-navy-850 border border-navy-800">
            <div>
              <span className="text-sm font-semibold text-white block">Local Storage Persistence</span>
              <span className="text-xs text-slate-400">All sessions and custom contacts saved to browser storage</span>
            </div>
            <span className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
              Active
            </span>
          </div>
        </div>

        {/* Reset Demo Data Action */}
        <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-rose-300">Reset Demo Data</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Restore initial placeholder contacts, default profile, and reset all active timers.
            </p>
          </div>
          <button
            onClick={() => setConfirmResetOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Reset */}
      <ConfirmationDialog
        isOpen={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        onConfirm={resetDemoData}
        title="Reset All SafeStride Data"
        message="Are you sure you want to restore SafeStride to factory demo defaults? Your custom contacts, check-ins, and activity logs will be reset."
        confirmText="Yes, Reset All Data"
        danger={true}
      />
    </div>
  );
};

