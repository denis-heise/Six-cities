import { createApi } from '../components/api/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/offers';
import { History } from 'history';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ApiRoute } from '../utils/const';
import { checkUserStatus } from './action';

describe('Actions', ()=>{
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, { api: AxiosInstance, history: History }, Action>>(middlewares);

  it('When the server returns 200 setAuthorizationStatus will be fullfilled', async () => {
    const store = mockStore();
    mockApi.onGet(ApiRoute.Login).reply(200, {});
    expect(store.getActions()).toEqual([]);
    await store.dispatch<any>(checkUserStatus());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkUserStatus.pending.type,
      checkUserStatus.fulfilled.type
    ]);
  })

  it('When the server returns 401 setAuthorizationStatus will be rejected', async () => {
    const store = mockStore();
    mockApi.onGet(ApiRoute.Login).reply(401, {});
    expect(store.getActions()).toEqual([]);
    await store.dispatch<any>(checkUserStatus());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkUserStatus.pending.type,
      checkUserStatus.rejected.type
    ]);
  })
})
