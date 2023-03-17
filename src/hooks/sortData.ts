import type { Offer } from '../types/offers';
import { Sorting } from '../utils/const';

export default function sortData (arrayData: Offer[], type: string): Offer[] {
  switch (type){
    case Sorting.Popular:
      return arrayData;
    case Sorting.PriceDecrease:
      return arrayData.sort((a, b) => a.price > b.price ? 1 : -1);
    case Sorting.PriceIncrease:
      return arrayData.sort((a, b) => a.price < b.price ? 1 : -1);
    case Sorting.TopRated:
      return arrayData.sort((a, b) => a.rating < b.rating ? 1 : -1);
  }

  return arrayData;
}
