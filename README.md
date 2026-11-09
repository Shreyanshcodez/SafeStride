# SafeStride — Smart Campus Student Safety Companion

SafeStride is a modern, responsive, frontend-only safety web application designed for university campuses. It empowers students with intuitive arrival check-ins, simulated route tracking, speed-dial emergency directories, and comprehensive campus safety protocols.

Built with **React**, **Vite**, **Tailwind CSS**, **React Router DOM**, **Lucide Icons**, and **Leaflet / OpenStreetMap**.

---

## 🚀 Features

1. **Polished Landing Page**
   - High-impact hero section with primary action paths (`Get Started`, `Explore Features`).
   - Feature highlights, workflow breakdown, and emergency preparedness overview.

2. **Safety Dashboard**
   - Live safety status overview card with real-time state badges.
   - Quick action launchers for Check-In, Journey Tracker, SOS Contacts, and Safety Guide.
   - Interactive widgets for active Check-In and active Journey sessions.
   - Rotating campus safety tip carousel.
   - Speed dial emergency hotline shortcut.
   - Recent safety activity log.

3. **Safety Check-In System**
   - Configure destinations across campus landmarks or custom locations.
   - Set expected arrival countdown timers.
   - Select trusted contacts from saved records.
   - Real-time countdown clock and overdue warning indicator.
   - "I Have Arrived Safely" one-click confirmation and cancellation dialogs.
   - Automatically writes to local history.

4. **Journey Tracker (Simulated)**
   - Plan routes between campus waypoints.
   - Choose travel mode: Walking, Cycling, or Campus Shuttle.
   - OpenStreetMap interactive view powered by Leaflet with waypoint markers and illuminated route polyline.
   - Animated journey progress bar with manual step-advancement for demo presentations.
   - Clearly labeled as simulated without faking GPS.

5. **Emergency Contacts Management**
   - Verified demo contacts: Campus Security Control Room, Campus Medical Center, Hostel Warden, and Trusted Friend.
   - Add, edit, and delete custom emergency contacts.
   - Native `tel:` calling integration for compatible devices.
   - Confirmation modals for contact deletions.

6. **Campus Safety Guide**
   - Curated protocols across 6 categories: Night Safety, Hostel Safety, Travel Safety, Emergency Preparedness, Digital Safety, and Personal Awareness.
   - Search filter and category pills.
   - Expandable action steps for each guide topic.
   - Bookmark / favorite tips persisted in local storage.

7. **Safety Activity History**
   - Chronological log of completed and cancelled check-ins and journeys.
   - Filter by activity type (`Check-In`, `Journey`, or `All`).
   - Search by destination or route.
   - Export audit log as JSON.
   - Clear history with confirmation modal.

8. **Settings & Profile**
   - Edit student name, ID number, hostel residence, phone number, and default trusted contact.
   - Toggle and review application preferences.
   - One-click "Reset Demo Data" option.

9. **Robust Local Storage Architecture**
   - Safe JSON serialization & deserialization with fallback defaults.
   - State persists across page refreshes.
   - Demo reset utility to restore initial mock data.

---

## 🛠️ Tech Stack

- **React 18**
- **Vite 6**
- **Tailwind CSS 3** (Custom Dark Navy `#0c1120`, Deep Purple `#120726`, Violet `#8b5cf6`, and Teal `#14b8a6` theme)
- **React Router DOM 6** (`HashRouter` for zero-configuration static hosting and Vercel compatibility)
- **Lucide React**
- **Leaflet & OpenStreetMap**
- **HTML5 LocalStorage API**

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

The production output will be generated inside the `dist/` directory, ready to deploy to Vercel, Netlify, or GitHub Pages.

---

## 🛡️ Prototype Disclosure
SafeStride is a frontend demonstration prototype for collegiate showcases. In real-world university deployments, automated dispatch notifications and external SMS alerts require dedicated backend servers and authorized emergency integrations.

