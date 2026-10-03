import { Artist, Stage, TicketPass, BeyondMusicFeature } from './types';

export const FESTIVAL_INFO = {
  name: 'BRING BACK HOUSE MUSIC FESTIVAL 2025',
  shortName: 'BBHM FEST',
  dates: 'AUG 22-24, 2025 • CHICAGO',
  location: 'CHICAGO LAKESHORE PARK, CHICAGO, IL',
  tagline: 'FOUR-ON-THE-FLOOR EUPHORIA • THREE DAYS BY LAKE MICHIGAN',
  edition: '2025 EDITION',
  description:
    'The definitive open-air pilgrimage dedicated to tactile rhythms, heavyweight bassline therapy, and cloud-soft foam floor acoustics.',
  heroImageUrl:
    'https://lh3.googleusercontent.com/aida/AEtjO1X3zUntTZ7ZP_1Tggimivk9sFvP3fUXd7Kh0-xL3IlI2cPX-w4BlBQbV8c6DPf8Yi7TlM0XMO52YktggE1rE6p5KlGSPd5AP6-JGwgUx3OE4sR2bKV4hN2h9pHO4o6eLN2hfQhIzMLDmsFt3FrvvlmXv7Nm2YakVMQYd3OZMnYpNlva1WVGFF5ZlmnNFoJo8VBuclTbOYK919sEpXHx3i2cKwr0Pt1_ITJ6P9pH49YceNAuU3z-ridrlNoN',
  logoUrl:
    'https://lh3.googleusercontent.com/aida/AEtjO1XHdfCVLcyO5m2QXRAAFGPtS5BphR6djXcD0_M6qT-XFQ_Fm_E4VO26cLb31XnXG2h0QI1AjqvxbPJvfdiYYCkZOoYuVoSCweWCpplVD3Q_YOFi57zMiWeSXHl8KoMGdufToPpNWoFhI_6O1aA7ho2pFWMOciqwtse4e8qbqPGiJGZZ3TrkDbi7YP42Uu8L9Wl1Tfls_6JDJdCiy2LHpr1IEXe2XqZaW3OQWwE1L_AP0iaXt8-34ZR7nWg',
  coordinates: 'GPS: 41.8848° N, 87.6666° W',
};

export const DAY_FILTERS: { label: string; value: import('./types').FestivalDayFilter }[] = [
  { label: 'All Days', value: 'all' },
  { label: 'Fri Aug 22', value: 'friday' },
  { label: 'Sat Aug 23', value: 'saturday' },
  { label: 'Sun Aug 24', value: 'sunday' },
];

export const GENRE_FILTERS: { label: string; value: import('./types').Genre }[] = [
  { label: 'ALL ARTISTS', value: 'all' },
  { label: 'DEEP HOUSE', value: 'deep' },
  { label: 'CHICAGO CLASSIC', value: 'chicago' },
  { label: 'DISCO & SOUL', value: 'disco' },
  { label: 'ACID & TECH', value: 'acid' },
];

