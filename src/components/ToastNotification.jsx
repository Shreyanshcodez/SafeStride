import React from 'react';
import { useSafety } from '../context/SafetyContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastNotification = () => {
  const { toasts, removeToast } = useSafety();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgStyle = 'bg-navy-850 border-navy-700 text-slate-100';
        let Icon = Info;
        let iconColor = 'text-teal-400';

        if (toast.type === 'success') {
          bgStyle = 'bg-navy-850 border-teal-500/40 text-slate-100';
          Icon = CheckCircle2;
          iconColor = 'text-teal-400';
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-navy-850 border-amber-500/40 text-slate-100';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'error') {
          bgStyle = 'bg-navy-850 border-rose-500/40 text-slate-100';
          Icon = AlertTriangle;
          iconColor = 'text-rose-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${bgStyle}`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

