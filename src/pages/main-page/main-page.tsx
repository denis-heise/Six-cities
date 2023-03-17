import CardList from '../../components/offers-list/offers-list';
import type { Offer } from '../../types/offers';
import Map from '../../components/map/map';
import {CitiesList} from '../../components/cities-list/cities-list';
import { cities } from '../../mocks/cities';
import { AppRoute } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffersCity } from '../../store/site-process/types-site-process';
import EmptyMainPage from '../../components/main-empty/main-empty';
import { useEffect, useState } from 'react';
import { getIsOffersLoading } from '../../store/site-data/types-site-data';
import { fetchOffers, setSelectCard } from '../../store/action';

type MainProps = {
  offersMain: Offer[];
};

function Main ({offersMain}: MainProps): JSX.Element {
  const dispatch = useAppDispatch();
  const locationName = window.location.pathname;
  const isOffersCity = useAppSelector(getOffersCity);
  const [isAvailabilityOffers, setAvailabilityOffers] = useState(false);
  const offersCity = locationName.includes(AppRoute.Property) ? offersMain : offersMain.filter((offer) => offer.city.name === isOffersCity.name);
  const isOffersLoading = useAppSelector(getIsOffersLoading);

  useEffect(()=> {
    dispatch(fetchOffers());
    dispatch(setSelectCard(null));
  }, []);

  useEffect(()=> {
    setTimeout(()=>{
      setAvailabilityOffers(offersCity.length === 0);
    }, 800);
  }, [offersCity]);

  return(
    <div>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" /></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" /></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" /></symbol></svg>
      </div>
      <div className="page page--gray page--main">
        <main className={`page__main page__main--index ${isAvailabilityOffers && isOffersLoading ? 'page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList cityProps={cities}/>
            </section>
          </div>
          <div className="cities">
            {isAvailabilityOffers && isOffersLoading ? <EmptyMainPage nameCity={isOffersCity}/> : (
              <div className="cities__places-container container">
                <CardList offersList={offersCity}/>
                <div className="cities__right-section">
                  <Map dataMap={offersCity}/>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
