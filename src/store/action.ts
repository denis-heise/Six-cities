import type { AxiosError, AxiosInstance } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CityName, Offer, Location, FavoriteOfferAuth } from '../types/offers';
import { User, UserAuth} from '../types/authorization';
import { ApiRoute, AppRoute, HttpCode } from '../utils/const';
import { Token } from '../utils/token';
import { history } from '../types/history';
import {Comment, CommentAuth} from '../types/comment';

export type Extra = {
  extra: AxiosInstance;
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
const fetchOffers = createAsyncThunk<Offer[], undefined, Extra>(
  Action.FETCH_OFFERS,
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Offers);
    return data;
  });

const fetchUserData = createAsyncThunk<UserAuth['email'], UserAuth, Extra>(Action.SET_AUTH,
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<UserAuth & { token: string}>(ApiRoute.Login, { email, password });
    const { token } = data;
    Token.save(token);
    window.history.back();

    return email;
  });

const checkUserStatus = createAsyncThunk<UserAuth['email'], undefined, Extra>(Action.CHECK_AUTH,
  async (_, { extra }) => {
    const api = extra;

    try {
      const { data } = await api.get<User['email']>(ApiRoute.Login);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.NoAuth) {
        Token.drop();
      }

      return Promise.reject(error);
    }
  });

const logoutUser = createAsyncThunk<void, undefined, Extra>(
  Action.LOGOUT_USER,
  async (_, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    Token.drop();
  });

const fetchOffer = createAsyncThunk<Offer, Offer['id'], Extra>(
  Action.FETCH_OFFER,
  async (id, { extra: api }) => {
    try{
      const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
      return data;
    } catch (error){
      const axiosError = error as AxiosError;
      if(axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.NotFound);
      }
      return Promise.reject(error);
    }
  });

const fetchComments = createAsyncThunk<Comment[], Comment['id'], Extra>(
  Action.FETCH_COMMENTS,
  async (id, { extra: api }) => {
    const { data } = await api.get<Comment[]>(`${ApiRoute.Comments}/${id}`);
    return data;
  });

const sendComment = createAsyncThunk<Comment[], CommentAuth, Extra>(Action.SEND_COMMENT,
  async ({ id, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Comment[]>(`${ApiRoute.Comments}/${id}`, { comment, rating });
    return data;
  });

const fetchNearbyOffers = createAsyncThunk<Offer[], Comment['id'], Extra>(
  Action.FETCH_NEARBY_OFFERS,
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}/nearby`);
    return data;
  });

const changeFavoriteOffers = createAsyncThunk<Offer, FavoriteOfferAuth, Extra>(Action.CHANGE_FAVORITE,
  async ( {id, status}, {extra:api} ) => {
    try{
      const {data} = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/${status}`);
      return data;
    } catch (error){
      const axiosError = error as AxiosError;
      if(axiosError.response?.status === HttpCode.NotFound) {
        history.push(AppRoute.Login);
      }
      return Promise.reject(error);
    }
  }
);

const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, Extra>(
  Action.FETCH_FAVORITE_OFFERS,
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Favorite);
    return data;
  });

export { setCity, setSelectCard, setNumberOffer, setSorting, setNumberFavoriteOffers, fetchOffers, fetchUserData, logoutUser, checkUserStatus, fetchOffer, fetchComments, fetchNearbyOffers, sendComment, changeFavoriteOffers, fetchFavoriteOffers};
