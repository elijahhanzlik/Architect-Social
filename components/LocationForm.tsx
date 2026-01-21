'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LocationNode } from '@/lib/types';
import { useAdminStore } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface LocationFormProps {
  location?: LocationNode;
  mode: 'create' | 'edit';
}

export function LocationForm({ location, mode }: LocationFormProps) {
  const router = useRouter();
  const { addLocation, updateLocation } = useAdminStore();

  const [formData, setFormData] = useState<Partial<LocationNode>>(() => ({
    id: location?.id || `loc_${Date.now()}`,
    name: location?.name || '',
    floorLevel: location?.floorLevel || 1,
    coordinates: location?.coordinates || { x: 0, y: 0, z: 0 },
    idealCameraView: location?.idealCameraView || {
      position: { x: 10, y: 15, z: 20 },
      target: { x: 0, y: 0, z: 0 },
      zoom: 1.5,
    },
    capacity: location?.capacity || 50,
    currentOccupancy: location?.currentOccupancy || 0,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create') {
      addLocation(formData as LocationNode);
    } else {
      updateLocation(formData.id!, formData);
    }

    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {mode === 'create' ? 'Add New Location' : 'Edit Location'}
              </h1>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {mode === 'create' ? 'Create a new campus location' : 'Update location details'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Location name and capacity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Location Name *
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Main Atrium / Exhibition Hall"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="floorLevel" className="text-sm font-medium">
                    Floor Level *
                  </label>
                  <Input
                    id="floorLevel"
                    type="number"
                    value={formData.floorLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, floorLevel: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="capacity" className="text-sm font-medium">
                    Capacity *
                  </label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="currentOccupancy" className="text-sm font-medium">
                    Current Occupancy
                  </label>
                  <Input
                    id="currentOccupancy"
                    type="number"
                    value={formData.currentOccupancy}
                    onChange={(e) =>
                      setFormData({ ...formData, currentOccupancy: parseInt(e.target.value) })
                    }
                    min={0}
                    max={formData.capacity}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3D Coordinates */}
          <Card>
            <CardHeader>
              <CardTitle>3D Coordinates</CardTitle>
              <CardDescription>Position in the 3D map (units)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="coordX" className="text-sm font-medium">
                    X Position *
                  </label>
                  <Input
                    id="coordX"
                    type="number"
                    step="0.1"
                    value={formData.coordinates?.x}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: {
                          ...formData.coordinates!,
                          x: parseFloat(e.target.value),
                        },
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="coordY" className="text-sm font-medium">
                    Y Position *
                  </label>
                  <Input
                    id="coordY"
                    type="number"
                    step="0.1"
                    value={formData.coordinates?.y}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: {
                          ...formData.coordinates!,
                          y: parseFloat(e.target.value),
                        },
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="coordZ" className="text-sm font-medium">
                    Z Position *
                  </label>
                  <Input
                    id="coordZ"
                    type="number"
                    step="0.1"
                    value={formData.coordinates?.z}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: {
                          ...formData.coordinates!,
                          z: parseFloat(e.target.value),
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Tip: Use the 3D map to find good coordinates. Center is (0, 0, 0).
              </p>
            </CardContent>
          </Card>

          {/* Camera View */}
          <Card>
            <CardHeader>
              <CardTitle>Ideal Camera View</CardTitle>
              <CardDescription>
                Camera position when this location is selected
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-medium">Camera Position</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label htmlFor="camPosX" className="text-sm text-slate-600">
                      X
                    </label>
                    <Input
                      id="camPosX"
                      type="number"
                      step="0.1"
                      value={formData.idealCameraView?.position.x}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          idealCameraView: {
                            ...formData.idealCameraView!,
                            position: {
                              ...formData.idealCameraView!.position,
                              x: parseFloat(e.target.value),
                            },
                          },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="camPosY" className="text-sm text-slate-600">
                      Y
                    </label>
                    <Input
                      id="camPosY"
                      type="number"
                      step="0.1"
                      value={formData.idealCameraView?.position.y}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          idealCameraView: {
                            ...formData.idealCameraView!,
                            position: {
                              ...formData.idealCameraView!.position,
                              y: parseFloat(e.target.value),
                            },
                          },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="camPosZ" className="text-sm text-slate-600">
                      Z
                    </label>
                    <Input
                      id="camPosZ"
                      type="number"
                      step="0.1"
                      value={formData.idealCameraView?.position.z}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          idealCameraView: {
                            ...formData.idealCameraView!,
                            position: {
                              ...formData.idealCameraView!.position,
                              z: parseFloat(e.target.value),
                            },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Camera Target (Look At)</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label htmlFor="camTargetX" className="text-sm text-slate-600">
                      X
                    </label>
                    <Input
                      id="camTargetX"
                      type="number"
                      step="0.1"
                      value={formData.idealCameraView?.target.x}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          idealCameraView: {
                            ...formData.idealCameraView!,
                            target: {
                              ...formData.idealCameraView!.target,
                              x: parseFloat(e.target.value),
                            },
                          },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="camTargetY" className="text-sm text-slate-600">
                      Y
                    </label>
                    <Input
                      id="camTargetY"
                      type="number"
                      step="0.1"
                      value={formData.idealCameraView?.target.y}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          idealCameraView: {
                            ...formData.idealCameraView!,
                            target: {
                              ...formData.idealCameraView!.target,
                              y: parseFloat(e.target.value),
                            },
                          },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="camTargetZ" className="text-sm text-slate-600">
                      Z
                    </label>
                    <Input
                      id="camTargetZ"
                      type="number"
                      step="0.1"
                      value={formData.idealCameraView?.target.z}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          idealCameraView: {
                            ...formData.idealCameraView!,
                            target: {
                              ...formData.idealCameraView!.target,
                              z: parseFloat(e.target.value),
                            },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="zoom" className="text-sm font-medium">
                  Zoom Level
                </label>
                <Input
                  id="zoom"
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="5"
                  value={formData.idealCameraView?.zoom}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      idealCameraView: {
                        ...formData.idealCameraView!,
                        zoom: parseFloat(e.target.value),
                      },
                    })
                  }
                />
                <p className="text-xs text-slate-500">1.0 = default, higher = closer</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Link href="/admin/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {mode === 'create' ? 'Create Location' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