export const HEADLINERS: Artist[] = [
  {
    id: '1',
    name: 'KERRI CHANDLER',
    genre: 'deep',
    day: 'friday',
    badge: 'FRI HEADLINER',
    badgeColorKey: 'primary',
    stage: 'THE WAREHOUSE',
    timeRange: '11:30 PM - 02:00 AM',
    specialTag: 'LIVE REEL-TO-REEL SET',
    tier: 'headliner',
    description:
      'Deep soulful masterclass with customized live sub-bass resonators and unreleased dubplates.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwqugOkPLLBvFqWRTm3h0M9lK0onTpOaZOVKzSyQ7QeKxSjp_shvRNdqRqWgE0n4zfj-jZfA4j-Mrcly3KBLNg-wG6sJ_MBZQHikk0Qi5rDi3SewVyHcFFeFqOqXABEjsgZLsWyUJonedKWm8mh4V82ss3dtiXwKNS50-yhlGHe1y1Ab4oQPNz-4dg66e_tVRSevHOBCo9RfxoNUy6sk12jIGYpI2pIh1r3NBAPzU9oiHsPM33_QCmbw',
  },
  {
    id: '2',
    name: 'HONEY DIJON',
    genre: 'chicago',
    day: 'saturday',
    badge: 'SAT HEADLINER',
    badgeColorKey: 'secondary',
    stage: 'SUNSET COVE',
    timeRange: '09:00 PM - 11:30 PM',
    specialTag: 'SUNSET SERENADE',
    tier: 'headliner',
    description:
      'Kinetic house power, unapologetic vocal anthems, and pure Chicago warehouse groove authority.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEgtRMbhwOgTzg2wox0JpwLzN13zaBWEhnPuL7LLHbvk6FFVGA2DuzB0B06fsBPQcD1nqijn8xr3lCzurQ5DCle_ZzJieXoDbP3R-NU8-HaWrQiuCEwmX6SB36501KKMxiRhnx5sypX16O6OXW2HkAKu-htKu_svGHwC6FYpSgR7cnCwt1Ug2EV5fL4qxHZBMT4Oz7jrrhy5iegI6sk1_9hMtOdrdyolg9O2-_egBiMuP0iFDcRQHppg',
  },
  {
    id: '3',
    name: 'THE BLESSED MADONNA',
    genre: 'disco',
    day: 'sunday',
    badge: 'SUN FINALE',
    badgeColorKey: 'tertiary',
    stage: 'THE WAREHOUSE',
    timeRange: '09:30 PM - 12:30 AM',
    specialTag: 'EXTENDED 3-HR CLOSING',
    tier: 'headliner',
    description:
      'Ecstatic communal joy combining classic piano euphoria, modern stompers, and gospel warmth.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdTeq37VIX3_Y2bzV1Ck6eJqxnRqW6dxKFjxUESaxRJkhjhrl-MHOeLaszWqlcU22ubzXucKz0YxeITqpKG2QWPmJLCuiZnpKuAEKDUo1fmYhFResfYjmrZThK5vmd0B-2wqJH9jkQ1APXUHDF45OajZmQ5iuZ1-A2ASUb2KIa-xC3DvU6gzITXE9k7Ph2pw0FRRB1symWoTNa--_Ku14r-rqi7YJp_vOoZo7LbEdvEnfbFU-5ww-ngw',
  },
  {
    id: '4',
    name: 'GREEN VELVET',
    genre: 'acid',
    day: 'friday',
    badge: 'CHICAGO ICON',
    badgeColorKey: 'primary',
    stage: 'THE BASEMENT',
    timeRange: '10:00 PM - 12:00 AM',
    specialTag: 'RELIEF DUB SPECIAL',
    tier: 'headliner',
    description:
      'Electrifying techno-house fusion with live vocal mic antics and relentless 909 kick rhythms.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFEXP6YVCARbHkVzMomPMAACmZj6wmsNKjBeCb2DLmjQGhdcyZrAmktVEMLWaNwMuZi7WpViPJ4r_Ydq09CaxIbZ98x0-dwYWKterVoFt3F857Gfo2MzfpP0PtAlvWUnV6w43v3Tmcn0Lv-8ZXOOSWqtQ09_sjwu-J0xMODo9uZqvkkFNfF3vJNTzoHkUkrwdnKA6wlcNzk2c_pqKxBVAr200_nAMaccTmCvS3zbdMxm7zZDdqui5qvg',
  },
  {
    id: '5',
    name: 'MOODYMANN',
    genre: 'deep',
    day: 'saturday',
    badge: 'DETROIT SOUL',
    badgeColorKey: 'secondary',
    stage: 'NEON GROOVE DOME',
    timeRange: '08:00 PM - 10:30 PM',
    specialTag: 'ALL VINYL SELECTION',
    tier: 'headliner',
    description:
      'Unfiltered Detroit grit, hypnotic rhodes samples, and deep dusty groove poetry.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjcAytu4ATEun8b_r1T4MOd69aol9GEIT39ThRj63DWeKyvtUb1dBIJKcuGTtqVYFVsR_0vS4cQjVUtHPsewAk3twZ8LB0SwRwUsKHLczYOxeQN2KM7u06xo8GfQsT9pcQKof8bYPJHoPDzcRUFUdds_yNLvfj3LKY-xxk3q-m_yjQHBmNTlJ7PH1_JNVjj8BJkBkFlpgGzYArKMZL0gUA2T9lfiK6UrSalVzjshQA3nossYwG7Si7-A',
  },
  {
    id: '6',
    name: 'DERRICK CARTER',
    genre: 'chicago',
    day: 'sunday',
    badge: 'HOMETOWN HERO',
    badgeColorKey: 'tertiary',
    stage: 'SUNSET COVE',
    timeRange: '06:00 PM - 08:30 PM',
    specialTag: 'BOOMTY BOOM SET',
    tier: 'headliner',
    description:
      'Fast-fingered jackin\' perfection with surgical cuts, disco acapellas, and heavyweight boom.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBe0sp3Tf1iHiFe59kw0go35C82zEpiBOvUNRnYnYSPFkOB7ehU7JyISHP49JsFSbYtbRHMa_pd1jPnS93J4Y1w5L26BQGKm9xPtQM8oOQpjmVU99KdSaLr0etNmATDCsWRDrEWd6PTfSs6LgParf7o6NvhfebO8cEVbCa2pyyOOEf9VT5g7I1DcH9f3G9eTZnZ5Nh-TOZbFv6CZ-Cc_OxHEtQhMsD7SJ1cX0KWjlKqyHYiiMgXhcn-jg',
  },
];

