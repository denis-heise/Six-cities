import { createSlice } from '@reduxjs/toolkit';
import { citiesList, cityCenter } from '../../mocks/cities';
import { InitialStateProcess } from './types-site-process';
import { Sorting, StoreSlice } from '../../utils/const';
import { setCity, setNumberFavoriteOffers, setNumberOffer, setSelectCard, setSorting } from '../action';

const initialStateProcess: InitialStateProcess = {
  city: {
    name: citiesList[0].name,
    location: cityCenter[citiesList[0].name]
  },
  numberOffer: 0,
  sorting: Sorting.Popular,
  location: null,
  numberFavoriteOffers: 0,
};

const reducerProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState: initialStateProcess,
  reducers: {},
  extraReducers(builder){
    builder.addCase(setCity, (state, action) => {
      state.city = {
        name: action.payload,
        location: cityCenter[action.payload]
      };
    }).addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    }).addCase(setSelectCard, (state, action) => {
      state.location = action.payload;
    }).addCase(setNumberOffer, (state, action) => {
      state.numberOffer = action.payload;
    }).addCase(setNumberFavoriteOffers, (state, action) => {
      state.numberFavoriteOffers = action.payload;
    });
  }
});

export {reducerProcess};
