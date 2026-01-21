# Admin Portal Guide

## 🔐 Overview

The Admin Portal allows authorized users to manage events and locations for the University Activity Hub. Changes made in the admin portal are immediately reflected in both the Calendar and 3D Map views.

## 🚀 Accessing the Admin Portal

### Login Credentials

**Default credentials** (change these in production!):
- **Username**: `admin`
- **Password**: `admin123`

### Access URLs

- **Admin Login**: http://localhost:3000/admin
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

You can also access the admin portal from the main app:
- Click "Admin" in the sidebar (desktop)
- Click hamburger menu → "Admin" (mobile)

## 📊 Admin Dashboard

The dashboard provides:

### Statistics Cards
- **Total Events**: Count of all scheduled events
- **Total Locations**: Count of campus locations
- **Upcoming**: Events scheduled for the future
- **This Week**: Events happening within 7 days

### Quick Actions
- **View Calendar**: Opens calendar view in new tab
- **View 3D Map**: Opens 3D map in new tab
- **Logout**: Signs out and returns to login page

### Tabs
- **Events Tab**: Manage all events
- **Locations Tab**: Manage all campus locations

## 📅 Event Management

### Adding a New Event

1. Click "Add Event" button on Events tab
2. Fill out the form:

#### Basic Information
- **Event Title**: Name of the event (e.g., "Synthetic Biology Symposium")
- **Short Description**: Brief overview shown on event cards
- **Full Description**: Detailed information about the event
- **Event Type**: Choose from:
  - `LECTURE` - Academic presentations
  - `LAB_WORK` - Hands-on workshops
  - `EXHIBITION` - Public displays
  - `SOCIAL` - Community gatherings
  - `RESEARCH` - Scientific presentations

#### Date & Location
- **Start Time**: When the event begins (date + time)
- **End Time**: When the event ends (date + time)
- **Location**: Select from available campus locations

#### Visual Styling
- **Accent Color**: Choose a color for the event's visual identity
  - Use color picker or enter hex code (e.g., `#FF4D00`)
  - This color appears on event cards and 3D markers
- **Icon Name**: Optional Lucide icon name (e.g., `flask-conical`, `calendar`, `sparkles`)
  - See available icons at https://lucide.dev/icons

#### Tags
- Add tags to help users filter events
- Type tag name and click "Add" or press Enter
- Click tag to remove it
- Examples: `Biology`, `Architecture`, `Keynote`, `Public`

3. Click "Create Event" to save

### Editing an Event

1. Find the event in the Events tab list
2. Click the **Edit** (pencil) icon
3. Update any fields
4. Click "Save Changes"

### Deleting an Event

1. Find the event in the Events tab list
2. Click the **Delete** (trash) icon
3. Confirm deletion in the dialog

⚠️ **Warning**: Deletion is immediate and cannot be undone!

## 📍 Location Management

### Adding a New Location

1. Click "Add Location" button on Locations tab
2. Fill out the form:

#### Basic Information
- **Location Name**: Name of the space (e.g., "Main Atrium / Exhibition Hall")
- **Floor Level**: Which floor the location is on (1, 2, 3, etc.)
- **Capacity**: Maximum number of people the space holds
- **Current Occupancy**: Current number of people (optional, for real-time tracking)

#### 3D Coordinates
Position in the 3D map space:
- **X Position**: Left (-) to Right (+)
- **Y Position**: Down (-) to Up (+) - typically height/floor level
- **Z Position**: Front (-) to Back (+)

**Tips**:
- Center of the map is (0, 0, 0)
- Ground level is typically Y = 0
- Upper floors are Y = 10, 20, etc.
- Use the 3D map to visualize positions

**Example coordinates**:
- Main Atrium: (0, 0, 0) - Center, ground floor
- Lab (upper floor): (-15, 10, -5)
- Lecture Hall: (20, 0, 10)

#### Ideal Camera View
How the camera should position when this location is selected:

**Camera Position** (where the camera is):
- X, Y, Z coordinates
- Should be offset from the location coordinates
- Higher Y = elevated view
- Example: (10, 15, 20) for aerial view

**Camera Target** (where the camera looks):
- Usually the same as location coordinates
- X, Y, Z values
- Example: (0, 0, 0) to look at center

**Zoom Level**:
- 1.0 = default
- Higher = closer view
- Range: 0.5 - 5.0
- Example: 2.5 for detailed view of small room

3. Click "Create Location" to save

### Editing a Location

1. Find the location in the Locations tab list
2. Click the **Edit** (pencil) icon
3. Update any fields (coordinates, capacity, etc.)
4. Click "Save Changes"

### Deleting a Location

1. Find the location in the Locations tab list
2. Click the **Delete** (trash) icon
3. Confirm deletion

⚠️ **Warning**: 
- Cannot delete locations that have events assigned to them
- Delete or reassign events first

## 💾 Data Persistence

### How Data is Stored

Currently, the admin portal uses **browser localStorage** for data persistence:

- Data saved when you create/edit/delete items
- Data persists between browser sessions
- Data is specific to each browser/device

### Backing Up Data

To backup your events and locations:

1. Open browser DevTools (F12)
2. Go to "Application" or "Storage" tab
3. Find "Local Storage" → your domain
4. Look for keys:
   - `adminActivities`
   - `adminLocations`
5. Copy the JSON values

### Restoring Data

To restore from backup:

1. Open browser DevTools
2. Console tab
3. Paste:
```javascript
localStorage.setItem('adminActivities', '[your JSON data]');
localStorage.setItem('adminLocations', '[your JSON data]');
```
4. Refresh the page

### Upgrading to Backend

For production use, replace localStorage with:
- REST API endpoints
- Database (PostgreSQL, MongoDB, etc.)
- Real-time sync with WebSockets
- See `BACKEND_INTEGRATION.md` for guide

