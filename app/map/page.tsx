'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/lib/store';
import { useAdminStore } from '@/lib/adminStore';
import { Badge } from '@/components/ui/badge';

// Dynamically import Maastricht Campus 3D with no SSR
const MaastrichtCampus3D = dynamic(
  () => import('@/components/MaastrichtCampus3D').then((mod) => ({ default: mod.MaastrichtCampus3D })),
  { ssr: false }
);

export default function MapPage() {
  const { selectedActivity } = useAppStore();
  const { locations, loadData } = useAdminStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const location = selectedActivity 
    ? locations.find((loc) => loc.id === selectedActivity.locationId)
    : null;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-50 pt-[57px] dark:bg-slate-950 lg:pt-0">
      {/* Header */}
      <header className="absolute left-0 right-0 top-[57px] z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 lg:top-0">
        <div className="px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Campus Map
              </h1>
              <p className="mt-1 font-mono text-sm text-slate-500 dark:text-slate-400">
                Interactive 3D visualization
              </p>
            </div>

            {selectedActivity && (
              <div className="hidden max-w-sm space-y-2 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:block">
                <Badge 
                  style={{ backgroundColor: selectedActivity.visuals.accentColor }}
                  className="text-white"
                >
                  Selected
                </Badge>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {selectedActivity.title}
                </p>
                {location && (
                  <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                    {location.name} · Floor {location.floorLevel}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 3D Canvas */}
      <div className="h-full w-full pt-[100px] sm:pt-[120px]">
        <MaastrichtCampus3D />
      </div>

      {/* Legend */}
      <div className="absolute bottom-20 left-4 z-20 rounded-lg border border-slate-200 bg-white/95 p-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 sm:bottom-6 sm:left-6 sm:p-4">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Legend
        </p>
        <div className="space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-slate-400" />
            <span className="text-slate-600 dark:text-slate-400">Building Structure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-slate-600 dark:text-slate-400">Active Events</span>
          </div>
        </div>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-20 right-4 z-20 rounded-lg border border-slate-200 bg-white/95 p-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 sm:bottom-6 sm:right-6 sm:p-4">
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Controls
        </p>
        <div className="space-y-1 font-mono text-xs text-slate-600 dark:text-slate-400">
          <p>• Click & drag to rotate</p>
          <p>• Scroll to zoom</p>
          <p>• Click marker to select</p>
        </div>
      </div>
    </div>
  );
}
