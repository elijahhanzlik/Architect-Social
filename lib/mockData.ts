import { Activity, LocationNode } from './types';

// University College Maastricht - Zwingelput Campus
// Building dimensions based on Google Maps analysis: ~55m x 42m
// Courtyard building with central open space
// Coordinate system: Center of courtyard = (0, 0, 0), 1 unit = 1 meter
// Y-axis: 0 = ground floor, 4 = first floor, 8 = second floor

export const MAASTRICHT_CAMPUS_LOCATIONS: LocationNode[] = [
  // ===== GROUND FLOOR (Y = 0) =====
  
  // West Wing - D-Block
  {
    id: 'loc_d0_037',
    name: 'Room D0.037 - West Studio',
    floorLevel: 0,
    coordinates: { x: -22, y: 0, z: -5 },
    idealCameraView: {
      position: { x: -28, y: 6, z: -5 },
      target: { x: -22, y: 0, z: -5 },
      zoom: 2.5
    },
    capacity: 30,
    currentOccupancy: 0
  },
  {
    id: 'loc_d0_039',
    name: 'Room D0.039 - Creative Workshop',
    floorLevel: 0,
    coordinates: { x: -22, y: 0, z: 0 },
    idealCameraView: {
      position: { x: -28, y: 6, z: 0 },
      target: { x: -22, y: 0, z: 0 },
      zoom: 2.5
    },
    capacity: 25,
    currentOccupancy: 0
  },
  {
    id: 'loc_d0_041',
    name: 'Room D0.041 - West Seminar',
    floorLevel: 0,
    coordinates: { x: -22, y: 0, z: 5 },
    idealCameraView: {
      position: { x: -28, y: 6, z: 5 },
      target: { x: -22, y: 0, z: 5 },
      zoom: 2.5
    },
    capacity: 20,
    currentOccupancy: 0
  },

  // South Wing - A-Block
  {
    id: 'loc_a0_002',
    name: 'Room A0.002 - South Lab',
    floorLevel: 0,
    coordinates: { x: -5, y: 0, z: 18 },
    idealCameraView: {
      position: { x: -5, y: 6, z: 24 },
      target: { x: -5, y: 0, z: 18 },
      zoom: 2.5
    },
    capacity: 30,
    currentOccupancy: 0
  },
  {
    id: 'loc_a0_004',
    name: 'Room A0.004 - Collaboration Space',
    floorLevel: 0,
    coordinates: { x: 0, y: 0, z: 18 },
    idealCameraView: {
      position: { x: 0, y: 6, z: 24 },
      target: { x: 0, y: 0, z: 18 },
      zoom: 2.5
    },
    capacity: 35,
    currentOccupancy: 0
  },
  {
    id: 'loc_a0_008',
    name: 'Room A0.008 - Innovation Lab',
    floorLevel: 0,
    coordinates: { x: 8, y: 0, z: 18 },
    idealCameraView: {
      position: { x: 8, y: 6, z: 24 },
      target: { x: 8, y: 0, z: 18 },
      zoom: 2.5
    },
    capacity: 40,
    currentOccupancy: 12
  },

  // East Wing - B-Block
  {
    id: 'loc_b0_014',
    name: 'Room B0.014 - East Studio',
    floorLevel: 0,
    coordinates: { x: 24, y: 0, z: 8 },
    idealCameraView: {
      position: { x: 30, y: 6, z: 8 },
      target: { x: 24, y: 0, z: 8 },
      zoom: 2.5
    },
    capacity: 25,
    currentOccupancy: 0
  },
  {
    id: 'loc_b0_016',
    name: 'Room B0.016 - Media Room',
    floorLevel: 0,
    coordinates: { x: 24, y: 0, z: 0 },
    idealCameraView: {
      position: { x: 30, y: 6, z: 0 },
      target: { x: 24, y: 0, z: 0 },
      zoom: 2.5
    },
    capacity: 30,
    currentOccupancy: 0
  },

  // North Wing - C-Block
  {
    id: 'loc_c0_018',
    name: 'Room C0.018 - North Lecture Hall',
    floorLevel: 0,
    coordinates: { x: 10, y: 0, z: -18 },
    idealCameraView: {
      position: { x: 10, y: 6, z: -24 },
      target: { x: 10, y: 0, z: -18 },
      zoom: 2.5
    },
    capacity: 60,
    currentOccupancy: 0
  },
  {
    id: 'loc_c0_020',
    name: 'Room C0.020 - Conference Room',
    floorLevel: 0,
    coordinates: { x: 5, y: 0, z: -18 },
    idealCameraView: {
      position: { x: 5, y: 6, z: -24 },
      target: { x: 5, y: 0, z: -18 },
      zoom: 2.5
    },
    capacity: 40,
    currentOccupancy: 0
  },
  {
    id: 'loc_c0_022',
    name: 'Room C0.022 - Study Lounge',
    floorLevel: 0,
    coordinates: { x: 0, y: 0, z: -18 },
    idealCameraView: {
      position: { x: 0, y: 6, z: -24 },
      target: { x: 0, y: 0, z: -18 },
      zoom: 2.5
    },
    capacity: 50,
    currentOccupancy: 15
  },

  // Central Courtyard
  {
    id: 'loc_courtyard',
    name: 'Central Courtyard - Open Space',
    floorLevel: 0,
    coordinates: { x: 0, y: 0, z: 0 },
    idealCameraView: {
      position: { x: 0, y: 25, z: 30 },
      target: { x: 0, y: 0, z: 0 },
      zoom: 1.5
    },
    capacity: 200,
    currentOccupancy: 0
  },

  // Main Entrance / Atrium
  {
    id: 'loc_entrance',
    name: 'Main Entrance Atrium',
    floorLevel: 0,
    coordinates: { x: -8, y: 0, z: -18 },
    idealCameraView: {
      position: { x: -8, y: 8, z: -25 },
      target: { x: -8, y: 0, z: -18 },
      zoom: 2
    },
    capacity: 100,
    currentOccupancy: 23
  },

  // ===== FIRST FLOOR (Y = 4) =====
  
  // West Wing - D1-Block
  {
    id: 'loc_d1_032',
    name: 'Room D1.032 - Upper West Studio',
    floorLevel: 1,
    coordinates: { x: -22, y: 4, z: -10 },
    idealCameraView: {
      position: { x: -28, y: 10, z: -10 },
      target: { x: -22, y: 4, z: -10 },
      zoom: 2.5
    },
    capacity: 25,
    currentOccupancy: 0
  },
  {
    id: 'loc_d1_033',
    name: 'Room D1.033 - Design Lab',
    floorLevel: 1,
    coordinates: { x: -22, y: 4, z: -5 },
    idealCameraView: {
      position: { x: -28, y: 10, z: -5 },
      target: { x: -22, y: 4, z: -5 },
      zoom: 2.5
    },
    capacity: 30,
    currentOccupancy: 0
  },
  {
    id: 'loc_d1_037a',
    name: 'Room D1.037A - Art Studio',
    floorLevel: 1,
    coordinates: { x: -22, y: 4, z: 0 },
    idealCameraView: {
      position: { x: -28, y: 10, z: 0 },
      target: { x: -22, y: 4, z: 0 },
      zoom: 2.5
    },
    capacity: 20,
    currentOccupancy: 0
  },
  {
    id: 'loc_d1_041a',
    name: 'Room D1.041A - Project Space A',
    floorLevel: 1,
    coordinates: { x: -22, y: 4, z: 5 },
    idealCameraView: {
      position: { x: -28, y: 10, z: 5 },
      target: { x: -22, y: 4, z: 5 },
      zoom: 2.5
    },
    capacity: 18,
    currentOccupancy: 0
  },
  {
    id: 'loc_d1_041b',
    name: 'Room D1.041B - Project Space B',
    floorLevel: 1,
    coordinates: { x: -22, y: 4, z: 8 },
    idealCameraView: {
      position: { x: -28, y: 10, z: 8 },
      target: { x: -22, y: 4, z: 8 },
      zoom: 2.5
    },
    capacity: 18,
    currentOccupancy: 0
  },

  // South Wing - A1-Block
  {
    id: 'loc_a1_002',
    name: 'Room A1.002 - Upper South Lab',
    floorLevel: 1,
    coordinates: { x: -5, y: 4, z: 18 },
    idealCameraView: {
      position: { x: -5, y: 10, z: 24 },
      target: { x: -5, y: 4, z: 18 },
      zoom: 2.5
    },
    capacity: 28,
    currentOccupancy: 0
  },
  {
    id: 'loc_a1_006',
    name: 'Room A1.006 - Research Hub',
    floorLevel: 1,
    coordinates: { x: 2, y: 4, z: 18 },
    idealCameraView: {
      position: { x: 2, y: 10, z: 24 },
      target: { x: 2, y: 4, z: 18 },
      zoom: 2.5
    },
    capacity: 35,
    currentOccupancy: 18
  },
  {
    id: 'loc_a1_008',
    name: 'Room A1.008 - Upper Innovation Lab',
    floorLevel: 1,
    coordinates: { x: 8, y: 4, z: 18 },
    idealCameraView: {
      position: { x: 8, y: 10, z: 24 },
      target: { x: 8, y: 4, z: 18 },
      zoom: 2.5
    },
    capacity: 35,
    currentOccupancy: 0
  },

  // North Wing - C1-Block  
  {
    id: 'loc_c1_024',
    name: 'Room C1.024 - Upper Lecture Hall',
    floorLevel: 1,
    coordinates: { x: 8, y: 4, z: -18 },
    idealCameraView: {
      position: { x: 8, y: 10, z: -24 },
      target: { x: 8, y: 4, z: -18 },
      zoom: 2.5
    },
    capacity: 50,
    currentOccupancy: 0
  },
  {
    id: 'loc_c1_026',
    name: 'Room C1.026 - Seminar Room',
    floorLevel: 1,
    coordinates: { x: 3, y: 4, z: -18 },
    idealCameraView: {
      position: { x: 3, y: 10, z: -24 },
      target: { x: 3, y: 4, z: -18 },
      zoom: 2.5
    },
    capacity: 30,
    currentOccupancy: 0
  },

  // ===== SECOND FLOOR (Y = 8) - Rooftop Spaces =====
  {
    id: 'loc_rooftop_terrace',
    name: 'Rooftop Terrace',
    floorLevel: 2,
    coordinates: { x: 0, y: 8, z: -8 },
    idealCameraView: {
      position: { x: 0, y: 15, z: -15 },
      target: { x: 0, y: 8, z: -8 },
      zoom: 2
    },
    capacity: 80,
    currentOccupancy: 0
  },

  // ===== SPECIAL SPACES =====
  {
    id: 'loc_garden',
    name: 'Back Garden',
    floorLevel: 0,
    coordinates: { x: 0, y: 0, z: 30 },
    idealCameraView: {
      position: { x: 0, y: 8, z: 40 },
      target: { x: 0, y: 0, z: 30 },
      zoom: 1.8
    },
    capacity: 150,
    currentOccupancy: 0
  },
  {
    id: 'loc_main_hall',
    name: 'Grand Hall - Central Gathering',
    floorLevel: 0,
    coordinates: { x: -15, y: 0, z: 0 },
    idealCameraView: {
      position: { x: -22, y: 8, z: 8 },
      target: { x: -15, y: 0, z: 0 },
      zoom: 2
    },
    capacity: 250,
    currentOccupancy: 45
  }
];

