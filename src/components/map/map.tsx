import type { Offer } from '../../types/offers';
import {useRef, useEffect} from 'react';
import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import {AppRoute, ICON_ANCHOR, ICON_SIZE, URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLocationOffer, getNumberOffer, getOffersCity } from '../../store/site-process/types-site-process';
import { setSelectCard } from '../../store/action';

type MapProps = {
  dataMap: Offer[];
  dataOffer?: Offer | null;
};

export default function Map({dataMap, dataOffer}: MapProps) {
  const dispatch = useAppDispatch();
  const locationName = window.location.pathname;
  const mapRef = useRef(null);
  const isOffersCity = useAppSelector(getOffersCity);
  const isSelectOffer = useAppSelector(getLocationOffer);
  const numberOffer = useAppSelector(getNumberOffer);
  const map = useMap(mapRef, isOffersCity);
  const arrayOffers = dataMap.filter((offer) => offer.city.name === isOffersCity.name);
  const arrayLocationOffers = arrayOffers.map((item) => item.location);
  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR,
  });
  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR,
  });

  if(locationName.includes(AppRoute.Property) && dataOffer){
    dispatch(setSelectCard(dataOffer.location));
    arrayLocationOffers.push(dataOffer.location);
  }

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      arrayLocationOffers.map((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        },
        {
          icon: (point.latitude === isSelectOffer?.latitude && point.longitude === isSelectOffer?.longitude)
            ? currentCustomIcon
            : defaultCustomIcon,
        }
        )
          .addTo(map);
        markers.push(marker);
      });
    }

    return () => {
      if(map){
        markers.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    };
  }, [map, dataMap, dataOffer, isSelectOffer]);

  return (
    <section key={locationName.includes(AppRoute.Property) ? `${isOffersCity.name}-${numberOffer}` : isOffersCity.name} className={`${locationName.includes(AppRoute.Property) ? 'property' : 'cities'}__map map`} style={{height: '500px'}} ref={mapRef}/>
  );
}
