import CityItem from '../city-item/city-item';
import {CityName} from '../../types/offers';
import { cities } from '../../mocks/cities';
import { setCity } from '../../store/action';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffersCity } from '../../store/site-process/types-site-process';

type CitiesProps = {
  cityProps: typeof cities;
};

export function CitiesList ({cityProps}: CitiesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isOffersCity = useAppSelector(getOffersCity);

  const handleCityClick = useCallback((name: CityName) => {
    dispatch(setCity(name));
  }, []);

  return(
    <ul className="locations__list tabs__list">
      {cityProps.map((сity) => (
        <CityItem key={сity} oneCity={сity} isActiveCity={сity === isOffersCity.name} onClick={handleCityClick}/>
      ))}
    </ul>
  );
}
