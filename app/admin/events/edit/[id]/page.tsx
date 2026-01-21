'use client';

import { use, useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { EventForm } from '@/components/EventForm';
import { useAdminStore } from '@/lib/adminStore';
import { Activity } from '@/lib/types';

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { activities, loadData } = useAdminStore();
  const [event, setEvent] = useState<Activity | undefined>();

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const foundEvent = activities.find((a) => a.id === id);
    setEvent(foundEvent);
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
