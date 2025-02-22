'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import useSWR from 'swr';


let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center?: [number, number];
  zoom?: number;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface Bounds {
  _southWest: LatLng;
  _northEast: LatLng;
}


  const fetchData = async(url: string) =>{
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Failed to fetch data")
    }
    return response.json()
    }
    
    
const MapComponent: React.FC<MapProps> = ({
    center = [51.505, -0.09],
    zoom = 13
  }) => {
      const [bounds, setBounds] = useState<Bounds | null>(null);
      const boundsRef = useRef<Bounds | null>(null);
  
      const { data: spots, isValidating } = useSWR(
          bounds
            ? `/api/bounds?southWestLat=${bounds._southWest.lat}&southWestLng=${bounds._southWest.lng}&northEastLat=${bounds._northEast.lat}&northEastLng=${bounds._northEast.lng}`
            : null,
          fetchData
      );
     
      const BoundsFetcher: React.FC = () => {
          const map = useMap();
     
          const shouldUpdateBounds = useCallback((newBounds: Bounds) => {
              // Compare new bounds with previous bounds
              if (!boundsRef.current) return true;
  
              const oldBounds = boundsRef.current;
              const boundsChanged = 
                  Math.abs(newBounds._southWest.lat - oldBounds._southWest.lat) > 0.01 ||
                  Math.abs(newBounds._southWest.lng - oldBounds._southWest.lng) > 0.01 ||
                  Math.abs(newBounds._northEast.lat - oldBounds._northEast.lat) > 0.01 ||
                  Math.abs(newBounds._northEast.lng - oldBounds._northEast.lng) > 0.01;
  
              return boundsChanged;
          }, []);
  
          useEffect(() => {
              // Dispatch resize to handle any initial map rendering issues
              window.dispatchEvent(new Event('resize'));
  
              // Throttle function to limit updates
              const updateBounds = () => {
                  const currentBounds = map.getBounds();
                  const newBounds = {
                      _southWest: {
                          lat: currentBounds.getSouthWest().lat,
                          lng: currentBounds.getSouthWest().lng,
                      },
                      _northEast: {
                          lat: currentBounds.getNorthEast().lat,
                          lng: currentBounds.getNorthEast().lng,
                      },
                  };
  
                  // Only update if bounds have changed significantly
                  if (shouldUpdateBounds(newBounds)) {
                      boundsRef.current = newBounds;
                      setBounds(newBounds);
                  }
              };
  
              // Update bounds when the map moves or zooms
              map.on('moveend', updateBounds);
              map.on('zoomend', updateBounds);
  
              // Initial bounds fetch
              updateBounds();
  
              // Cleanup event listeners on unmount
              return () => {
                  map.off('moveend', updateBounds);
                  map.off('zoomend', updateBounds);
              };
          }, [map, shouldUpdateBounds]);
  
          return null;
      };
      
        
          return (
              <div className="h-[500px] w-full">
                  <MapContainer
                      center={center}
                      zoom={zoom}
                      scrollWheelZoom={false}
                      className="h-full w-full z-0"
                      style={{ height: '100%', width: '100%' }}
                  >
                      <TileLayer
                          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                      />
                      <BoundsFetcher />
                      <Marker position={center}>
                          <Popup>
                              A pretty CSS3 popup. <br /> Easily customizable.
                          </Popup>
                      </Marker>
                  </MapContainer>
              </div>
          );
      };
      
      export default MapComponent;