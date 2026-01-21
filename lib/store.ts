import { create } from 'zustand';
import { Activity } from './types';

interface AppState {
  selectedActivity: Activity | null;
  setSelectedActivity: (activity: Activity | null) => void;
  filterType: string | null;
  setFilterType: (type: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedActivity: null,
  setSelectedActivity: (activity) => set({ selectedActivity: activity }),
  filterType: null,
  setFilterType: (type) => set({ filterType: type }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
