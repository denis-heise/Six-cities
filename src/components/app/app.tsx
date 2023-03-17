import Main from '../../pages/main-page/main-page';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites-page/favorites-page';
import Property from '../../pages/property-page/property-page';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { history } from '../../types/history';
import { getOffers } from '../../store/site-data/types-site-data';
import { checkUserStatus } from '../../store/action';
import { useEffect } from 'react';
import HeaderPage from '../header/header';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);

  useEffect(() => {
    dispatch(checkUserStatus());
  }, []);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route element={<HeaderPage/>}>
          <Route index element={<Main offersMain={offers}/>}/>
          <Route path={AppRoute.Login} element={<Login/>}/>
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <Favorites/>
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoute.Property}/:id`} element={<Property />} />
        </Route>
        <Route path='*' element={ <NotFound/> }/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
