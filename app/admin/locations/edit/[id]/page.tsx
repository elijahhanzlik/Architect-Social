'use client';

import { use, useEffect, useMemo } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LocationForm } from '@/components/LocationForm';
import { useAdminStore } from '@/lib/adminStore';

export default function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { locations, loadData } = useAdminStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const location = useMemo(() => {
    return locations.find((l) => l.id === id);
  }, [id, locations]);

  if (!location) {
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
      <LocationForm location={location} mode="edit" />
    </ProtectedRoute>
  );
}
