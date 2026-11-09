import React, { useState } from 'react';
import { Bookmark, ChevronDown, ChevronUp, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

export const SafetyTipCard = ({ tip }) => {
  const [expanded, setExpanded] = useState(false);
  const { favoriteTipIds, toggleFavoriteTip } = useSafety();

  const isFavorited = favoriteTipIds?.includes(tip.id);

  return (
    <div className="rounded-2xl border border-navy-750 bg-navy-900/80 p-5 shadow-lg shadow-navy-950/40 hover:border-navy-650 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30">
            {tip.category}
          </span>
          <button
            onClick={() => toggleFavoriteTip(tip.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isFavorited
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-navy-800 text-slate-400 border-navy-700 hover:text-slate-200'
            }`}
            title={isFavorited ? 'Remove from saved' : 'Save bookmark'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          {tip.title}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          {tip.summary}
        </p>

        {tip.highlight && (
          <div className="p-2.5 rounded-xl bg-navy-950/70 border border-navy-800 text-xs text-teal-300 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 flex-shrink-0 text-teal-400" />
            <span className="font-medium text-[11px]">{tip.highlight}</span>
          </div>
        )}

        {/* Expandable detailed guide */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-navy-800 space-y-2.5 text-xs text-slate-300 animate-in fade-in duration-200">
            <p className="leading-relaxed text-slate-400">
              {tip.description}
            </p>
            {tip.actionableTips && tip.actionableTips.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="font-semibold text-slate-200 block text-[11px] uppercase tracking-wider">
                  Recommended Action Steps:
                </span>
                {tip.actionableTips.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{action}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 pt-2 border-t border-navy-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-teal-400 transition-colors w-full"
      >
        <span>{expanded ? 'Hide Details' : 'Read Full Protocol'}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>
  );
};

