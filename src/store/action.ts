import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CityName, Location, FavoriteOfferAuth, Offer } from '../types/offers';
import { UserAuth } from '../types/authorization';
import { AppRoute } from '../utils/const';
import { Token } from '../utils/token';
import { history } from '../types/history';
import { Comment, CommentAuth } from '../types/comment';
import { hotels } from '../mocks/hotels';
import type { Hotel } from '../types/offers';

export type Extra = {
  extra: unknown;
  history: History;
};

export const Action = {
  NUMBER_FAVORITE_OFFER: 'site/number-favorite',
  SET_CITY: 'site/select-city',
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  SET_SORTING: 'site/sorting',
  SET_CARD: 'site/active-card',
  SET_AUTH: 'user/login',
  CHECK_AUTH: 'user/auth-status',
  NUMBER_OFFER: 'site/offerNumber',
  FETCH_COMMENTS: 'offer/fetch-comments',
  SEND_COMMENT: 'offer/post-comment',
  FETCH_NEARBY_OFFERS: 'offer/fetch-nearby-offers',
  LOGOUT_USER: 'user/logout',
  CHANGE_FAVORITE: 'favorite/post-favorite-offer',
  FETCH_FAVORITE_OFFERS: 'favorite/fetch-favorite-offer'
};

const setCity = createAction<CityName>(Action.SET_CITY);
const setNumberOffer = createAction<number>(Action.NUMBER_OFFER);
const setSelectCard = createAction<Location | null>(Action.SET_CARD);
const setSorting = createAction<string>(Action.SET_SORTING);
const setNumberFavoriteOffers = createAction<number>(Action.NUMBER_FAVORITE_OFFER);

const fetchUserData = createAsyncThunk<UserAuth['email'], UserAuth, Extra>(
  Action.SET_AUTH,
  ({ email }, { extra: _api }) => {
    Token.save('fake-jwt-token-for-demo-purposes');
    window.history.back();
    return Promise.resolve(email);
  }
);

const checkUserStatus = createAsyncThunk<UserAuth['email'], undefined, Extra>(
  Action.CHECK_AUTH,
  (_, { extra: _extra }) => Promise.resolve('demo-developer@example.com')
);

const logoutUser = createAsyncThunk<void, undefined, Extra>(
  Action.LOGOUT_USER,
  (_, { extra: _api }) => {
    Token.drop();
    return Promise.resolve();
  }
);

const fetchOffer = createAsyncThunk<Hotel, Hotel['id'], Extra>(
  Action.FETCH_OFFER,
  (id) => {
    const list = hotels;
    const offer = list.find((item) => item.id === Number(id));
    if (!offer) {
      history.push(AppRoute.NotFound);
      return Promise.reject(new Error('Offer not found'));
    }
    return Promise.resolve(offer);
  }
);

const fetchComments = createAsyncThunk<Comment[], Comment['id'], Extra>(
  Action.FETCH_COMMENTS,
  () => Promise.resolve([])
);

const sendComment = createAsyncThunk<Comment[], CommentAuth, Extra>(
  Action.SEND_COMMENT,
  () => Promise.resolve([])
);

const fetchNearbyOffers = createAsyncThunk<Offer[], Comment['id'], Extra>(
  Action.FETCH_NEARBY_OFFERS,
  (id) => {
    const list = hotels;
    const currentOffer = list.find((item) => item.id === Number(id));
    if (!currentOffer) {
      return Promise.resolve([]);
    }
    const nearby = list.filter(
      (item) => item.city.name === currentOffer.city.name && item.id !== currentOffer.id
    );
    return Promise.resolve(nearby.slice(0, 3) as Offer[]);
  }
);

const changeFavoriteOffers = createAsyncThunk<Hotel, FavoriteOfferAuth, Extra>(
  Action.CHANGE_FAVORITE,
  ({ id, status }, { extra: _extra }) => {
    const list = hotels;
    const offer = list.find((item) => item.id === Number(id));

    if (!offer) {
      return Promise.reject(new Error('Offer not found'));
    }

    const updatedOffer = {
      ...offer,
      isFavorite: status === 1
    };

    const favoriteIdsString = localStorage.getItem('six-cities-favorites') || '[]';
    let favoriteIds = JSON.parse(favoriteIdsString) as number[];

    if (status === 1) {
      if (!favoriteIds.includes(offer.id)) {
        favoriteIds.push(offer.id);
      }
    } else {
      favoriteIds = favoriteIds.filter((favId) => favId !== offer.id);
    }

    localStorage.setItem('six-cities-favorites', JSON.stringify(favoriteIds));

    return Promise.resolve(updatedOffer);
  }
);

const fetchFavoriteOffers = createAsyncThunk<Hotel[], undefined, Extra>(
  Action.FETCH_FAVORITE_OFFERS,
  () => {
    const list = hotels;
    const favoriteIdsString = localStorage.getItem('six-cities-favorites') || '[]';
    const favoriteIds = JSON.parse(favoriteIdsString) as number[];

    const favorites = list
      .filter((offer) => favoriteIds.includes(offer.id))
      .map((offer) => ({ ...offer, isFavorite: true }));

    return Promise.resolve(favorites);
  }
);

const fetchOffers = createAsyncThunk<Hotel[], undefined, Extra>(
  Action.FETCH_OFFERS,
  (_, { extra: _api }) => {
    const list = hotels;
    const favoriteIdsString = localStorage.getItem('six-cities-favorites') || '[]';
    const favoriteIds = JSON.parse(favoriteIdsString) as number[];

    const synchronizedOffers = list.map((offer) => ({
      ...offer,
      isFavorite: favoriteIds.includes(offer.id)
    }));

    return Promise.resolve(synchronizedOffers);
  }
);

export { setCity, setSelectCard, setNumberOffer, setSorting, setNumberFavoriteOffers, fetchOffers, fetchUserData, logoutUser, checkUserStatus, fetchOffer, fetchComments, fetchNearbyOffers, sendComment, changeFavoriteOffers, fetchFavoriteOffers };
