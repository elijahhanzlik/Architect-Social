'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, ActivityType } from '@/lib/types';
import { useAdminStore } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface EventFormProps {
  event?: Activity;
  mode: 'create' | 'edit';
}

const ACTIVITY_TYPES: ActivityType[] = ['LECTURE', 'LAB_WORK', 'EXHIBITION', 'SOCIAL', 'RESEARCH'];

export function EventForm({ event, mode }: EventFormProps) {
  const router = useRouter();
  const { locations, addActivity, updateActivity } = useAdminStore();

  const [formData, setFormData] = useState<Partial<Activity>>({
    id: event?.id || `evt_${Date.now()}`,
    title: event?.title || '',
    shortDescription: event?.shortDescription || '',
    fullDescription: event?.fullDescription || '',
    type: event?.type || 'LECTURE',
    locationId: event?.locationId || locations[0]?.id || '',
    startTime: event?.startTime || new Date().toISOString().slice(0, 16),
    endTime: event?.endTime || new Date().toISOString().slice(0, 16),
    visuals: {
      heroImage: event?.visuals.heroImage || '/assets/events/default.webp',
      accentColor: event?.visuals.accentColor || '#3B82F6',
      icon: event?.visuals.icon || 'calendar',
    },
    tags: event?.tags || [],
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create') {
      addActivity(formData as Activity);
    } else {
      updateActivity(formData.id!, formData);
    }

    router.push('/admin/dashboard');
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag),
    });
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
                {mode === 'create' ? 'Add New Event' : 'Edit Event'}
              </h1>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {mode === 'create' ? 'Create a new event' : 'Update event details'}
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
              <CardDescription>Event title, description, and type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Event Title *
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Synthetic Biology Symposium"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="shortDescription" className="text-sm font-medium">
                  Short Description *
                </label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief overview (shown on cards)"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="fullDescription" className="text-sm font-medium">
                  Full Description *
                </label>
                <textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed event information"
                  className="min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Event Type *
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ActivityType })}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                  required
                >
                  {ACTIVITY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Date & Location */}
          <Card>
            <CardHeader>
              <CardTitle>Date & Location</CardTitle>
              <CardDescription>When and where the event takes place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="startTime" className="text-sm font-medium">
                    Start Time *
                  </label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={formData.startTime?.slice(0, 16)}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: new Date(e.target.value).toISOString() })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="endTime" className="text-sm font-medium">
                    End Time *
                  </label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={formData.endTime?.slice(0, 16)}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: new Date(e.target.value).toISOString() })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location *
                </label>
                <select
                  id="location"
                  value={formData.locationId}
                  onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                  required
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Visual Styling */}
          <Card>
            <CardHeader>
              <CardTitle>Visual Styling</CardTitle>
              <CardDescription>Colors and imagery for the event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="accentColor" className="text-sm font-medium">
                  Accent Color *
                </label>
                <div className="flex gap-2">
                  <Input
                    id="accentColor"
                    type="color"
                    value={formData.visuals?.accentColor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        visuals: { ...formData.visuals!, accentColor: e.target.value },
                      })
                    }
                    className="h-10 w-20"
                  />
                  <Input
                    type="text"
                    value={formData.visuals?.accentColor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        visuals: { ...formData.visuals!, accentColor: e.target.value },
                      })
                    }
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="icon" className="text-sm font-medium">
                  Icon Name
                </label>
                <Input
                  id="icon"
                  value={formData.visuals?.icon}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      visuals: { ...formData.visuals!, icon: e.target.value },
                    })
                  }
                  placeholder="e.g., flask-conical, calendar, sparkles"
                />
                <p className="text-xs text-slate-500">
                  Lucide icon name (see{' '}
                  <a
                    href="https://lucide.dev/icons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    lucide.dev
                  </a>
                  )
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add tags to help users filter events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>

              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
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
              {mode === 'create' ? 'Create Event' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
