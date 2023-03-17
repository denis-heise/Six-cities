import type { Offer } from '../../types/offers';
import OfferCard from '../offer-card/offer-card';
import { useAppSelector } from '../../hooks/index';
import { getIsOffersLoading } from '../../store/site-data/types-site-data';
import { getOffersCity, getSortOffers } from '../../store/site-process/types-site-process';
import { Sort } from '../sort/sort';
import sortData from '../../hooks/sortData';
import { Fragment, memo } from 'react';
import { AppRoute } from '../../utils/const';
import Spinner from '../spinner/spinner';

type CardListProps = {
  offersList: Offer[];
};

function CardList ({ offersList }: CardListProps): JSX.Element {
  const locationName = window.location.pathname;
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const isOffersSort = useAppSelector(getSortOffers);
  const isOffersCity = useAppSelector(getOffersCity);
  const topElement = document.querySelector('.places');
  if(topElement) {
    topElement.scrollTop = 0;
  }

  if(isOffersLoading){
    return <Spinner/>;
  }

  return (
    <section className={`${locationName.includes(AppRoute.Property) ? 'near-' : 'cities__'}places places`}>
      <h2 className="visually-hidden">Places</h2>
      {(!locationName.includes(AppRoute.Property)) && (
        <Fragment>
          <b className="places__found">{offersList.length} places to stay in {isOffersCity && isOffersCity.name}</b>
          <Sort/>
        </Fragment>
      )}
      <ul className={`${locationName.includes(AppRoute.Property) ? 'near-places__' : 'cities__places-'}list tabs__content places__list`}>
        {sortData(offersList, isOffersSort).map((offer) => (
          <OfferCard key={offer.id} {...offer} />
        ))}
      </ul>
    </section>
  );
}

export default memo(CardList, (prevProps, nextProps) => prevProps.offersList.length === nextProps.offersList.length);