export const FEATURED_ARTISTS: Artist[] = HEADLINERS;

export const UNDERGROUND_SELECTORS = [
  'Byron The Aquarius',
  'Chaos In The CBD',
  'DJ Holographic',
  'Dan Shake',
  'Folamour',
  'Horse Meat Disco',
  'Jayda G',
  'Mike Dunn',
  'Natasha Diggs',
  'Octo Octa',
  'Prosumer',
  'Ron Trent',
  'DJ Heather',
  'Colette',
  'Gene Farris',
  'Josh Wink',
  'Channel Tres',
  'Salute',
  'TSHA',
  'Kerri Chandler',
  'Honey Dijon',
  'Moodymann',
  'Derrick Carter',
  'Green Velvet',
];

export const STAGES: Stage[] = [
  {
    id: 'warehouse',
    num: 'STAGE 01',
    name: 'THE WAREHOUSE',
    capacity: '8,500',
    soundRig: 'Funktion-One Vero VX',
    reboundFoam: '80mm',
    peakBpm: '128',
    featureSpec: 'Atmospheric Climate Controlled',
    tagline: 'A cathedral of brick, steel trussing, and continuous laser arrays mimicking Chicago’s seminal 1980s underground spaces.',
    badge: 'STAGE 01 • CAPACITY: 8,500',
    description: 'Cathedral of brick, steel trussing, and continuous laser arrays mimicking Chicago’s seminal 1980s underground spaces.',
    vibeSignature: 'Raw Chicago, Acid, Industrial Soul',
    highlightLabel: 'PEAK SPL:',
    highlightValue: '124 dB @ 32Hz Clean Sub Bass',
    iconName: 'verified',
    accentColor: '#446900',
  },
  {
    id: 'sunset-cove',
    num: 'STAGE 02',
    name: 'SUNSET COVE',
    capacity: '6,000',
    soundRig: 'L-Acoustics K2',
    reboundFoam: 'Boardwalk Foam Pad',
    peakBpm: 'Golden Hour Special',
    featureSpec: 'Lake Breeze Circulation',
    tagline: 'Directly on the water’s edge. Watch the Chicago skyline turn violet and orange while deep vocal cuts wash over the lake.',
    badge: 'STAGE 02 • CAPACITY: 6,000',
    description: 'Directly on the water’s edge. Watch the Chicago skyline turn violet and orange while deep vocal cuts wash over the lake.',
    vibeSignature: 'Deep Vocal, Melodic House & Balearic',
    highlightLabel: 'SPECIAL EFFECT:',
    highlightValue: 'Golden Hour Skyline Laser Mirroring',
    iconName: 'water',
    accentColor: '#fe6a34',
  },
  {
    id: 'neon-groove',
    num: 'STAGE 03',
    name: 'NEON GROOVE DOME',
    capacity: '4,500',
    soundRig: 'Danley Sound Labs',
    reboundFoam: 'High-Grip Tactile Sole',
    peakBpm: '360° Visual Projections',
    featureSpec: 'Acoustic Spatial Audio',
    tagline: 'A 360-degree inflatable geodesic dome with mirror balls and multi-layered disco lighting. Pure soulful uplifting selections.',
    badge: 'STAGE 03 • CAPACITY: 4,500',
    description: 'A 360-degree inflatable geodesic dome with mirror balls and multi-layered disco lighting. Pure soulful uplifting selections.',
    vibeSignature: 'Disco Re-edits, Nu-Disco & Soul Euphoria',
    highlightLabel: 'INSTALLATION:',
    highlightValue: 'Center-hung 4-meter Mirror Ball Cluster',
    iconName: 'blur_on',
    accentColor: '#b4136d',
  },
  {
    id: 'the-basement',
    num: 'STAGE 04',
    name: 'THE BASEMENT',
    capacity: '2,500',
    soundRig: 'Void Acoustics Incubus',
    reboundFoam: 'Ultra-Dense Sub Base',
    peakBpm: 'No Phone Policy',
    featureSpec: 'Pure Analog Focus',
    tagline: 'Subterranean, dark, strobe-heavy, and unforgiving. Home of hard-jacking 303 acid lines, raw ghetto-house, and relentless kicks.',
    badge: 'STAGE 04 • CAPACITY: 2,500',
    description: 'Subterranean, dark, strobe-heavy, and unforgiving. Home of hard-jacking 303 acid lines, raw ghetto-house, and relentless kicks.',
    vibeSignature: 'No Phone Cameras / Analog Only',
    highlightLabel: 'LINEUP:',
    highlightValue: 'Secret unannounced unlisted sets',
    iconName: 'visibility_off',
    accentColor: '#446900',
  },
];

