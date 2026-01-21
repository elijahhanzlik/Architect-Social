'use client';

import { useState, useMemo, useEffect } from 'react';
import { useAdminStore } from '@/lib/adminStore';
import { ActivityCard } from '@/components/ActivityCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { Search, Filter } from 'lucide-react';
import { ActivityType } from '@/lib/types';

const ACTIVITY_TYPES: ActivityType[] = ['LECTURE', 'LAB_WORK', 'EXHIBITION', 'SOCIAL', 'RESEARCH'];

export default function CalendarPage() {
  const { searchQuery, setSearchQuery, filterType, setFilterType } = useAppStore();
  const { activities, loadData } = useAdminStore();
  const [viewMode, setViewMode] = useState<'all' | 'upcoming'>('all');

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      // Filter by search query
      const matchesSearch =
        searchQuery === '' ||
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter by type
      const matchesType = !filterType || activity.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [activities, searchQuery, filterType]);

  return (
    <div className="min-h-screen bg-slate-50 pt-[57px] dark:bg-slate-950 lg:pt-0">
      {/* Header */}
      <header className="sticky top-[57px] z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 lg:top-0">
        <div className="px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Activity Calendar
              </h1>
              <p className="mt-1 font-mono text-sm text-slate-500 dark:text-slate-400">
                {filteredActivities.length} event{filteredActivities.length !== 1 ? 's' : ''} scheduled
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search events, tags, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={filterType === null ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterType(null)}
                  >
                    All
                  </Badge>
                  {ACTIVITY_TYPES.map((type) => (
                    <Badge
                      key={type}
                      variant={filterType === type ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setFilterType(type)}
                    >
                      {type.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Calendar Grid */}
      <main className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {filteredActivities.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
                No events found
              </p>
              <p className="mt-1 font-mono text-sm text-slate-500 dark:text-slate-400">
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
