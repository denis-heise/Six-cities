import { reducerUser  } from './reducer-user';
import { AuthorizationStatus } from '../../utils/const';
import { checkUserStatus, logoutUser, fetchUserData } from '../action';

const EMAIL = 'user@gmail.com';

describe('Reducer: userProcess', ()=> {
  it('Returns initial state if no additional parameters', () => {
    expect(reducerUser.reducer(undefined, { type: 'NO_AUTH' })).toEqual({
      user:'',
      authorizationStatus: AuthorizationStatus.NoAuth
    })
  })

  it('Gets authorization status', () => {
    const state = {
      user: '',
      authorizationStatus: AuthorizationStatus.NoAuth,
    }
    expect(reducerUser.reducer(state, { type: fetchUserData.rejected.type })).toEqual({
      user:'',
      authorizationStatus: AuthorizationStatus.NoAuth
    })

    expect(reducerUser.reducer(state, { type: fetchUserData.fulfilled.type, payload: EMAIL })).toEqual({
      user: EMAIL,
      authorizationStatus: AuthorizationStatus.Auth
    })
  })

  it('Gets login user', () => {
    const state = {
      user: '',
      authorizationStatus: AuthorizationStatus.NoAuth,
    }

    expect(reducerUser.reducer(state, { type: checkUserStatus.rejected.type })).toEqual({
      user:'',
      authorizationStatus: AuthorizationStatus.NoAuth
    })

    expect(reducerUser.reducer(state, { type: checkUserStatus.fulfilled.type, payload: EMAIL })).toEqual({
      user: EMAIL,
      authorizationStatus: AuthorizationStatus.Auth
    })
  })

  it('Logout profile', () => {
    const state = {
      user: EMAIL,
      authorizationStatus: AuthorizationStatus.Auth,
    }
    expect(reducerUser.reducer(state, { type: logoutUser.fulfilled.type })).toEqual({
      user: '',
      authorizationStatus: AuthorizationStatus.NoAuth,
    })
  })
})

