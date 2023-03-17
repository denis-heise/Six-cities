import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from './reducer';
import { createApi } from '../components/api/api';
import { history } from '../types/history';
import { fetchFavoriteOffers } from './action';

const api = createApi();

const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api, history
    },
  }),
});

store.dispatch(fetchFavoriteOffers());

export {store};
