import { offers } from '../mocks/cards';
import sortData from './sortData';
import { Sorting } from '../utils/const';

describe('Hook: sortData', () => {
  it('Returns sorted offers by popular', () => {
    expect(sortData(offers.slice(), Sorting.Popular)).toEqual(offers);
  })

  it('Returns sorted offers by price decrease', () => {
    const sortArrayOffers = offers.slice().sort((a, b) => a.price > b.price ? 1 : -1);
    expect(sortData(offers, Sorting.PriceDecrease)).toEqual(sortArrayOffers);
  })

  it('Returns sorted offers by price increase', () => {
    const sortArrayOffers = offers.slice().sort((a, b) => a.price < b.price ? 1 : -1);
    expect(sortData(offers, Sorting.PriceIncrease)).toEqual(sortArrayOffers);
  })

  it('Returns sorted offers by top rated', () => {
    const sortArrayOffers = offers.slice().sort((a, b) => a.rating < b.rating ? 1 : -1);
    expect(sortData(offers, Sorting.TopRated)).toEqual(sortArrayOffers);
  })
})
