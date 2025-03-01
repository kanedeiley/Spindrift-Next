'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import useSWR from 'swr';
import Link from 'next/link';
import { Button } from '../ui/button';
import debounce from 'lodash.debounce';

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
    center = [40.13139914802585, -74.03767876532524],
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
            window.dispatchEvent(new Event('resize'));
              
            const updateBounds = debounce(() => {
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

                if (shouldUpdateBounds(newBounds)) {
                    boundsRef.current = newBounds;
                    setBounds(newBounds);
                }
            }, 300); // Adjust the debounce delay as needed

            map.on('moveend', updateBounds);
            map.on('zoomend', updateBounds);

            updateBounds();

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
                      minZoom={5}
                      scrollWheelZoom={false}
                      className="h-full w-full z-0"
                      style={{ height: '100%', width: '100%' }}
                  >
                      <TileLayer
                          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                      />
                      <BoundsFetcher />
                      {spots?.map((spot, i) => {
                        const spotIcon = L.divIcon({
                            html: `<div style="
                            background-color: rgba(139, 0, 0, 0.6);
                            opacity: .8;
                            color:white;
                            padding: 5px 5px;
                            border-radius: 200px;
                            box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
                            font-size: 14px;
                            font-weight: bold;
                            text-align: center;
                            ">2-3ft</div>`,
                            className: "", 
                            iconSize: [100, 40], 
                            iconAnchor: [50, 40], 
                        });
                        return (
                        <Marker key={i} position={[spot.latitude, spot.longitude]} icon={spotIcon}>
                         <Popup className="custom-popup">
                            <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg w-64">
                            {/* Title */}
                            <h3 className="text-lg font-bold">{spot.name}</h3>

                            {/* Location info */}
                            <p className="text-sm text-gray-300">🌍</p>

                            {/* Wave rating (example dynamic data) */}
                            <p className="text-md mt-2">
                                🌊 Wave Quality: <span className="font-semibold text-yellow-400">Good</span>
                            </p>

                            {/* Forecast button */}
                            <Link href={`/forecast/${spot.id}`}>
                                <Button className="mt-3 bg-slate-500 text-white py-2 px-4 rounded-md w-full">
                                View Forecast →
                                </Button>
                            </Link>
                            </div>
                        </Popup>
                    </Marker>)}
                        )
                        }
                      
                  </MapContainer>
              </div>
          );
      };
      
      export default MapComponent;