import React, { useState } from 'react';
import { 
  PhoneCall, 
  Plus, 
  ShieldAlert, 
  UserPlus, 
  Search, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { EmergencyContactCard } from '../components/EmergencyContactCard';
import { Modal } from '../components/Modal';

export const EmergencyContactsPage = () => {
  const { contacts, addContact, updateContact, deleteContact, userProfile, setUserProfile } = useSafety();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Trusted Contact');
  const [formPhone, setFormPhone] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingContact(null);
    setFormName('');
    setFormCategory('Trusted Contact');
    setFormPhone('');
    setFormDesc('');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setFormName(contact.name);
    setFormCategory(contact.category);
    setFormPhone(contact.phone);
    setFormDesc(contact.description);
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      setFormError('Please provide both a contact name and valid phone number.');
      return;
    }

    if (editingContact) {
      updateContact({
        ...editingContact,
        name: formName.trim(),
        category: formCategory,
        phone: formPhone.trim(),
        description: formDesc.trim() || 'Custom added campus contact.'
      });
    } else {
      addContact({
        name: formName.trim(),
        category: formCategory,
        phone: formPhone.trim(),
        description: formDesc.trim() || 'Custom added campus contact.'
      });
    }

    setModalOpen(false);
  };

  const handleSetDefault = (id) => {
    setUserProfile(prev => ({ ...prev, defaultContactId: id }));
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <PhoneCall className="w-5 h-5 text-rose-400" />
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Emergency Directory & Contacts
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Speed dial verified campus emergency dispatchers, security stations, and personal trusted buddies.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 shadow-lg shadow-violet-950/40 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Custom Contact</span>
        </button>
      </div>

      {/* Realistic Calling Notice */}
      <div className="p-4 rounded-2xl bg-navy-900 border border-navy-750 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
        <div className="leading-relaxed">
          <strong className="text-white font-semibold block mb-0.5">Telephony Protocol Notice:</strong>
          Tapping "Call Dispatch" initiates a native telephone prompt via standard <code className="text-teal-300 bg-navy-800 px-1 py-0.5 rounded">tel:</code> links using your operating system's default call handler. On computers without cellular capabilities, standard VoIP / FaceTime / Skype integrations will open.
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, department, or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900 border border-navy-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
        />
      </div>

      {/* Contacts Grid */}
      {filteredContacts.length === 0 ? (
        <div className="text-center p-12 border border-dashed border-navy-800 rounded-2xl bg-navy-900/50">
          <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-white mb-1">No contacts found</h3>
          <p className="text-xs text-slate-400 mb-4">No contact matched your search term "{searchQuery}".</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-teal-400 hover:underline font-medium"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <EmergencyContactCard
              key={contact.id}
              contact={contact}
              onEdit={openEditModal}
              onDelete={deleteContact}
              isDefault={userProfile?.defaultContactId === contact.id}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Contact Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingContact ? 'Edit Emergency Contact' : 'Add New Trusted Contact'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
              {formError}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Contact Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jordan Blake (Lab Partner)"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Contact Category
            </label>
            <select
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400"
            >
              <option value="Trusted Contact">Trusted Friend / Roommate</option>
              <option value="Campus Security">Campus Safety Patrol</option>
              <option value="Hostel Administration">Hostel Warden / Staff</option>
              <option value="Family">Family Member</option>
              <option value="Medical Center">Health Clinic / Paramedic</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +1 (555) 019-2834"
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Notes or Relationship Description
            </label>
            <textarea
              rows="3"
              placeholder="e.g. Available after 10 PM in Dorm Hall C"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-850 border border-navy-700 text-white text-sm focus:outline-none focus:border-teal-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-navy-800 hover:bg-navy-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-teal-500 hover:from-violet-500 hover:to-teal-400 shadow-md"
            >
              {editingContact ? 'Save Changes' : 'Create Contact'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

