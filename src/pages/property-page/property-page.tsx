import Form from '../../components/form/form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import CardList from '../../components/offers-list/offers-list';
import { fetchComments, fetchOffer, fetchNearbyOffers, changeFavoriteOffers, sendComment } from '../../store/action';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffer, selectComments, getNearbyOffers, getFavoriteOffers, getIsOffersLoading } from '../../store/site-data/types-site-data';
import { getAuthorizationStatus } from '../../store/user-process/types-user-process';
import ImageList from '../../components/image-list/image-list';
import ListGoods from '../../components/list-goods/list-goods';
import DescriptionList from '../../components/description-list/description-list';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import { FavoriteOfferAuth } from '../../types/offers';
import { useParams } from 'react-router-dom';
import { CommentAuth } from '../../types/comment';
import Spinner from '../../components/spinner/spinner';
import { history } from '../../types/history';

function Property (): JSX.Element | null{
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;
  const locationName = window.location.pathname;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOfferCity = useAppSelector(getOffer);
  const isCommentsOffer = useAppSelector(selectComments);
  const isNearbyOffers = useAppSelector(getNearbyOffers);
  const [isActiveButton, setActiveButton] = useState(false);
  const isFavoriteOffers = useAppSelector(getFavoriteOffers);
  const isOffersLoading = useAppSelector(getIsOffersLoading);

  useEffect(()=>{
    if(getFavoriteOffers.length !== 0){
      isFavoriteOffers.map((offer) => {
        if(offer.id === Number(id)){
          setActiveButton(!isActiveButton);
        }
      });
    }
  }, []);

  useEffect(() => {
    if(id){
      dispatch(fetchOffer(Number(id)));
      dispatch(fetchComments(Number(id)));
      dispatch(fetchNearbyOffers(Number(id)));
      window.scrollTo({ top: 0 });
    }
  }, [locationName]);

  function selectFavoritesOffer (){
    if(authorizationStatus === AuthorizationStatus.NoAuth){
      history.push(AppRoute.Login);
    } else if(authorizationStatus === AuthorizationStatus.Auth) {
      setActiveButton(!isActiveButton);

      const favoriteOffer: FavoriteOfferAuth = {
        id: Number(id),
        status: isActiveButton ? 0 : 1,
      };
      dispatch(changeFavoriteOffers(favoriteOffer));
    }
  }

  function heandlerSubmit (newComment: CommentAuth){
    dispatch(sendComment(newComment));
  }

  if(isOffersLoading){
    return <Spinner/>;
  }

  if(!isOfferCity){
    return null;
  }

  return(
    <main className="page__main page__main--property">
      {isOfferCity && (
        <section className="property">
          <ImageList imgOffer={isOfferCity}/>
          <div className="property__container container">
            <div className="property__wrapper">
              {isOfferCity.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {isOfferCity.title}
                </h1>
                <button className={`property__bookmark-button button ${isActiveButton === false ? '' : 'property__bookmark-button--active'}`} type="button" onClick={selectFavoritesOffer}>
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${typeof isOfferCity.rating !== 'undefined' ? Math.round(isOfferCity.rating) * 10 * 2 : '0'}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{typeof isOfferCity.rating !== 'undefined' ? isOfferCity.rating : '0'}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {isOfferCity.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {isOfferCity.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {isOfferCity.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{isOfferCity.price}</b>
                <span className="property__price-text"> night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ListGoods propListGoods={isOfferCity}/>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${isOfferCity.host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
                    <img className="property__avatar user__avatar" src={isOfferCity.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {isOfferCity.host.name}
                  </span>
                  {isOfferCity.host.isPro && (
                    <span className="property__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <DescriptionList propListDescription={isOfferCity}/>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews · <span className="reviews__amount">{isCommentsOffer.length}</span></h2>
                <ReviewsList commentsList={isCommentsOffer}/>
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Form onSubmitForm={heandlerSubmit}/>
                )}
              </section>
            </div>
          </div>
          <Map dataMap={isNearbyOffers} dataOffer={isOfferCity}/>
        </section>
      )}

      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <CardList offersList={isNearbyOffers}/>
        </section>
      </div>
    </main>
  );
}

export default memo(Property);
