import type { Offer } from '../../types/offers';
import OfferCard from '../../components/offer-card/offer-card';
import { getChangeFavoriteOffer, getFavoriteOffers } from '../../store/site-data/types-site-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffers } from '../../store/action';
import { Fragment, useEffect } from 'react';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

function Favorites(): JSX.Element{
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const changeFavoriteOffer = useAppSelector(getChangeFavoriteOffer);

  useEffect(()=>{
    dispatch(fetchFavoriteOffers());
  }, [changeFavoriteOffer]);

  const groupedOffersByCity = favoriteOffers.reduce<{ [key: string ]: Offer[] }>((acc, curr) => {
    if (curr.isFavorite) {
      const city = curr.city.name;

      if (!(city in acc)) {
        acc[city] = [];
      }

      acc[city].push(curr);
    }

    return acc;
  }, {});

  return(
    <Fragment>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className={`favorites ${favoriteOffers.length === 0 ? 'favorites--empty' : ''}`}>
            <h1 className={favoriteOffers.length === 0 ? 'visually-hidden' : 'favorites__title'}>{favoriteOffers.length === 0 ? 'Favorites (empty)' : 'Saved listing'}</h1>
            {favoriteOffers.length === 0 ? <FavoritesEmpty/> : (
              <ul className="favorites__list">
                {Object.entries(groupedOffersByCity).map(([city, groupedOffers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {groupedOffers.map((offer) => <OfferCard key={offer.id} {...offer} />)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </Fragment>
  );
}

export default Favorites;

