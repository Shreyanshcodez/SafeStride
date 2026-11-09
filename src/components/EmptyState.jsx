import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = ShieldAlert,
  title = 'No records found',
  description = 'There are no active records to display at this moment.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-navy-750 rounded-2xl bg-navy-900/40 my-4">
      <div className="p-3.5 rounded-2xl bg-navy-800/80 border border-navy-700 text-violet-400 mb-3 shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-semibold text-slate-200 mb-1">{title}</h4>
      <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold tracking-wide uppercase text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-xl transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

