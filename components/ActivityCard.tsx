'use client';

import { useEffect } from 'react';
import { Activity } from '@/lib/types';
import { useAdminStore } from '@/lib/adminStore';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
}

const TYPE_COLORS: Record<string, string> = {
  LECTURE: 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100',
  LAB_WORK: 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100',
  EXHIBITION: 'bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-100',
  SOCIAL: 'bg-pink-100 text-pink-900 dark:bg-pink-900/30 dark:text-pink-100',
  RESEARCH: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100',
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const { selectedActivity, setSelectedActivity } = useAppStore();
  const { locations, loadData } = useAdminStore();
  
  useEffect(() => {
    loadData();
  }, [loadData]);

  const location = locations.find((loc) => loc.id === activity.locationId);
  const isSelected = selectedActivity?.id === activity.id;

  const startTime = new Date(activity.startTime);
  const endTime = new Date(activity.endTime);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card
      onClick={() => setSelectedActivity(activity)}
      className={cn(
        'group cursor-pointer border border-slate-200 transition-all duration-200 hover:shadow-lg dark:border-slate-800',
        isSelected && 'ring-2 ring-slate-900 dark:ring-slate-100'
      )}
      style={{
        backgroundColor: isSelected 
          ? `${activity.visuals.accentColor}08` 
          : undefined,
      }}
    >
      <CardHeader className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {activity.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {activity.shortDescription}
            </p>
          </div>
          <Badge 
            className={cn('shrink-0 font-mono text-xs', TYPE_COLORS[activity.type])}
          >
            {activity.type.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-5 pt-0">
        {/* Metadata */}
        <div className="space-y-2 font-mono text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(startTime)}</span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span>{formatTime(startTime)} - {formatTime(endTime)}</span>
          </div>
          
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>{location.name}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5" />
              <span>
                {location.currentOccupancy}/{location.capacity} capacity
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {activity.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Accent indicator */}
        <div
          className="h-1 w-full rounded-full opacity-40 transition-opacity group-hover:opacity-100"
          style={{ backgroundColor: activity.visuals.accentColor }}
        />
      </CardContent>
    </Card>
  );
}
