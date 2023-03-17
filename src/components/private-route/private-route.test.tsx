import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { history } from '../../types/history';
import { AppRoute, AuthorizationStatus, StoreSlice } from '../../utils/const';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history.push('/private');
  })
  it('Component with public route if user is not authorized', () => {
    const store = mockStore({
      [StoreSlice.UserProcess]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<h1> Public Route </h1>}/>
            <Route path={'/private'}
              element={
                <PrivateRoute>
                  <h1> Private Route </h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    )

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  })

  it('Bean with private route if user is authorized', () => {
    const store = mockStore({
      [StoreSlice.UserProcess]: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<h1> Public Route </h1>}/>
            <Route path={'/private'}
              element={
                <PrivateRoute>
                  <h1> Private Route </h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    )

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  })
})
