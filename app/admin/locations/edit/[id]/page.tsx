'use client';

import { use, useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LocationForm } from '@/components/LocationForm';
import { useAdminStore } from '@/lib/adminStore';
import { LocationNode } from '@/lib/types';

export default function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { locations, loadData } = useAdminStore();
  const [location, setLocation] = useState<LocationNode | undefined>();

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const foundLocation = locations.find((l) => l.id === id);
    setLocation(foundLocation);
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
