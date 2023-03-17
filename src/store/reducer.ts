import { combineReducers } from '@reduxjs/toolkit';
import { StoreSlice } from '../utils/const';
import { reducerData } from './site-data/reducer-data';
import { reducerProcess } from './site-process/reducer-process';
import { reducerUser } from './user-process/reducer-user';

export const mainReducer = combineReducers({
  [StoreSlice.SiteData]: reducerData.reducer,
  [StoreSlice.SiteProcess]: reducerProcess.reducer,
  [StoreSlice.UserProcess]: reducerUser.reducer,
});
