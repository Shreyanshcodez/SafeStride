import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { SafetyCheckInPage } from './pages/SafetyCheckInPage';
import { JourneyTrackerPage } from './pages/JourneyTrackerPage';
import { EmergencyContactsPage } from './pages/EmergencyContactsPage';
import { CampusSafetyGuidePage } from './pages/CampusSafetyGuidePage';
import { SafetyHistoryPage } from './pages/SafetyHistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppLayout } from './components/AppLayout';

export default function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Main Authenticated Dashboard Shell */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="check-in" element={<SafetyCheckInPage />} />
        <Route path="journey" element={<JourneyTrackerPage />} />
        <Route path="contacts" element={<EmergencyContactsPage />} />
        <Route path="guide" element={<CampusSafetyGuidePage />} />
        <Route path="history" element={<SafetyHistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

