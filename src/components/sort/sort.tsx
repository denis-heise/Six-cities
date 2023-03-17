import {useState} from 'react';
import { Sorting } from '../../utils/const';
import {SortName} from '../../types/offers';
import { setSorting } from '../../store/action';
import { useAppDispatch } from '../../hooks';

export function Sort ():JSX.Element{
  const dispatch = useAppDispatch();
  const [isActiveSort, setActiveSort] = useState(false);
  const [isSelectSort, setSelectSort] = useState('Popular');

  const handleSortItemClick = (title: string) => {
    setSelectSort(title);
    dispatch(setSorting(title));
    setActiveSort(false);
  };

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setActiveSort(!isActiveSort)}>
        {isSelectSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActiveSort ? ' places__options--opened' : ''}`}>
        {(Object.entries(Sorting) as [SortName, Sorting][]).map(([name, title]) => (
          <li
            key={name}
            className={`places__option${title === isSelectSort ? ' places__option--active' : ''}`}
            onClick={() => handleSortItemClick(title)}
            tabIndex={0}
          >
            {title}
          </li>
        ))}
      </ul>
    </form>
  );
}
