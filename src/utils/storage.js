/**
 * Local Storage helper utilities for SafeStride
 */

const STORAGE_KEYS = {
  USER_PROFILE: 'safestride_user_profile',
  CONTACTS: 'safestride_contacts',
  ACTIVE_CHECKIN: 'safestride_active_checkin',
  ACTIVE_JOURNEY: 'safestride_active_journey',
  HISTORY: 'safestride_history',
  FAVORITE_TIPS: 'safestride_favorite_tips',
  SETTINGS: 'safestride_settings',
};

export const safeGetItem = (key, fallbackValue) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackValue;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallbackValue;
  }
};

export const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

export const safeRemoveItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

export { STORAGE_KEYS };

