import type { FavoriteOfferAuth, Offer } from '../../types/offers';
import PremiumTitle from '../premium-title/premium-title';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import {memo, useState} from 'react';
import { changeFavoriteOffers, setNumberOffer, setSelectCard } from '../../store/action';
import { Link } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-process/types-user-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import getPrefixClass from '../../hooks/getPrefixClass';
import { history } from '../../types/history';

function OfferCard(props: Offer): JSX.Element {
  const dispatch = useAppDispatch();
  const locationName = window.location.pathname;
  const [isActiveButton, setActiveButton] = useState(props.isFavorite);
  const [isActiveCard, setActiveCard] = useState(false);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  function enterCardMouse (){
    if(!locationName.includes('offer')){
      dispatch(setSelectCard(props.location));
    }
  }
  function leaveCardMouse (){
    if(!locationName.includes('offer')){
      dispatch(setSelectCard(null));
    }
  }
  function listenChoice (){
    dispatch(setNumberOffer(props.id));
  }
  function selectFavoritesOffer (){
    if(authorizationStatus === AuthorizationStatus.NoAuth){
      history.push(AppRoute.Login);
    } else if(authorizationStatus === AuthorizationStatus.Auth) {
      setActiveButton(!isActiveButton);
      const favoriteOffer: FavoriteOfferAuth = {
        id: props.id,
        status: isActiveButton ? 0 : 1,
      };
      dispatch(changeFavoriteOffers(favoriteOffer));
    }
  }

  return (
    <article className={`${!(locationName.includes('favorites')) && !(locationName.includes(AppRoute.Property)) ? `${getPrefixClass(locationName)}place-` : getPrefixClass(locationName)}card place-card`} onMouseOver={() => setActiveCard(!isActiveCard)} onMouseEnter={enterCardMouse} onMouseLeave={leaveCardMouse}>
      {props.isPremium === false ? null : <PremiumTitle/>}
      <div className={`${getPrefixClass(locationName)}image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={props.previewImage} width={locationName.includes('favorites') ? 150 : 260} height={locationName.includes('favorites') ? 110 : 200} alt={props.title} />
        </a>
      </div>
      <div className={`${locationName.includes('favorites') ? `${getPrefixClass(locationName)}card-info ` : ''}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{props.price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isActiveButton === false ? '' : 'place-card__bookmark-button--active'}`} type="button" onClick={selectFavoritesOffer}>
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(props.rating) * 10 * 2}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Property}/${props.id}`} onClick={listenChoice}>{props.title}</Link>
        </h2>
        <p className="place-card__type">{props.type}</p>
      </div>
    </article>
  );
}

export default memo(OfferCard, (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite);
