import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeGetItem, safeSetItem, safeRemoveItem, STORAGE_KEYS } from '../utils/storage';
import { INITIAL_CONTACTS, INITIAL_USER_PROFILE } from '../data/mockData';

const SafetyContext = createContext(null);

export const SafetyProvider = ({ children }) => {
  // User Profile & Settings
  const [userProfile, setUserProfile] = useState(() => 
    safeGetItem(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE)
  );

  // Contacts
  const [contacts, setContacts] = useState(() => 
    safeGetItem(STORAGE_KEYS.CONTACTS, INITIAL_CONTACTS)
  );

  // Active Check-In Session
  const [activeCheckIn, setActiveCheckIn] = useState(() => 
    safeGetItem(STORAGE_KEYS.ACTIVE_CHECKIN, null)
  );

  // Active Journey Session
  const [activeJourney, setActiveJourney] = useState(() => 
    safeGetItem(STORAGE_KEYS.ACTIVE_JOURNEY, null)
  );

  // History (Check-ins & Journeys)
  const [history, setHistory] = useState(() => 
    safeGetItem(STORAGE_KEYS.HISTORY, [
      {
        id: 'hist-init-1',
        type: 'check-in',
        destination: 'Central Campus Library',
        origin: 'North Hostel Quad',
        status: 'completed',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        durationMinutes: 25,
        trustedContactName: 'Alex Rivera (Roommate / Trusted Friend)'
      },
      {
        id: 'hist-init-2',
        type: 'journey',
        destination: 'North Hostel Quad',
        origin: 'Student Activity Center',
        travelMode: 'Walking',
        status: 'completed',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        durationMinutes: 18
      }
    ])
  );

  // Favorite Tips
  const [favoriteTipIds, setFavoriteTipIds] = useState(() => 
    safeGetItem(STORAGE_KEYS.FAVORITE_TIPS, ['tip-1', 'tip-5'])
  );

  // Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to local storage
  useEffect(() => {
    safeSetItem(STORAGE_KEYS.USER_PROFILE, userProfile);
  }, [userProfile]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.CONTACTS, contacts);
  }, [contacts]);

  useEffect(() => {
    if (activeCheckIn) {
      safeSetItem(STORAGE_KEYS.ACTIVE_CHECKIN, activeCheckIn);
    } else {
      safeRemoveItem(STORAGE_KEYS.ACTIVE_CHECKIN);
    }
  }, [activeCheckIn]);

  useEffect(() => {
    if (activeJourney) {
      safeSetItem(STORAGE_KEYS.ACTIVE_JOURNEY, activeJourney);
    } else {
      safeRemoveItem(STORAGE_KEYS.ACTIVE_JOURNEY);
    }
  }, [activeJourney]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.HISTORY, history);
  }, [history]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.FAVORITE_TIPS, favoriteTipIds);
  }, [favoriteTipIds]);

  // Contact actions
  const addContact = (newContact) => {
    const contact = {
      ...newContact,
      id: 'contact-' + Date.now(),
      isEmergencyService: false,
    };
    setContacts(prev => [...prev, contact]);
    addToast(`Added ${contact.name} to contacts.`, 'success');
  };

  const updateContact = (updatedContact) => {
    setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
    addToast(`Updated contact: ${updatedContact.name}`, 'info');
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    addToast('Contact removed.', 'info');
  };

  // Check-In Actions
  const startCheckIn = (details) => {
    const session = {
      id: 'chk-' + Date.now(),
      destination: details.destination,
      origin: details.origin || 'Current Location',
      targetMinutes: Number(details.targetMinutes) || 30,
      startTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (Number(details.targetMinutes) || 30) * 60000).toISOString(),
      trustedContactId: details.trustedContactId,
      trustedContactName: details.trustedContactName,
      status: 'active',
      notes: details.notes || ''
    };
    setActiveCheckIn(session);
    addToast('Safety check-in session started.', 'success');
    return session;
  };

  const completeCheckIn = () => {
    if (!activeCheckIn) return;
    const completedRecord = {
      id: 'hist-' + Date.now(),
      type: 'check-in',
      destination: activeCheckIn.destination,
      origin: activeCheckIn.origin,
      status: 'completed',
      timestamp: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round((Date.now() - new Date(activeCheckIn.startTime).getTime()) / 60000)),
      trustedContactName: activeCheckIn.trustedContactName
    };

    setHistory(prev => [completedRecord, ...prev]);
    setActiveCheckIn(null);
    addToast('Check-in marked as safely arrived!', 'success');
  };

  const cancelCheckIn = () => {
    if (!activeCheckIn) return;
    const cancelledRecord = {
      id: 'hist-' + Date.now(),
      type: 'check-in',
      destination: activeCheckIn.destination,
      origin: activeCheckIn.origin,
      status: 'cancelled',
      timestamp: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round((Date.now() - new Date(activeCheckIn.startTime).getTime()) / 60000)),
      trustedContactName: activeCheckIn.trustedContactName
    };

    setHistory(prev => [cancelledRecord, ...prev]);
    setActiveCheckIn(null);
    addToast('Check-in session cancelled.', 'warning');
  };

  // Journey Actions
  const startJourney = (details) => {
    const journey = {
      id: 'jrn-' + Date.now(),
      origin: details.origin,
      destination: details.destination,
      travelMode: details.travelMode || 'Walking',
      startTime: new Date().toISOString(),
      estimatedMinutes: Number(details.estimatedMinutes) || 20,
      status: 'in-progress',
      progressPercent: 0,
    };
    setActiveJourney(journey);
    addToast(`Journey simulation started: ${details.travelMode} to ${details.destination}`, 'success');
    return journey;
  };

  const completeJourney = () => {
    if (!activeJourney) return;
    const completedRecord = {
      id: 'hist-' + Date.now(),
      type: 'journey',
      origin: activeJourney.origin,
      destination: activeJourney.destination,
      travelMode: activeJourney.travelMode,
      status: 'completed',
      timestamp: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round((Date.now() - new Date(activeJourney.startTime).getTime()) / 60000)),
    };
    setHistory(prev => [completedRecord, ...prev]);
    setActiveJourney(null);
    addToast('Journey marked as completed!', 'success');
  };

  const cancelJourney = () => {
    if (!activeJourney) return;
    const cancelledRecord = {
      id: 'hist-' + Date.now(),
      type: 'journey',
      origin: activeJourney.origin,
      destination: activeJourney.destination,
      travelMode: activeJourney.travelMode,
      status: 'cancelled',
      timestamp: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round((Date.now() - new Date(activeJourney.startTime).getTime()) / 60000)),
    };
    setHistory(prev => [cancelledRecord, ...prev]);
    setActiveJourney(null);
    addToast('Journey simulation cancelled.', 'warning');
  };

  // Clear History
  const clearHistory = () => {
    setHistory([]);
    addToast('Safety history cleared.', 'info');
  };

  // Toggle favorite tip
  const toggleFavoriteTip = (tipId) => {
    setFavoriteTipIds(prev => {
      const exists = prev.includes(tipId);
      if (exists) {
        addToast('Tip removed from saved bookmarks.', 'info');
        return prev.filter(id => id !== tipId);
      } else {
        addToast('Tip added to saved bookmarks.', 'success');
        return [...prev, tipId];
      }
    });
  };

  // Reset all demo data
  const resetDemoData = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    setContacts(INITIAL_CONTACTS);
    setActiveCheckIn(null);
    setActiveJourney(null);
    setHistory([]);
    setFavoriteTipIds(['tip-1', 'tip-5']);
    safeRemoveItem(STORAGE_KEYS.USER_PROFILE);
    safeRemoveItem(STORAGE_KEYS.CONTACTS);
    safeRemoveItem(STORAGE_KEYS.ACTIVE_CHECKIN);
    safeRemoveItem(STORAGE_KEYS.ACTIVE_JOURNEY);
    safeRemoveItem(STORAGE_KEYS.HISTORY);
    safeRemoveItem(STORAGE_KEYS.FAVORITE_TIPS);
    addToast('All demo data has been reset to defaults.', 'info');
  };

  return (
    <SafetyContext.Provider
      value={{
        userProfile,
        setUserProfile,
        contacts,
        addContact,
        updateContact,
        deleteContact,
        activeCheckIn,
        startCheckIn,
        completeCheckIn,
        cancelCheckIn,
        activeJourney,
        setActiveJourney,
        startJourney,
        completeJourney,
        cancelJourney,
        history,
        clearHistory,
        favoriteTipIds,
        toggleFavoriteTip,
        toasts,
        addToast,
        removeToast,
        resetDemoData,
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (!context) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};