## 🔒 Security

### Current Implementation

The admin portal uses **simple client-side authentication**:
- Username/password stored in `lib/adminAuth.ts`
- Session stored in localStorage
- Suitable for **demo/development only**

### Production Security Recommendations

For production, implement:

1. **Authentication Service**:
   - NextAuth.js with providers (Google, GitHub, etc.)
   - Clerk (https://clerk.dev)
   - Auth0 or Supabase Auth
   - Custom JWT-based auth with backend

2. **Authorization**:
   - Role-based access control (RBAC)
   - Admin vs. Editor vs. Viewer roles
   - Per-event permissions

3. **API Security**:
   - Server-side validation
   - Rate limiting
   - CSRF protection
   - Input sanitization

4. **Update Credentials**:
   - Change default password immediately
   - Use environment variables
   - Implement password reset flow

### Changing Admin Credentials

Edit `/lib/adminAuth.ts`:

```typescript
const ADMIN_CREDENTIALS = {
  username: 'your_username',
  password: 'your_secure_password',
};
```

**Better**: Use environment variables:

```typescript
const ADMIN_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_ADMIN_USER || 'admin',
  password: process.env.ADMIN_PASSWORD || 'change_me',
};
```

## 🔗 Integration with Main App

### Real-Time Updates

Changes in the admin portal are immediately visible:

1. **Admin creates event** → Appears in calendar grid
2. **Admin updates location** → 3D marker moves to new position
3. **Admin deletes event** → Removed from calendar and map

### State Synchronization

- Admin portal uses `useAdminStore` (Zustand)
- Calendar/Map use `useAppStore` + `useAdminStore`
- Both read from same localStorage keys
- Changes sync across all open tabs

### Viewing Changes

After making changes in admin:
- Click "View Calendar" to see calendar view
- Click "View 3D Map" to see updated markers
- Or navigate normally from sidebar

## 🎨 Customization Tips

### Event Colors

Choose colors that:
- Have good contrast on white/dark backgrounds
- Are distinct from other event types
- Match your institution's branding

Suggested palette:
- Research: `#FF4D00` (orange)
- Exhibition: `#3B82F6` (blue)
- Lecture: `#10B981` (green)
- Lab Work: `#F59E0B` (amber)
- Social: `#8B5CF6` (purple)

### 3D Positioning

For best 3D visualization:
- Spread locations across map (don't cluster)
- Use consistent Y values per floor
  - Ground: Y = 0
  - Floor 2: Y = 10
  - Floor 3: Y = 20
- Camera should be 5-10 units away from target
- Higher zoom for small spaces, lower for large areas

### Tags Strategy

Good tagging helps users find events:
- **Audience**: `Public`, `Students`, `Faculty`
- **Format**: `Workshop`, `Panel`, `Keynote`
- **Topic**: `AI`, `Sustainability`, `Design`
- **Time**: `Evening`, `Weekend`, `Lunch`
- **Level**: `Beginner`, `Advanced`, `All Levels`

## 🐛 Troubleshooting

### Can't Login
- Check username/password match credentials in `lib/adminAuth.ts`
- Clear browser cache and cookies
- Try incognito/private window

### Changes Not Showing
- Refresh the page (Ctrl+R / Cmd+R)
- Check localStorage in DevTools
- Clear localStorage and re-create data

### Events Missing After Browser Restart
- localStorage might be disabled
- Browser in private mode (data clears on close)
- Check browser storage settings

### Camera Not Moving to Location
- Verify camera coordinates are valid numbers
- Check that X, Y, Z values are reasonable (-50 to 50 range)
- Target should match location coordinates

### Form Not Submitting
- Check all required fields have values
- Dates must be valid (end after start)
- Check browser console for errors (F12)

## 📱 Mobile Admin Access

The admin portal is fully responsive:
- Login page works on mobile
- Dashboard adapts to small screens
- Forms have touch-friendly inputs
- Tabs scroll horizontally on mobile

Best practices:
- Use landscape mode for forms
- Edit coordinates on desktop (easier)
- Preview changes on desktop 3D map

## 🔄 Workflow Examples

### Adding a Full Event Series

1. Create locations (if needed):
   - Main venue
   - Breakout rooms
   - Reception area

2. Create main event
3. Clone for multiple sessions:
   - Copy event details
   - Update dates and times
   - Assign to different locations

### Managing Large Events

For events with multiple sessions:
- Create parent event (e.g., "Conference 2026")
- Use tags to group related events
- Use consistent naming (e.g., "Conference 2026: Keynote", "Conference 2026: Workshop A")

### Regular Maintenance

Weekly:
- Remove past events
- Update occupancy numbers
- Add new upcoming events

Monthly:
- Review location capacities
- Update event colors/branding
- Check for broken links/images

## 📊 Best Practices

1. **Event Titles**: Be descriptive but concise (max 60 chars)
2. **Descriptions**: Short = 1 sentence, Full = 2-3 paragraphs
3. **Start Times**: Include buffer time for setup
4. **Tags**: Use 3-5 tags per event, avoid redundancy
5. **Colors**: Test on both light and dark mode
6. **Locations**: Create locations before events
7. **Backup**: Export data weekly in production

## 🚀 Future Enhancements

Planned features:
- [ ] Bulk import/export (CSV, JSON)
- [ ] Event templates
- [ ] Recurring events
- [ ] Image upload for event banners
- [ ] Email notifications
- [ ] Attendance tracking
- [ ] Multi-admin support with roles
- [ ] Audit log of changes
- [ ] Draft/published event status
- [ ] Event categories (beyond types)

---

**Need Help?**
- Check browser console for errors
- Review form validation messages
- See README.md for technical details
- Contact system administrator for access issues
