import {CityName, Location, City, State} from '../../types/offers';
import { StoreSlice } from '../../utils/const';

export type InitialStateProcess = {
  city: {
    name: CityName;
    location: Location;
  };
  numberOffer: number;
  sorting: string;
  location: Location | null;
  numberFavoriteOffers: number;
}

export const getOffersCity = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): City => SITE_PROCESS.city;
export const getNumberOffer = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): number => SITE_PROCESS.numberOffer;
export const getSortOffers = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): string => SITE_PROCESS.sorting;
export const getLocationOffer = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): Location | null => SITE_PROCESS.location;
export const getNumberFavoriteOffers = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): number => SITE_PROCESS.numberFavoriteOffers;
