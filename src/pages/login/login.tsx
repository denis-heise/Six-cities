import { FormEvent, useCallback, useEffect } from 'react';
import { UserAuth } from '../../types/authorization';
import { fetchUserData, setCity } from '../../store/action';
import { getAuthorizationStatus } from '../../store/user-process/types-user-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus, REG_PASSWORD } from '../../utils/const';
import { cities } from '../../mocks/cities';
import { Link } from 'react-router-dom';

function Login () : JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const randomNumber = Math.floor(Math.random() * cities.length);

  useEffect(()=> {
    if(authorizationStatus === AuthorizationStatus.Auth){
      window.location.href = '/';
    }
  }, [authorizationStatus]);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

    const form = e.currentTarget;
    const dataForm = new FormData(form) as Iterable<[UserAuth]>;
    const loginData = Object.fromEntries(dataForm) as UserAuth;
    const passwordUser = loginData.password.trim();

    if(passwordUser.includes(' ') || REG_PASSWORD.test(passwordUser)) {
      return false;
    } else {
      dispatch(fetchUserData(loginData));
    }
  }

  const handleCityClick = useCallback(() => {
    dispatch(setCity(cities[randomNumber]));
  }, []);

  return(
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="email">E-mail</label>
              <input id='email' className="login__input form__input" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="password">Password</label>
              <input id='password' className="login__input form__input" type="password" name="password" placeholder="Password" required />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={AppRoute.Root} onClick={handleCityClick}>
              <span>{cities[randomNumber]}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