export const PASSES: TicketPass[] = [
  {
    id: 'ga',
    title: '3-DAY GA',
    price: '$189',
    priceNote: '/ + tax & fees',
    badgeText: 'LIMITED REMAINING',
    badgeColorKey: 'tertiary',
    tierTag: 'TIER 1 RELEASE',
    subtitle: 'Full three-day access to all 4 stages, water refill stations, and open foam relaxation zones.',
    features: [
      'All 4 Dance Arenas (Fri-Sun)',
      'Complimentary Foam Slider Kit',
      'RFID Smart Entry Wristband',
      'Complimentary Electrolyte Refill',
    ],
    buttonText: 'SELECT GA PASS',
    buttonVariant: 'outline',
  },
  {
    id: 'vip',
    title: 'VIP GROOVE',
    price: '$349',
    priceNote: '/ + tax & fees',
    badgeText: 'SELLING FAST',
    badgeColorKey: 'secondary',
    tierTag: 'ELEVATED EXPERIENCE',
    subtitle: 'Express fast-track lanes, elevated side-stage viewing decks, air-conditioned restroom pods, and exclusive bars.',
    isPopular: true,
    features: [
      'All GA Inclusions',
      'Elevated Side-Stage Viewing Decks',
      'Express Dedicated Entry Gate',
      'Premium Air-Conditioned Restrooms',
      'Exclusive VIP Foam Bar Access',
    ],
    buttonText: 'GRAB VIP GROOVE',
    buttonVariant: 'secondary',
  },
  {
    id: 'backstage',
    title: 'BACKSTAGE LOUNGE',
    price: '$699',
    priceNote: '/ + tax & fees',
    badgeText: 'STRICTLY 150 PASSES',
    badgeColorKey: 'tertiary',
    tierTag: 'ULTRA SANCTUARY',
    subtitle: 'Behind-the-booth viewing lounge, artist village access, open bar hospitality, and private massage therapists.',
    features: [
      'All VIP Groove Inclusions',
      'Behind-The-Decks Artist Lounge',
      'Complimentary All-Weekend Open Bar',
      'Official Limited Drop 01 Merch Pack',
      'Dedicated Festival Concierge',
    ],
    buttonText: 'REQUEST BACKSTAGE',
    buttonVariant: 'outline',
  },
];

