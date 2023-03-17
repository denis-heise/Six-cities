import { memo } from 'react';
import {CityName} from '../../types/offers';

type CityProps = {
  oneCity: CityName;
  isActiveCity: boolean;
  onClick: (name: CityName) => void;
};

function CityItem ({oneCity, isActiveCity, onClick}: CityProps): JSX.Element {

  const selectCity = () => {
    onClick(oneCity);
  };

  return(
    <li className="locations__item">
      <div className={`locations__item-link tabs__item${isActiveCity ? ' tabs__item--active' : ''}`} style={{cursor: 'pointer'}} role="button" tabIndex={0} onClick={selectCity}>
        <span>{oneCity}</span>
      </div>
    </li>
  );
}

export default memo(CityItem);
