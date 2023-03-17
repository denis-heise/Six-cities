import { createSlice } from '@reduxjs/toolkit';
import { InitialStateUser } from './types-user-process';
import { AuthorizationStatus, StoreSlice } from '../../utils/const';
import { checkUserStatus, logoutUser, fetchUserData } from '../action';

const initialStateUser: InitialStateUser = {
  user: '',
  authorizationStatus: AuthorizationStatus.NoAuth,
};

export const reducerUser = createSlice({
  name: StoreSlice.UserProcess,
  initialState: initialStateUser,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    }).addCase(fetchUserData.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    }).addCase(checkUserStatus.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    }).addCase(checkUserStatus.rejected, (state) => {
      state.user = '';
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    }).addCase(logoutUser.fulfilled, (state) => {
      state.user = '';
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
  }
});