export const BEYOND_MUSIC_FEATURES: BeyondMusicFeature[] = [
  {
    id: 'vinyl',
    category: 'VINYL FAIR',
    categoryColorKey: 'secondary',
    title: 'CRATE DIGGERS ALLEY',
    description:
      'Over 20 independent record stores from Chicago, Detroit, and New York selling rare pressings and white labels.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwjsd6w3K0kYgVURfq2-ZQ2G-T5JopPz7YH2UJMC3RAVusB-nmHcqC9Dq1a8gwLJYg_rLIV_7UpwtcfNDAjEXgBrxeZ5woy3TmiD47W5TOUhRgvckyFIehMPc60mfeOP4OTCTVg6I50CPLw4CePjeb261lbNOE2lgw1SowKQxIH0oMCE_q_R_Ta3nEhkc5MGnUaRwqM-Eut85WaCKeI-TeyvQCWdxsjAU5n_eYeT9iFIOmsgBEhxe21Q',
  },
  {
    id: 'culinary',
    category: 'CULINARY',
    categoryColorKey: 'primary',
    title: 'TASTE OF CHICAGO',
    description:
      'Beloved local culinary pop-ups: deep dish slices, plant-based soul food, jerk chicken, and cold-pressed juices.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRB5KDp5UJQ4Mezs9TKEVnWvFJXnzOhscIu4jfen5hyFCduRrdv7mhca7H6aypDKHr4Oyiv6yN-En-QKNFuInGpNNspsNc8_sQKOMWT00F14x3kGIqttdi6PyQpIfNiy-Z3MAiI_FlTxsM8Ovedcugcu2UrSFC4RV8l-ZnOIPk9KinKvckDQwkj95CS5DZdR-LmFMhcRLHi5w2ItgT8LwgWgr76Ey2AppnaZBDxKZlKYyTUYvzoMibxg',
  },
  {
    id: 'sanctuary',
    category: 'WELLNESS',
    categoryColorKey: 'tertiary',
    title: 'AMBIENT FOAM OASIS',
    description:
      'Quiet sanctuary furnished with zero-gravity foam furniture, gentle binaural beat audio, and ice plunge pods.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8s3CMGJ4p1c_Q9V94pCrc0y6IvoMIsgnFg8iAHRmbYRSDb9PZCKT7ICgFRwq9s5zlueLzl7zShTODwRDIp6Ovj8KiTbrsRT4WFyLgzg_p4Iq2qVFkEW6mR35hucvcDpJPza9t1P-P6SHhpmd-jeGPGWomborijuwQut7ZX6SDC62gZcKMxV1M5s31Iaed-lrF-z01jbF7G3x7B3yI_5Y7qiRjgH2v8pY2pelzj2O-wqxEbhd4Kju9yw',
  },
];
