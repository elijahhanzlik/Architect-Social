'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LocationForm } from '@/components/LocationForm';

export default function NewLocationPage() {
  return (
    <ProtectedRoute>
      <LocationForm mode="create" />
    </ProtectedRoute>
  );
}
