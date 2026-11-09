import React, { useState } from 'react';
import { Phone, Edit3, Trash2, Shield, HeartPulse, Home, User, CheckCircle2 } from 'lucide-react';
import { ConfirmationDialog } from './ConfirmationDialog';

export const EmergencyContactCard = ({ contact, onEdit, onDelete, isDefault, onSetDefault }) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Campus Security':
        return Shield;
      case 'Medical Center':
        return HeartPulse;
      case 'Hostel Administration':
        return Home;
      default:
        return User;
    }
  };

  const Icon = getCategoryIcon(contact.category);
  const isEmergency = contact.isEmergencyService;

  return (
    <div className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
      isEmergency 
        ? 'border-rose-500/30 bg-gradient-to-b from-navy-900 to-rose-950/20 hover:border-rose-500/50' 
        : 'border-navy-750 bg-navy-900/80 hover:border-navy-650'
    } shadow-lg shadow-navy-950/50`}>
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              isEmergency 
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' 
                : 'bg-violet-500/15 text-violet-400 border border-violet-500/20'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isEmergency ? 'bg-rose-500/20 text-rose-300' : 'bg-navy-800 text-teal-400'
                }`}>
                  {contact.category}
                </span>
                {isDefault && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                    Default
                  </span>
                )}
              </div>
              <h4 className="text-base font-bold text-white mt-1 leading-snug">
                {contact.name}
              </h4>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {contact.description}
        </p>

        {/* Phone number display */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950/80 border border-navy-800 mb-4">
          <span className="text-xs text-slate-400">Dispatch / Contact:</span>
          <span className="text-sm font-mono font-bold text-teal-300">{contact.phone}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-navy-800 flex items-center justify-between gap-2">
        <a
          href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            isEmergency
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950/40'
              : 'bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 text-white shadow-md shadow-navy-950/40'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Dispatch</span>
        </a>

        {!isEmergency && onEdit && (
          <button
            onClick={() => onEdit(contact)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 border border-navy-750 transition-colors"
            title="Edit contact details"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        )}

        {!isEmergency && onDelete && (
          <button
            onClick={() => setConfirmDeleteOpen(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-navy-750 transition-colors"
            title="Delete contact"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <ConfirmationDialog
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={() => onDelete(contact.id)}
        title="Delete Emergency Contact"
        message={`Are you sure you want to remove ${contact.name} from your trusted emergency contacts list?`}
        confirmText="Delete Contact"
        danger={true}
      />
    </div>
  );
};

