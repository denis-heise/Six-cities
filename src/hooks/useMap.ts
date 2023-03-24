import {useEffect, useState, MutableRefObject} from 'react';
import {Map, tileLayer} from 'leaflet';
import { City } from '../types/offers';
import { LEAFLET_MAP_SETTINGS } from '../utils/const';
import { useLocation } from 'react-router-dom';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, cityName: City ): Map | null {
  const locationName = useLocation().pathname;
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    setMap(null);
  }, [cityName, locationName]);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const newMap = new Map(mapRef.current, {
        center: {
          lat: cityName.location.latitude,
          lng: cityName.location.longitude,
        },
        zoom: cityName.location.zoom,
      });

      tileLayer(
        LEAFLET_MAP_SETTINGS.TILE_LAYER,
        {
          attribution: LEAFLET_MAP_SETTINGS.ATTRIBUTION,
        },
      ).addTo(newMap);
      setMap(newMap);
      mapRef.current = null;
    }
  }, [map, mapRef, cityName, locationName]);

  return map;
}
