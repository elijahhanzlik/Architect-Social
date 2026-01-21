'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { adminAuth } from '@/lib/adminAuth';
import { useAdminStore } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LogOut, 
  Calendar, 
  Map, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink,
  Activity as ActivityIcon
} from 'lucide-react';
import { Activity, LocationNode, ActivityType } from '@/lib/types';

const TYPE_COLORS: Record<ActivityType, string> = {
  LECTURE: 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100',
  LAB_WORK: 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100',
  EXHIBITION: 'bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-100',
  SOCIAL: 'bg-pink-100 text-pink-900 dark:bg-pink-900/30 dark:text-pink-100',
  RESEARCH: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100',
};

function EventsList({ 
  onEdit, 
  onDelete 
}: { 
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}) {
  const { activities, locations } = useAdminStore();

  return (
    <div className="space-y-3">
      {activities.map((activity) => {
        const location = locations.find((loc) => loc.id === activity.locationId);
        return (
          <Card key={activity.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {activity.title}
                    </h3>
                    <Badge className={TYPE_COLORS[activity.type]}>
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {activity.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 font-mono text-xs text-slate-500">
                    <span>{new Date(activity.startTime).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{location?.name || 'Unknown Location'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(activity)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this event?')) {
                        onDelete(activity.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function LocationsList({ 
  onEdit, 
  onDelete 
}: { 
  onEdit: (location: LocationNode) => void;
  onDelete: (id: string) => void;
}) {
  const { locations } = useAdminStore();

  return (
    <div className="space-y-3">
      {locations.map((location) => (
        <Card key={location.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {location.name}
                </h3>
                <div className="flex flex-wrap gap-2 font-mono text-xs text-slate-500">
                  <span>Floor {location.floorLevel}</span>
                  <span>•</span>
                  <span>Capacity: {location.capacity}</span>
                  <span>•</span>
                  <span>
                    Coordinates: ({location.coordinates.x}, {location.coordinates.y}, {location.coordinates.z})
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onEdit(location)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this location?')) {
                      onDelete(location.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DashboardContent() {
  const router = useRouter();
  const { activities, locations, loadData } = useAdminStore();
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = () => {
    adminAuth.logout();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100">
                <ActivityIcon className="h-5 w-5 text-white dark:text-slate-900" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Admin Dashboard
                </h1>
                <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  Manage events and locations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/calendar" target="_blank">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </Link>
              <Link href="/map" target="_blank">
                <Button variant="outline" size="sm">
                  <Map className="mr-2 h-4 w-4" />
                  View 3D Map
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Events</CardDescription>
              <CardTitle className="text-3xl">{activities.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Locations</CardDescription>
              <CardTitle className="text-3xl">{locations.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Upcoming</CardDescription>
              <CardTitle className="text-3xl">
                {activities.filter((a) => new Date(a.startTime) > new Date()).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-3xl">
                {activities.filter((a) => {
                  const start = new Date(a.startTime);
                  const weekFromNow = new Date();
                  weekFromNow.setDate(weekFromNow.getDate() + 7);
                  return start > new Date() && start < weekFromNow;
                }).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Manage Events
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Add, edit, or remove events from the schedule
                </p>
              </div>
              <Link href="/admin/events/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </Link>
            </div>

            {activities.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-slate-400" />
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                    No events yet. Click &quot;Add Event&quot; to create one.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <EventsList
                onEdit={(activity) => router.push(`/admin/events/edit/${activity.id}`)}
                onDelete={(id) => useAdminStore.getState().deleteActivity(id)}
              />
            )}
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Manage Locations
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Add, edit, or remove campus locations
                </p>
              </div>
              <Link href="/admin/locations/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Location
                </Button>
              </Link>
            </div>

            {locations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Map className="h-12 w-12 text-slate-400" />
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                    No locations yet. Click &quot;Add Location&quot; to create one.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <LocationsList
                onEdit={(location) => router.push(`/admin/locations/edit/${location.id}`)}
                onDelete={(id) => useAdminStore.getState().deleteLocation(id)}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
