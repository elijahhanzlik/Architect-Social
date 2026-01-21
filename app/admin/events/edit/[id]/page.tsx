'use client';

import { use, useEffect, useMemo } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { EventForm } from '@/components/EventForm';
import { useAdminStore } from '@/lib/adminStore';

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { activities, loadData } = useAdminStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const event = useMemo(() => {
    return activities.find((a) => a.id === id);
  }, [id, activities]);

  if (!event) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-slate-600">Loading...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <EventForm event={event} mode="edit" />
    </ProtectedRoute>
  );
}
