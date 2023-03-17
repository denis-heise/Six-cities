import { ApiRoute, AppRoute, AuthorizationStatus, Sorting, StoreSlice } from '../../utils/const';
import { history } from '../../types/history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../api/api';
import MockAdapter from 'axios-mock-adapter';
import { cities, citiesList, cityCenter } from '../../mocks/cities';
import App from './app';

const userData = {
  id: 3,
  email: 'user@gmail.com',
  name: 'nameUser',
  avatarUrl: 'urlUser'
}

const offers = [
  {
    id: 1,
    price: 120,
    rating: 4.0,
    title: 'Offer 1',
    isPremium: true,
    isFavorite: true,
    city: {
      name: cities[0],
      location: cityCenter[cities[0]]
    },
    location: cityCenter[cities[0]],
    previewImage: 'img/1.jpg',
    description: 'Nice house',
    type: 'hotel',
    goods: ['dish washer', 'wi-fi'],
    bedrooms: 2,
    host: userData,
    maxAdults: 3,
    images: ['img/1.jpg', 'img/2.jpg', 'img/3.jpg']
  }
];

const comments = [
  {
    id: 1,
    comment: 'Hello!',
    date: '11-10-2017',
    rating: 1.0,
    user: userData
  }
];

const api = createApi();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

mockApi.onGet(`${ApiRoute.Offers}/1`).reply(200, offers[0]);
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [StoreSlice.SiteData]: {
    offers: offers,
    favoriteOffers: offers,
    changeFavoriteOffer: null,
    offer: offers[0],
    comments: comments,
    nearbyOffers: [],
    isOffersLoading: false,
  },
  [StoreSlice.SiteProcess]: {
    city: {
      name: citiesList[0].name,
      location: cityCenter[citiesList[0].name]
    },
    numberOffer: 0,
    sorting: Sorting.Popular,
    location: {
      name: citiesList[0].name,
      location: cityCenter[citiesList[0].name]
    },
  },
  [StoreSlice.UserProcess]: {
    user: userData.email,
    authorizationStatus: AuthorizationStatus.Auth,
  },
})

const fakeApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('Application Routing', () => {
  it('Displays "Main" if the user navigates to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(`1 places to stay in ${cities[0]}`)).toBeInTheDocument();
    expect(screen.getAllByText(Sorting.Popular)[0]).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(offers[0].title)).toBeInTheDocument();
  })

  it('Displays "Favorites" if the user navigates to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    render(fakeApp);

    expect(screen.getByText(offers[0].title)).toBeInTheDocument();
    expect(screen.getByText(offers[0].type)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByRole('img', { name: offers[0].title })).toHaveAttribute('src', offers[0].previewImage);
  })

  it('Displays "Login" if the user navigates to "/login', () => {
    store.getState()[StoreSlice.UserProcess].authorizationStatus = AuthorizationStatus.NoAuth;
    store.getState()[StoreSlice.UserProcess].user = '';

    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  })

  it('Displays "NotFound" when user navigates to "/not-found"', () => {
    history.push(AppRoute.NotFound);
    render(fakeApp);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  })

  it('Displays "Property" when user navigates to "/offer/:id"', () => {
    history.push(`${AppRoute.Property}/1`);
    render(fakeApp);

    expect(screen.getByText(offers[0].title)).toBeInTheDocument();
    expect(screen.getByText(offers[0].rating)).toBeInTheDocument();
    expect(screen.getByText(offers[0].type)).toBeInTheDocument();
  })
})
