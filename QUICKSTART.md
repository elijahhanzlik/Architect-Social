# Quick Start Guide

## 🚀 Your Application is Running!

The University Activity Hub is now live at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.178.31:3000

## 📱 What You Can Do Now

### 1. Explore the Calendar View
- Open http://localhost:3000 (redirects to `/calendar`)
- Browse 8 upcoming events displayed in an editorial grid
- **Search**: Type in the search bar to filter by title, description, or tags
- **Filter**: Click the type badges to filter by event category:
  - LECTURE
  - LAB_WORK
  - EXHIBITION
  - SOCIAL
  - RESEARCH
- **Select**: Click any event card to select it

### 2. Navigate to the 3D Map
- Click "3D Map" in the sidebar (or hamburger menu on mobile)
- View the interactive wireframe campus building
- See glowing event markers at their spatial coordinates
- **Interact**:
  - Click & drag to rotate the camera
  - Scroll to zoom in/out
  - Click any marker to select that event
- Selected events show tooltips with details

### 3. Experience State Synchronization
- Select an event in the Calendar → switch to 3D Map → it remains selected
- Click a marker in 3D Map → switch to Calendar → the card is highlighted
- The state persists across navigation!

## 🎨 Design Features

### Light Mode (Default)
- Clean slate/white palette (#F8FAFC background)
- Thin borders and subtle shadows
- Monospace metadata fonts

### Dark Mode
- Deep charcoal (#0F172A) with indigo accents
- Automatic color scheme switching (based on system preferences)

### Responsive Design
- **Mobile**: Hamburger menu, single column cards
- **Tablet**: 2-column grid
- **Desktop**: 3-column grid + persistent sidebar

## 🛠️ Customization Tips

### Adding Your Own Events

1. Open `lib/mockData.ts`
2. Add to the `UPCOMING_ACTIVITIES` array:

```typescript
{
  id: 'evt_009',
  title: 'Your Event',
  shortDescription: 'Description here',
  fullDescription: 'Full details',
  type: 'LECTURE', // Choose from types
  locationId: 'loc_atrium', // Must match a location
  startTime: '2026-02-22T10:00:00Z',
  endTime: '2026-02-22T12:00:00Z',
  visuals: {
    heroImage: '/path/to/image.jpg',
    accentColor: '#FF4D00', // Hex color
    icon: 'flask-conical' // Lucide icon name
  },
  tags: ['Tag1', 'Tag2']
}
```

3. Save and the page will hot-reload!

### Adding New Locations

1. Open `lib/mockData.ts`
2. Add to `CAMPUS_LOCATIONS`:

```typescript
{
  id: 'loc_yourspace',
  name: 'Your Space Name',
  floorLevel: 2,
  coordinates: { x: 25, y: 10, z: -10 }, // 3D position
  idealCameraView: {
    position: { x: 30, y: 15, z: -8 },
    target: { x: 25, y: 10, z: -10 },
    zoom: 2
  },
  capacity: 100,
  currentOccupancy: 42
}
```

### Modifying the Building Geometry

1. Open `components/Scene3D.tsx`
2. Find the `BuildingWireframe` component
3. Add/modify `<mesh>` elements with different `<boxGeometry>` dimensions

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is taken, Next.js will automatically use 3001, 3002, etc.

### 3D Scene Not Rendering
- Ensure your browser supports WebGL
- Try a different browser (Chrome/Firefox recommended)
- Check browser console for errors

### Dark Mode Not Working
- Check your system appearance settings
- Add manual toggle by extending the UI (future enhancement)

## 📦 Production Build

When ready to deploy:

```bash
npm run build
npm start
```

Or deploy to Vercel:

```bash
npx vercel
```

## 🎯 Next Steps

Consider adding:
- [ ] Real-time data from a backend API
- [ ] User authentication
- [ ] Event registration functionality
- [ ] Calendar export (iCal)
- [ ] Notification system
- [ ] Custom camera paths for tours
- [ ] More detailed 3D building models

## 💡 Tips

1. **Performance**: The 3D scene uses dynamic imports to avoid SSR issues
2. **State**: Zustand store handles all shared state (selected activity, filters)
3. **Styling**: Edit `app/globals.css` for global theme changes
4. **Types**: All TypeScript types are in `lib/types.ts`

Enjoy your University Activity Hub! 🎓✨
