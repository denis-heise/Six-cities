import type { Hotel } from '../../types/offers';
import { useRef, useEffect } from 'react';
import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { AppRoute, ICON_ANCHOR, ICON_SIZE, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLocationOffer, getNumberOffer, getOffersCity } from '../../store/site-process/types-site-process';
import { setNumberOffer, setSelectCard } from '../../store/action';
import { useLocation } from 'react-router-dom';
import { history } from '../../types/history';

type MapProps = {
  dataMap: Hotel[];
  dataOffer?: Hotel | null;
};

export default function Map({ dataMap, dataOffer }: MapProps) {
  const dispatch = useAppDispatch();
  const locationName = useLocation().pathname;
  const mapRef = useRef(null);
  const isOffersCity = useAppSelector(getOffersCity);
  const isSelectOffer = useAppSelector(getLocationOffer);
  const numberOffer = useAppSelector(getNumberOffer);
  const map = useMap(mapRef, isOffersCity);

  const arrayOffers = dataMap.filter((offer) => offer.city.name === isOffersCity.name);

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

  useEffect(() => {
    if (locationName.includes(AppRoute.Property) && dataOffer) {
      dispatch(setSelectCard(dataOffer.location));
    }
  }, [dispatch, locationName, dataOffer]);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      arrayOffers.forEach((offer) => {
        const marker = new Marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: (offer.location.latitude === isSelectOffer?.latitude && offer.location.longitude === isSelectOffer?.longitude)
              ? currentCustomIcon
              : defaultCustomIcon,
          }
        ).addTo(map);

        marker.on('mouseover', () => {
          dispatch(setSelectCard(offer.location));
        });

        marker.on('mouseout', () => {
          dispatch(setSelectCard(null));
        });

        marker.on('click', () => {
          dispatch(setNumberOffer(offer.id));
          history.push(`${AppRoute.Property}/${offer.id}`);
        });

        markers.push(marker);
      });

      if (locationName.includes(AppRoute.Property) && dataOffer) {
        const propertyMarker = new Marker(
          {
            lat: dataOffer.location.latitude,
            lng: dataOffer.location.longitude,
          },
          {
            icon: currentCustomIcon,
          }
        ).addTo(map);
        markers.push(propertyMarker);
      }
    }

    return () => {
      if (map) {
        markers.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    };
  }, [map, arrayOffers, isSelectOffer, currentCustomIcon, defaultCustomIcon, dataOffer, locationName, dispatch]);

  return (
    <section
      key={locationName.includes(AppRoute.Property) ? `${isOffersCity.name}-${numberOffer}` : isOffersCity.name}
      className={`${locationName.includes(AppRoute.Property) ? 'property' : 'cities'}__map map`}
      style={{ height: '500px' }}
      ref={mapRef}
    />
  );
}
