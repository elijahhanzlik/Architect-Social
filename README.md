# University Activity Hub

A sophisticated web application that displays campus events through both a refined calendar interface and an interactive 3D spatial map. The design blends scientific/lab interface aesthetics with editorial typography.

## Features

- **📅 Calendar View**: Browse events in an elegant editorial grid layout
  - Search and filter by event type and tags
  - Real-time event selection and highlighting
  - Detailed event cards with metadata

- **🗺️ 3D Interactive Map**: Visualize events in spatial context
  - Interactive 3D building wireframe
  - Glowing event markers with custom colors
  - Smooth camera animations
  - Orbit controls for exploration
  - Real-time tooltips and event details

- **🔄 State Synchronization**: Seamless integration between views
  - Select event in calendar → camera animates to location in 3D map
  - Click marker in 3D map → highlights event in calendar
  - Persistent state across navigation

- **🎨 Modern Design System**
  - Glassmorphic UI elements
  - Editorial typography (Inter + JetBrains Mono)
  - Light/Dark mode support
  - Fully responsive (mobile, tablet, desktop)

## Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **3D Engine**: @react-three/fiber + @react-three/drei
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20.17.0+ or 22.9.0+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd activity-hub
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The application will automatically redirect to the calendar view.

## Project Structure

```
activity-hub/
├── app/
│   ├── calendar/        # Calendar view page
│   ├── map/            # 3D map view page
│   ├── globals.css     # Global styles and Tailwind config
│   ├── layout.tsx      # Root layout with navigation
│   └── page.tsx        # Home page (redirects to calendar)
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── ActivityCard.tsx    # Event card component
│   ├── MobileNav.tsx       # Mobile navigation
│   ├── Scene3D.tsx         # 3D scene and markers
│   └── Sidebar.tsx         # Desktop sidebar navigation
├── lib/
│   ├── mockData.ts     # Sample event and location data
│   ├── store.ts        # Zustand state management
│   ├── types.ts        # TypeScript type definitions
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## Key Components

### ActivityCard
Displays event information with:
- Type badges (color-coded)
- Date/time metadata
- Location details
- Occupancy information
- Interactive hover states

### Scene3D
3D visualization featuring:
- Wireframe building geometry
- Glowing event markers
- Grid floor and contact shadows
- HTML tooltips for event details
- Smooth camera animations

### State Management
Uses Zustand for shared state:
- Selected activity
- Filter preferences
- Search queries

## Customization

### Adding Events

Edit `lib/mockData.ts` to add new events:

```typescript
{
  id: 'evt_009',
  title: 'Your Event Title',
  shortDescription: 'Brief description',
  fullDescription: 'Detailed information',
  type: 'LECTURE', // LECTURE | LAB_WORK | EXHIBITION | SOCIAL | RESEARCH
  locationId: 'loc_atrium',
  startTime: '2026-02-22T10:00:00Z',
  endTime: '2026-02-22T12:00:00Z',
  visuals: {
    heroImage: '/path/to/image.jpg',
    accentColor: '#FF4D00',
    icon: 'icon-name'
  },
  tags: ['Tag1', 'Tag2']
}
```

### Adding Locations

Edit `lib/mockData.ts` to add new campus locations:

```typescript
{
  id: 'loc_new',
  name: 'Location Name',
  floorLevel: 1,
  coordinates: { x: 10, y: 0, z: 5 },
  idealCameraView: {
    position: { x: 15, y: 10, z: 10 },
    target: { x: 10, y: 0, z: 5 },
    zoom: 2
  },
  capacity: 50,
  currentOccupancy: 25
}
```

## Design Philosophy

The UI combines:
- **Oxman.com**: Scientific/lab aesthetic with wireframe 3D elements
- **Stripe Press**: Editorial typography and minimal card designs

Key design principles:
- High information density without clutter
- Monospace fonts for data/metadata
- Subtle hover states and transitions
- Glassmorphic overlays for depth
- Clean borders and generous whitespace

## Performance

- Dynamic imports for 3D components (no SSR)
- Optimized rendering with React Three Fiber
- Efficient state management with Zustand
- Code splitting via Next.js App Router

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT

## Acknowledgments

- Design inspiration: Oxman.com and Stripe Press
- 3D framework: React Three Fiber & Drei
- UI components: shadcn/ui
