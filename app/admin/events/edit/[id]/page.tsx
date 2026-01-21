import { UPCOMING_ACTIVITIES } from '@/lib/mockData';
import EditEventClient from './EditEventClient';

export function generateStaticParams() {
  return UPCOMING_ACTIVITIES.map((activity) => ({
    id: activity.id,
  }));
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  return <EditEventClient params={params} />;
}
