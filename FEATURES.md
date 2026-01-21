# Feature Guide - University Activity Hub

## 🎯 Core Features

### 1. Calendar View (`/calendar`)

#### Visual Design
- **Layout**: Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- **Cards**: Glassmorphic with thin borders (`#E2E8F0`)
- **Typography**: Inter for headings, JetBrains Mono for metadata
- **Hover States**: Subtle lift + background tint using event's accent color (5% opacity)

#### Functionality
- **Search Bar**: 
  - Filters by title, description, and tags
  - Real-time results
  - Placeholder: "Search events, tags, or descriptions..."

- **Type Filters**:
  - All (shows everything)
  - LECTURE (blue badge)
  - LAB_WORK (amber badge)
  - EXHIBITION (purple badge)
  - SOCIAL (pink badge)
  - RESEARCH (emerald badge)

- **Event Cards Display**:
  - Event title (font-semibold)
  - Short description
  - Date and time range
  - Location name
  - Occupancy ratio (e.g., "87/150 capacity")
  - Tag pills
  - Color-coded accent bar at bottom

- **Selection**:
  - Click any card to select
  - Selected card gets ring border
  - Background tints with event's accent color
  - Selection persists when navigating to 3D map

#### Sample Events

1. **Synthetic Biology Symposium** (Research)
   - Bio-Matter Research Lab
   - Feb 14, 2026, 10:00 AM - 2:00 PM
   - Orange accent (#FF4D00)
   - Tags: Biology, Architecture, Keynote

2. **Spring Design Review** (Exhibition)
   - Main Atrium
   - Feb 15, 2026, 9:00 AM - 6:00 PM
   - Blue accent (#3B82F6)
   - Tags: Public, Critique, Design

3. **Introduction to Parametric Modeling** (Lecture)
   - Lecture Hall A
   - Feb 16, 2026, 2:00 PM - 5:00 PM
   - Green accent (#10B981)
   - Tags: Workshop, Software, Beginner

4. **Material Futures: Mycelium Workshop** (Lab Work)
   - Digital Fabrication Studio
   - Feb 17, 2026, 1:00 PM - 4:00 PM
   - Amber accent (#F59E0B)
   - Tags: Materials, Sustainable, Hands-on

5. **Cinema & Space: Blade Runner 2049** (Social)
   - Grand Theater
   - Feb 18, 2026, 7:00 PM - 10:30 PM
   - Purple accent (#8B5CF6)
   - Tags: Film, Discussion, Evening

6. **AI in Architecture** (Lecture)
   - Lecture Hall A
   - Feb 19, 2026, 3:00 PM - 5:30 PM
   - Pink accent (#EC4899)
   - Tags: AI, Panel, Ethics

7. **Urban Metabolism Research** (Research)
   - Bio-Matter Research Lab
   - Feb 20, 2026, 11:00 AM - 1:00 PM
   - Teal accent (#14B8A6)
   - Tags: Research, Sustainability, Data

8. **End-of-Term Exhibition** (Exhibition)
   - Main Atrium
   - Feb 21, 2026, 6:00 PM - 9:00 PM
   - Red accent (#EF4444)
   - Tags: Exhibition, Opening, Social

---

### 2. 3D Interactive Map (`/map`)

#### Visual Design
- **Background**: Light grey/off-white (#F8FAFC) - lab aesthetic
- **Building**: Wireframe boxes with 30% opacity
  - Main building: 40x10x30 units
  - Upper floor sections: 20x4x15, 16x4x20
  - Light grey color (#E2E8F0)

- **Grid Floor**: 
  - 100x100 units
  - 2-unit cells with thin lines
  - 10-unit sections with thicker lines
  - Fades at distance

- **Event Markers**:
  - Glowing spheres (0.8 unit radius)
  - Color: Event's accent color
  - Emissive material (self-illuminated)
  - Pulsing animation (sin wave scale)
  - Transparent outer sphere (1.2 unit radius, 20% opacity)

- **Lighting**:
  - Ambient light (60% intensity)
  - Directional light from top-right
  - Point light for fill
  - Contact shadows for depth

#### Functionality

- **Camera Controls**:
  - Click & drag to orbit
  - Scroll to zoom (20-100 unit range)
  - Damped motion for smoothness
  - Default view: 40° angle, elevated

- **Event Markers**:
  - Positioned at exact 3D coordinates
  - Click to select event
  - Selection triggers tooltip
  - Syncs with calendar view

- **Tooltips** (HTML overlay):
  - Event title
  - Location name
  - Occupancy ratio
  - Appears above marker
  - Fades in/out smoothly

- **Legend** (bottom-left):
  - Building structure indicator
  - Active events indicator
  - Monospace typography

- **Controls Hint** (bottom-right):
  - Instructions for interaction
  - "Click & drag to rotate"
  - "Scroll to zoom"
  - "Click marker to select"

#### Campus Locations (3D Coordinates)

1. **Main Atrium** (0, 0, 0) - Ground floor center
2. **Bio-Matter Research Lab** (-15, 10, -5) - Upper floor, northwest
3. **Lecture Hall A** (20, 0, 10) - Ground floor, east
4. **Grand Theater** (-20, 0, 15) - Ground floor, southwest
5. **Digital Fabrication Studio** (15, 10, -10) - Upper floor, northeast

---

### 3. Navigation System

#### Desktop Sidebar
- **Position**: Fixed left, 64px width
- **Style**: Glassmorphic (white/80% with backdrop blur)
- **Header**:
  - Activity Hub logo (icon + text)
  - "Campus Events" subtitle in monospace

- **Navigation Items**:
  - Calendar (Calendar icon)
  - 3D Map (Map icon)
  - Active state: black background, white text
  - Hover state: light grey background

- **Footer**:
  - "Live data synced" label
  - Current date in monospace

#### Mobile Navigation
- **Header Bar**: 
  - Fixed top, spans full width
  - Activity Hub logo
  - Hamburger menu button

- **Menu Drawer**:
  - Slides in from right
  - Overlay backdrop blur
  - Same navigation items as desktop
  - Closes on selection

---

### 4. State Management

#### Zustand Store (`lib/store.ts`)

```typescript
{
  selectedActivity: Activity | null,  // Currently selected event
  setSelectedActivity: (activity) => void,
  
  filterType: ActivityType | null,     // Active filter
  setFilterType: (type) => void,
  
  searchQuery: string,                 // Search input
  setSearchQuery: (query) => void
}
```

#### State Flow
1. User clicks event card → `setSelectedActivity()`
2. State updates globally
3. 3D map reads state → highlights marker
4. User navigates between views → state persists
5. Click 3D marker → updates same state → calendar reflects

---

### 5. Responsive Breakpoints

#### Mobile (< 640px)
- Single column calendar grid
- Hamburger menu navigation
- Bottom legends stacked
- Reduced padding (4px)
- Smaller font sizes

#### Tablet (640px - 1024px)
- Two-column calendar grid
- Hamburger menu still
- Comfortable spacing (6px)
- Standard font sizes

#### Desktop (1024px+)
- Three-column calendar grid
- Persistent sidebar
- Maximum spacing (8px)
- Sidebar legends
- Full typography scale

---

### 6. Color System

#### Light Mode (Default)
```css
Background: #F8FAFC (slate-50)
Cards: #FFFFFF (white)
Borders: #E2E8F0 (slate-200)
Text: #0F172A (slate-900)
Metadata: #64748B (slate-500)
```

#### Dark Mode
```css
Background: #0F172A (slate-950)
Cards: #1E293B (slate-900)
Borders: #334155 (slate-800)
Text: #F8FAFC (slate-50)
Metadata: #94A3B8 (slate-400)
```

#### Event Type Colors
- **LECTURE**: Blue (#3B82F6)
- **LAB_WORK**: Amber (#F59E0B)
- **EXHIBITION**: Purple (#8B5CF6)
- **SOCIAL**: Pink (#EC4899)
- **RESEARCH**: Emerald (#10B981)

---

### 7. Typography Scale

#### Headings
- **Font**: Inter (variable)
- **Weight**: 600 (semibold)
- **Tracking**: Tight (-0.025em)
- **Scale**: 3xl → 2xl → xl → lg

#### Body Text
- **Font**: Inter (variable)
- **Weight**: 400 (normal)
- **Size**: sm (14px) - base (16px)

#### Metadata
- **Font**: JetBrains Mono (variable)
- **Weight**: 400 (normal)
- **Size**: xs (12px)
- **Usage**: Dates, times, locations, capacity, tags

---

### 8. Animation & Transitions

#### Framer Motion
- Page transitions (fade in/out)
- Card hover lifts
- Badge clicks

#### CSS Transitions
- `transition-all duration-200`
- Hover states on cards
- Button state changes
- Background color shifts

#### Three.js Animations
- Marker pulsing (sin wave)
- Camera smoothing (damping)
- Tooltip fade (opacity)

---

### 9. Accessibility Features

- **Keyboard Navigation**: Tab through all interactive elements
- **ARIA Labels**: "Toggle menu", descriptive button text
- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<aside>`
- **Focus States**: Visible outlines on all controls
- **Color Contrast**: WCAG AA compliant ratios
- **Screen Reader**: Descriptive alt text and labels

---

### 10. Performance Optimizations

- **Dynamic Imports**: 3D scene loaded only when needed
- **SSR Disabled**: Three.js rendered client-side only
- **Code Splitting**: Automatic via Next.js App Router
- **Memoization**: `useMemo` for filtered lists
- **Lazy Loading**: Images and heavy components deferred
- **Bundle Analysis**: Optimized dependency tree

---

## 🎨 Design Aesthetic Summary

### Oxman.com Elements
✅ Wireframe 3D geometry  
✅ Scientific color palette  
✅ Grid systems  
✅ High contrast data  
✅ Clinical spacing  

### Stripe Press Elements
✅ Editorial typography  
✅ Minimal card design  
✅ Generous whitespace  
✅ Subtle interactions  
✅ Information hierarchy  

### Unique Fusion
✅ Glassmorphic overlays  
✅ Monospace metadata  
✅ Color-coded systems  
✅ Spatial data visualization  
✅ Smooth state transitions  

---

**All Features Implemented & Tested** ✅  
**Zero Linter Errors** ✅  
**Fully Responsive** ✅  
**Production Ready** ✅
