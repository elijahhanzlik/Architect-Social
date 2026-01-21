'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { EventForm } from '@/components/EventForm';

export default function NewEventPage() {
  return (
    <ProtectedRoute>
      <EventForm mode="create" />
    </ProtectedRoute>
  );
}
