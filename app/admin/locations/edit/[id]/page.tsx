import { MAASTRICHT_CAMPUS_LOCATIONS } from '@/lib/mockData';
import EditLocationClient from './EditLocationClient';

export function generateStaticParams() {
  return MAASTRICHT_CAMPUS_LOCATIONS.map((location) => ({
    id: location.id,
  }));
}

export default function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
  return <EditLocationClient params={params} />;
}
