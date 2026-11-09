import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Search, 
  Filter, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  XCircle, 
  Download,
  Calendar
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { EmptyState } from '../components/EmptyState';

export const SafetyHistoryPage = () => {
  const { history, clearHistory } = useSafety();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, check-in, journey
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const filteredHistory = history.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = 
      item.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const exportHistoryJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `safestride_history_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <History className="w-5 h-5 text-violet-400" />
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Safety Activity History
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Audit logs of your completed check-in arrivals, simulated journeys, and cancelled sessions.
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={exportHistoryJSON}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-navy-850 hover:bg-navy-800 border border-navy-750 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Log</span>
            </button>
            <button
              onClick={() => setConfirmClearOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by destination or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900 border border-navy-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 bg-navy-900 p-1 rounded-xl border border-navy-800 self-start sm:self-auto">
          {['all', 'check-in', 'journey'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterType === type
                  ? 'bg-gradient-to-r from-violet-600 to-teal-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type === 'all' ? 'All Activities' : type}
            </button>
          ))}
        </div>
      </div>

      {/* History Log Table */}
      {filteredHistory.length === 0 ? (
        <EmptyState
          title="No history records found"
          description={
            history.length === 0
              ? 'Complete a check-in or journey session to view your log entries here.'
              : 'No records matched your search filters.'
          }
        />
      ) : (
        <div className="rounded-2xl border border-navy-800 bg-navy-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-navy-850/80 border-b border-navy-800">
                <tr>
                  <th className="py-3 px-4">Activity Type</th>
                  <th className="py-3 px-4">Route / Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Recorded Duration</th>
                  <th className="py-3 px-4">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-navy-850/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${
                        item.type === 'check-in' 
                          ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30' 
                          : 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                      }`}>
                        {item.type === 'check-in' ? <Clock className="w-3 h-3" /> : <Navigation className="w-3 h-3" />}
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">
                        {item.destination}
                      </div>
                      {item.origin && (
                        <div className="text-[11px] text-slate-500">
                          From: {item.origin}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
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
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {item.durationMinutes ? `${item.durationMinutes} mins` : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {new Date(item.timestamp).toLocaleString(undefined, {
                        year: 'numeric',
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
        </div>
      )}

      {/* Confirmation Dialog for Clear History */}
      <ConfirmationDialog
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        onConfirm={clearHistory}
        title="Clear All Safety History"
        message="Are you sure you want to permanently clear all completed and cancelled safety records? This action cannot be undone."
        confirmText="Yes, Clear History"
        danger={true}
      />
    </div>
  );
};

