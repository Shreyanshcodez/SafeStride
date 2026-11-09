import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Modal } from './Modal';

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start gap-3.5">
          <div className={`p-2.5 rounded-xl ${danger ? 'bg-rose-500/10 text-rose-400' : 'bg-violet-500/10 text-violet-400'}`}>
            <AlertCircle className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-300 leading-relaxed pt-1">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-navy-800 hover:bg-navy-700 rounded-xl transition-colors border border-navy-700"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              danger
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30'
                : 'bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 text-white shadow-lg shadow-violet-900/30'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

