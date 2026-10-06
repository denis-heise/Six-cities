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
  offers: Hotel[];
  isOffersLoading: boolean;
  offer: Hotel | null;
  isOfferLoading: boolean;
  favoriteOffers: Hotel[];
  isFavoriteOffersLoading: boolean;
  nearbyOffers: Hotel[];
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

export type Host = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

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

export type Hotel = {
  id: number;
  title: string;
  description: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  price: number;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  images: string[];
  goods: string[];
  city: City;
  location: Location;
  host: Host;
};

export type FavoriteOfferAuth = Pick<Hotel, 'id'> & {status: 1 | 0};
