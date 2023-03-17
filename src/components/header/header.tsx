import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { citiesList } from '../../mocks/cities';
import { logoutUser, setCity } from '../../store/action';
import { getFavoriteOffers } from '../../store/site-data/types-site-data';
import { getAuthorizationStatus, getUserEmail } from '../../store/user-process/types-user-process';
import { AppRoute, AuthorizationStatus } from '../../utils/const';

export default function HeaderPage (): JSX.Element {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation() as { pathname: AppRoute };
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userName = useAppSelector(getUserEmail);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const RootClassName: Record<AppRoute, string> = {
    [AppRoute.Root]: 'page--gray page--main',
    [AppRoute.Login]: 'page--gray page--login',
    [AppRoute.Favorites]: favoriteOffers.length === 0 ? 'page--favorites-empty' : '',
    [AppRoute.Property]: '',
    [AppRoute.NotFound]: '',
  };

  function setOldState (){
    dispatch(setCity(citiesList[0].name));
  }
  function logoutProfile(){
    if(authorizationStatus === AuthorizationStatus.Auth){
      dispatch(logoutUser());
    }
  }

  return (
    <div className={`page ${RootClassName[pathname]}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root} onClick={setOldState}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
            <nav className="header__nav" style={{display: `${RootClassName[pathname] === RootClassName[AppRoute.Login] ? 'none' : 'flex'}`}}>
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">{`${typeof userName === 'string' ? '' : `${favoriteOffers.length} ${userName['email']}`}`}</span>
                  </Link>
                </li>
                <li className={`header__nav-item ${authorizationStatus === AuthorizationStatus.Auth ? '' : 'user'}`}>
                  <Link className={`header__nav-link ${authorizationStatus === AuthorizationStatus.Auth ? '' : 'header__nav-link--profile'}`} to={authorizationStatus === AuthorizationStatus.Auth ? AppRoute.Root : AppRoute.Login} onClick={logoutProfile}>
                    <span className="header__signout">{authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
