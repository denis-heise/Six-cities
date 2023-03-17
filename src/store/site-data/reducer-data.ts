import { createSlice } from '@reduxjs/toolkit';
import { InitialStateData } from './types-site-data';
import { StoreSlice, SubmitStatus } from '../../utils/const';
import { fetchComments, fetchFavoriteOffers, fetchNearbyOffers, fetchOffer, fetchOffers, sendComment, changeFavoriteOffers } from '../action';

const initialStateData: InitialStateData = {
  offers: [],
  favoriteOffers: [],
  changeFavoriteOffer: null,
  offer: null,
  comments: [],
  commentStatus: SubmitStatus.Still,
  nearbyOffers: [],
  isOffersLoading: false,
};

export const reducerData = createSlice({
  name: StoreSlice.SiteData,
  initialState: initialStateData,
  reducers: {},
  extraReducers(builder){
    builder.addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    }).addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    }).addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    }).addCase(fetchOffer.pending, (state) => {
      state.isOffersLoading = true;
    }).addCase(fetchOffer.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.isOffersLoading = false;
    }).addCase(fetchOffer.rejected, (state) => {
      state.isOffersLoading = false;
    }).addCase(fetchComments.fulfilled, (state, action)=>{
      state.comments = action.payload;
    }).addCase(sendComment.pending, (state) => {
      state.commentStatus = SubmitStatus.Pending;
    }).addCase(sendComment.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.commentStatus = SubmitStatus.Fullfilled;
    }).addCase(sendComment.rejected, (state) => {
      state.commentStatus = SubmitStatus.Rejected;
    }).addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    }).addCase(fetchFavoriteOffers.pending, (state) => {
      state.isOffersLoading = true;
    }).addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
      state.favoriteOffers = action.payload;
      state.isOffersLoading = false;
    }).addCase(fetchFavoriteOffers.rejected, (state) => {
      state.isOffersLoading = false;
    }).addCase(changeFavoriteOffers.fulfilled, (state, action) => {
      const updatedOffer = action.payload;
      state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);

      if (state.offer && state.offer.id === updatedOffer.id) {
        state.offer = updatedOffer;
      }

      if (updatedOffer.isFavorite) {
        state.favoriteOffers = state.favoriteOffers.concat(updatedOffer);
      } else {
        state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== updatedOffer.id);
      }
    });
  }
});

