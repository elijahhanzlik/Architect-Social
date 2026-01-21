import { create } from 'zustand';
import { Activity, LocationNode } from './types';
import { UPCOMING_ACTIVITIES, CAMPUS_LOCATIONS } from './mockData';

interface AdminState {
  activities: Activity[];
  locations: LocationNode[];
  
  // Activity CRUD
  addActivity: (activity: Activity) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  
  // Location CRUD
  addLocation: (location: LocationNode) => void;
  updateLocation: (id: string, location: Partial<LocationNode>) => void;
  deleteLocation: (id: string) => void;
  
  // Persistence
  loadData: () => void;
  saveData: () => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  activities: UPCOMING_ACTIVITIES,
  locations: CAMPUS_LOCATIONS,

  addActivity: (activity) => {
    set((state) => ({
      activities: [...state.activities, activity],
    }));
    get().saveData();
  },

  updateActivity: (id, updates) => {
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity
      ),
    }));
    get().saveData();
  },

  deleteActivity: (id) => {
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id),
    }));
    get().saveData();
  },

  addLocation: (location) => {
    set((state) => ({
      locations: [...state.locations, location],
    }));
    get().saveData();
  },

  updateLocation: (id, updates) => {
    set((state) => ({
      locations: state.locations.map((location) =>
        location.id === id ? { ...location, ...updates } : location
      ),
    }));
    get().saveData();
  },

  deleteLocation: (id) => {
    set((state) => ({
      locations: state.locations.filter((location) => location.id !== id),
    }));
    get().saveData();
  },

  loadData: () => {
    if (typeof window !== 'undefined') {
      const savedActivities = localStorage.getItem('adminActivities');
      const savedLocations = localStorage.getItem('adminLocations');
      
      if (savedActivities) {
        set({ activities: JSON.parse(savedActivities) });
      }
      if (savedLocations) {
        set({ locations: JSON.parse(savedLocations) });
      }
    }
  },

  saveData: () => {
    if (typeof window !== 'undefined') {
      const { activities, locations } = get();
      localStorage.setItem('adminActivities', JSON.stringify(activities));
      localStorage.setItem('adminLocations', JSON.stringify(locations));
    }
  },
}));
