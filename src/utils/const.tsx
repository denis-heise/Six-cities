import { PointExpression } from 'leaflet';

export const STARS_COUNT = 5;
export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}
export const CLASS_PREFIX = {
  favoritePage: 'favorites__',
  propertyPage: 'near-places__',
  mainPage: 'cities__'
};
export const enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Property = '/offer',
  NotFound = '/404'
}
export const enum OfferType {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel',
}
export enum ApiRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}
export enum Sorting {
  Popular = 'Popular',
  PriceIncrease = 'Price: low to high',
  PriceDecrease = 'Price: high to low',
  TopRated = 'Top rated first',
}
export enum StoreSlice {
  SiteData = 'SITE_DATA',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS',
}
export enum HttpCode {
  NotFound = 404,
  NoAuth = 401
}
export enum SubmitStatus {
  Still = 'STILL',
  Pending = 'PENDING',
  Fullfilled = 'FULLFILLED',
  Rejected = 'REJECTED'
}
export const LEAFLET_MAP_SETTINGS = {
  TILE_LAYER: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
};
export const URL_MARKER_DEFAULT = '../../img/pin.svg';
export const URL_MARKER_CURRENT = '../../img/pin-active.svg';
export const NUMBER_OFFERS = 3;
export const MIN_TEXT_REVIEW = 50;
export const MAX_TEXT_REVIEW = 300;
export const ICON_SIZE: PointExpression | undefined = [40, 40];
export const ICON_ANCHOR: PointExpression | undefined = [20, 40];
export const ZOOM = 12;
export const MAX_COMMENTS = 10;
export const REG_PASSWORD = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{3,}/g;
