'use client';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(
  () => import('@/components/map/MapComponent'), 
  { 
    ssr: false,
    loading: () => <p>Loading map...</p>
  }
);

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <MapComponent />
    </main>
  );
}