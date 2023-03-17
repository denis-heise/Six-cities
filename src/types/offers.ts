import { store } from '../store';
import { cities } from '../mocks/cities';
import { Sorting } from '../utils/const';

export type CityName = typeof cities[number];
export type SortName = keyof typeof Sorting;
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}
export type City = {
  name: CityName;
  location: Location;
};

export type SiteData = {
  offers: Offer[];
  isOffersLoading: boolean;
  offer: Offer | null;
  isOfferLoading: boolean;
  favoriteOffers: Offer[];
  isFavoriteOffersLoading: boolean;
  nearbyOffers: Offer[];
  comments: Comment[];
};
export type CityLocation = {
  [key in CityName]: Location
}
export type UserData = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
}
export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: [string];
  host: UserData;
  id: number;
  images: [string];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
}

export type FavoriteOfferAuth = Pick<Offer, 'id'> & {status: 1 | 0};
