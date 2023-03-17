import {Offer, State} from '../../types/offers';
import {Comment} from '../../types/comment';
import { MAX_COMMENTS, StoreSlice, SubmitStatus } from '../../utils/const';
import { createSelector } from '@reduxjs/toolkit';

export type InitialStateData = {
  offers: Offer[];
  favoriteOffers: Offer[];
  changeFavoriteOffer: Offer | null;
  offer: Offer | null;
  isOffersLoading: boolean;
  comments: Comment[];
  commentStatus: SubmitStatus;
  nearbyOffers: Offer[];
}

export const getIsOffersLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isOffersLoading;
export const getOffers = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Offer[] => SITE_DATA.offers;
export const getOffer = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Offer | null => SITE_DATA.offer;
export const getComments = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Comment[] => SITE_DATA.comments;
export const getNearbyOffers = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Offer[] => SITE_DATA.nearbyOffers;
export const getFavoriteOffers = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Offer[] => SITE_DATA.favoriteOffers;
export const getChangeFavoriteOffer = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Offer | null => SITE_DATA.changeFavoriteOffer;
export const getCommentStatus = ({ [StoreSlice.SiteData]: SITE_DATA }: State): SubmitStatus => SITE_DATA.commentStatus;

export const selectComments = createSelector(
  [getComments],
  (comments) => [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_COMMENTS)
);
