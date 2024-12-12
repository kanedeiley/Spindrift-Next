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
      <h1 className="text-2xl mb-4">My Leaflet Map</h1>
      <MapComponent />
    </main>
  );
}