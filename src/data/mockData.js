export const INITIAL_CONTACTS = [
  {
    id: 'contact-1',
    name: 'Campus Security Control Room',
    category: 'Campus Security',
    phone: '+1 (555) 234-5678',
    description: '24/7 Central dispatch, emergency escort dispatch, and gate surveillance.',
    isEmergencyService: true,
    isDefault: true,
  },
  {
    id: 'contact-2',
    name: 'Campus Medical & Urgent Care',
    category: 'Medical Center',
    phone: '+1 (555) 345-6789',
    description: 'Student health center, paramedic response, and emergency ambulance dispatch.',
    isEmergencyService: true,
    isDefault: false,
  },
  {
    id: 'contact-3',
    name: 'North Hall Hostel Warden',
    category: 'Hostel Administration',
    phone: '+1 (555) 456-7890',
    description: 'Residential advisor and warden for night-time hostel access, gate inquiries, and room emergencies.',
    isEmergencyService: false,
    isDefault: false,
  },
  {
    id: 'contact-4',
    name: 'Alex Rivera (Roommate / Trusted Friend)',
    category: 'Trusted Contact',
    phone: '+1 (555) 567-8901',
    description: 'Designated campus buddy for walk-along check-ins and late-night return updates.',
    isEmergencyService: false,
    isDefault: false,
  }
];

export const SAFETY_TIPS = [
  {
    id: 'tip-1',
    category: 'Night Safety',
    title: 'Stick to Designated Well-Lit Walkways',
    summary: 'Always plan your nighttime walking routes along campus Blue Light corridors and illuminated avenues.',
    description: 'Avoid shortcuts through unlit parking lots, construction zones, or wooded peripheral pathways after dusk. Campus security posts and emergency poles are concentrated along primary walkways.',
    actionableTips: [
      'Use the SafeStride Journey Tracker to map well-illuminated primary routes.',
      'Notice the locations of emergency Blue Light call boxes along your regular path.',
      'If lighting is flickering or out, report it through the campus facilities line.'
    ],
    highlight: 'Blue light emergency towers are monitored 24/7.'
  },
  {
    id: 'tip-2',
    category: 'Night Safety',
    title: 'Keep One Ear Free When Using Headphones',
    summary: 'Maintain environmental awareness by lowering volume or keeping one ear unobstructed.',
    description: 'Distraction and total acoustic isolation reduce reaction time to approaching campus shuttles, cyclists, or unfamiliar persons. Stay attuned to footsteps and vehicle sounds.',
    actionableTips: [
      'Set headphones to transparency mode or ambient sound mode.',
      'Avoid looking down continuously at social feeds while crossing intersections.',
      'Keep your phone charged and easily accessible in an outer pocket.'
    ],
    highlight: 'Peripheral situational awareness is your best proactive safety tool.'
  },
  {
    id: 'tip-3',
    category: 'Hostel Safety',
    title: 'Never Prop Open Secure Entrance Doors',
    summary: 'Ensure dormitory and hostel external security doors latch completely behind you.',
    description: 'Hostel access control systems are only effective when doors are not propped with doorstops or stones for delivery convenience. Unattended open doors allow unauthorized visitors access to dorm hallways.',
    actionableTips: [
      'Do not allow unknown individuals to tailgate into residential towers without their own student ID badge.',
      'Report broken magnetic locks or hinges to hostel administration immediately.',
      'Always lock your individual room door even when stepping out for a brief shower or laundry run.'
    ],
    highlight: 'Security is a collective dorm responsibility.'
  },
  {
    id: 'tip-4',
    category: 'Travel Safety',
    title: 'Verify Rideshare Details Before Entering',
    summary: 'Always cross-check license plate numbers, vehicle model, and driver name before opening the door.',
    description: 'When summoning rides from campus terminals or late-night study events, never get into a car until confirming that the driver explicitly states your name first.',
    actionableTips: [
      'Ask the driver "Who are you picking up?" rather than saying "Are you here for [Your Name]?"',
      'Share your trip progress via the rideshare app with your trusted contact.',
      'Sit in the back seat on the passenger side to preserve multiple exit points.'
    ],
    highlight: 'Confirm vehicle make, model, and plate match your app screen.'
  },
  {
    id: 'tip-5',
    category: 'Emergency Preparedness',
    title: 'Program Direct Campus Dispatch Numbers',
    summary: 'Direct campus dispatch lines resolve on-campus incidents faster than standard regional emergency numbers.',
    description: 'When calling national emergency numbers from a mobile phone on a large campus, city dispatchers may have to route the call to university police, creating delay. Save the campus security control room as a speed dial contact.',
    actionableTips: [
      'Save the Campus Security Control Room in your phone favorites.',
      'Know your exact campus landmark or building hall number when reporting an emergency.',
      'Note automated external defibrillator (AED) stations in your department building.'
    ],
    highlight: 'Direct campus dispatch routes responders immediately without cross-city relays.'
  },
  {
    id: 'tip-6',
    category: 'Digital Safety',
    title: 'Protect Your Live Location and Privacy',
    summary: 'Avoid publishing real-time check-ins on public social media while walking alone.',
    description: 'Broadcasting live stories or geotags indicating you are alone in a campus building or walking home broadcasts your vulnerability to broad audiences. Share updates privately with verified friends.',
    actionableTips: [
      'Post campus event photos after you have returned to your residence rather than in real time.',
      'Review app location permissions and restrict background GPS to essential utilities.',
      'Use SafeStride to simulate and log your journey privately within your browser.'
    ],
    highlight: 'Keep real-time whereabouts confined to your verified circle.'
  },
  {
    id: 'tip-7',
    category: 'Personal Awareness',
    title: 'Trust Your Intuition & Request an Escort',
    summary: 'If a situation or individual feels uncomfortable, leave immediately and request an escort.',
    description: 'Campus security services provide free student safety walking escorts 24/7 across campus, parking structures, and adjacent student residences. There is never any hesitation or shame in asking for an escort.',
    actionableTips: [
      'Never hesitate to call campus safety for a late-night walking companion.',
      'Change direction or enter an open public facility (library, dining hall) if you feel followed.',
      'Stay in populated, brightly lit common spaces.'
    ],
    highlight: 'Campus security escorts are free, confidential, and available every night.'
  }
];

export const CAMPUS_LOCATIONS = [
  'Central Campus Library',
  'Student Activity Center',
  'North Hostel Quad',
  'South Residential Complex',
  'Engineering & Science Labs',
  'Athletics & Recreation Center',
  'Campus Transit Terminal',
  'Dining Commons & Cafe',
  'Graduate Research Wing',
  'Health & Wellness Center'
];

export const INITIAL_USER_PROFILE = {
  name: 'Student Member',
  studentId: 'STU-94821',
  residence: 'North Hall, Block B',
  email: 'student@campus.edu',
  phone: '+1 (555) 987-6543',
  defaultContactId: 'contact-4',
  notificationsSound: true,
  theme: 'dark'
};