// Alias for backward compatibility
export const CAMPUS_LOCATIONS = MAASTRICHT_CAMPUS_LOCATIONS;

export const UPCOMING_ACTIVITIES: Activity[] = [
  {
    id: 'evt_001',
    title: 'Synthetic Biology Symposium',
    shortDescription: 'Exploring the intersection of computational design and biological fabrication.',
    fullDescription: 'A deep dive into how we can grow buildings rather than build them, featuring keynote speakers from MIT Media Lab.',
    type: 'RESEARCH',
    locationId: 'loc_a1_006',
    startTime: '2026-02-14T10:00:00Z',
    endTime: '2026-02-14T14:00:00Z',
    visuals: {
      heroImage: '/assets/events/bio-symposium.webp',
      accentColor: '#FF4D00',
      icon: 'flask-conical'
    },
    tags: ['Biology', 'Architecture', 'Keynote']
  },
  {
    id: 'evt_002',
    title: 'Spring Design Review',
    shortDescription: 'Final year architecture presentations open to public critique.',
    fullDescription: 'Students present their thesis projects centered on urban regeneration and sustainable material systems.',
    type: 'EXHIBITION',
    locationId: 'loc_main_hall',
    startTime: '2026-02-15T09:00:00Z',
    endTime: '2026-02-15T18:00:00Z',
    visuals: {
      heroImage: '/assets/events/review.webp',
      accentColor: '#3B82F6',
      icon: 'presentation'
    },
    tags: ['Public', 'Critique', 'Design']
  },
  {
    id: 'evt_003',
    title: 'Introduction to Parametric Modeling',
    shortDescription: 'Workshop on Grasshopper and algorithmic design fundamentals.',
    fullDescription: 'Hands-on tutorial for first-year students exploring computational design tools.',
    type: 'LECTURE',
    locationId: 'loc_c0_018',
    startTime: '2026-02-16T14:00:00Z',
    endTime: '2026-02-16T17:00:00Z',
    visuals: {
      heroImage: '/assets/events/parametric.webp',
      accentColor: '#10B981',
      icon: 'grid-3x3'
    },
    tags: ['Workshop', 'Software', 'Beginner']
  },
  {
    id: 'evt_004',
    title: 'Material Futures: Mycelium Workshop',
    shortDescription: 'Hands-on exploration of fungi-based building materials.',
    fullDescription: 'Learn to cultivate and shape mycelium composites for architectural applications.',
    type: 'LAB_WORK',
    locationId: 'loc_d1_033',
    startTime: '2026-02-17T13:00:00Z',
    endTime: '2026-02-17T16:00:00Z',
    visuals: {
      heroImage: '/assets/events/mycelium.webp',
      accentColor: '#F59E0B',
      icon: 'sprout'
    },
    tags: ['Materials', 'Sustainable', 'Hands-on']
  },
  {
    id: 'evt_005',
    title: 'Cinema & Space: Blade Runner 2049',
    shortDescription: 'Film screening followed by discussion on dystopian urbanism.',
    fullDescription: 'Analyzing Denis Villeneuve\'s vision of future cities through an architectural lens.',
    type: 'SOCIAL',
    locationId: 'loc_c1_024',
    startTime: '2026-02-18T19:00:00Z',
    endTime: '2026-02-18T22:30:00Z',
    visuals: {
      heroImage: '/assets/events/cinema.webp',
      accentColor: '#8B5CF6',
      icon: 'film'
    },
    tags: ['Film', 'Discussion', 'Evening']
  },
  {
    id: 'evt_006',
    title: 'AI in Architecture: Ethics & Practice',
    shortDescription: 'Panel discussion on machine learning in design workflows.',
    fullDescription: 'Industry leaders debate the role of artificial intelligence in shaping tomorrow\'s built environment.',
    type: 'LECTURE',
    locationId: 'loc_c0_020',
    startTime: '2026-02-19T15:00:00Z',
    endTime: '2026-02-19T17:30:00Z',
    visuals: {
      heroImage: '/assets/events/ai-panel.webp',
      accentColor: '#EC4899',
      icon: 'brain-circuit'
    },
    tags: ['AI', 'Panel', 'Ethics']
  },
  {
    id: 'evt_007',
    title: 'Urban Metabolism Research Presentation',
    shortDescription: 'Findings from the year-long study on campus energy flows.',
    fullDescription: 'Researchers present data visualizations and proposals for a zero-waste campus ecosystem.',
    type: 'RESEARCH',
    locationId: 'loc_a0_008',
    startTime: '2026-02-20T11:00:00Z',
    endTime: '2026-02-20T13:00:00Z',
    visuals: {
      heroImage: '/assets/events/metabolism.webp',
      accentColor: '#14B8A6',
      icon: 'activity'
    },
    tags: ['Research', 'Sustainability', 'Data']
  },
  {
    id: 'evt_008',
    title: 'End-of-Term Exhibition Opening',
    shortDescription: 'Celebrating student work across all disciplines.',
    fullDescription: 'Opening reception for the semester\'s most innovative projects, from robotic installations to speculative architecture.',
    type: 'EXHIBITION',
    locationId: 'loc_courtyard',
    startTime: '2026-02-21T18:00:00Z',
    endTime: '2026-02-21T21:00:00Z',
    visuals: {
      heroImage: '/assets/events/opening.webp',
      accentColor: '#EF4444',
      icon: 'sparkles'
    },
    tags: ['Exhibition', 'Opening', 'Social']
  },
  {
    id: 'evt_009',
    title: 'Garden Party: Spring Kickoff',
    shortDescription: 'Outdoor social gathering to welcome the new season.',
    fullDescription: 'Join faculty and students for refreshments, music, and conversation in the back garden.',
    type: 'SOCIAL',
    locationId: 'loc_garden',
    startTime: '2026-02-22T16:00:00Z',
    endTime: '2026-02-22T19:00:00Z',
    visuals: {
      heroImage: '/assets/events/garden-party.webp',
      accentColor: '#22C55E',
      icon: 'sun'
    },
    tags: ['Social', 'Outdoor', 'Community']
  },
  {
    id: 'evt_010',
    title: 'Digital Fabrication Workshop',
    shortDescription: 'Learn 3D printing and laser cutting techniques.',
    fullDescription: 'Hands-on introduction to digital fabrication tools and techniques for prototyping.',
    type: 'LAB_WORK',
    locationId: 'loc_d0_037',
    startTime: '2026-02-23T10:00:00Z',
    endTime: '2026-02-23T13:00:00Z',
    visuals: {
      heroImage: '/assets/events/fab-workshop.webp',
      accentColor: '#F97316',
      icon: 'box'
    },
    tags: ['Fabrication', 'Workshop', 'Technology']
  },
  {
    id: 'evt_011',
    title: 'Rooftop Yoga & Mindfulness',
    shortDescription: 'Weekly yoga session with city views.',
    fullDescription: 'Start your day with guided yoga and meditation on the rooftop terrace.',
    type: 'SOCIAL',
    locationId: 'loc_rooftop_terrace',
    startTime: '2026-02-24T08:00:00Z',
    endTime: '2026-02-24T09:00:00Z',
    visuals: {
      heroImage: '/assets/events/yoga.webp',
      accentColor: '#A78BFA',
      icon: 'heart'
    },
    tags: ['Wellness', 'Morning', 'Mindfulness']
  },
  {
    id: 'evt_012',
    title: 'Portfolio Review Sessions',
    shortDescription: 'One-on-one feedback with visiting professionals.',
    fullDescription: 'Architecture and design professionals offer personalized portfolio critiques.',
    type: 'LECTURE',
    locationId: 'loc_c0_022',
    startTime: '2026-02-25T13:00:00Z',
    endTime: '2026-02-25T17:00:00Z',
    visuals: {
      heroImage: '/assets/events/portfolio.webp',
      accentColor: '#6366F1',
      icon: 'folder'
    },
    tags: ['Career', 'Mentorship', 'Portfolio']
  }
];
