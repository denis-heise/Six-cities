
import { reducerProcess  } from './reducer-process';
import { setCity, setNumberFavoriteOffers, setNumberOffer, setSelectCard, setSorting } from '../action';
import { cities, citiesList, cityCenter } from '../../mocks/cities';
import { Sorting } from '../../utils/const';
import { Location } from '../../types/offers';

describe('Reducer: reducerProcess', () => {
  it('Returns initial state if no additional parameters', () => {
    expect(reducerProcess.reducer(undefined, { type: 'NO_AUTH' })).toEqual({
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 0,
      sorting: Sorting.Popular,
      location: null,
      numberFavoriteOffers: 0,
    })
  })

  it('Sets the city by the given name', () => {
    const state = {
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 0,
      location: null,
      numberFavoriteOffers: 0,
      sorting: Sorting.Popular
    }
    expect(reducerProcess.reducer(state, setCity(cities[2]))).toEqual({
      city: {
        name: citiesList[2].name,
        location: cityCenter[citiesList[2].name]
      },
      numberOffer: 0,
      sorting: Sorting.Popular,
      location: null,
      numberFavoriteOffers: 0,
    })
  })

  it('Set sorting by given name', () => {
    const state = {
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 0,
      location: null,
      numberFavoriteOffers: 0,
      sorting: Sorting.Popular
    }
    expect(reducerProcess.reducer(state, setSorting('PriceIncrease'))).toEqual({
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 0,
      sorting: 'PriceIncrease',
      location: null,
      numberFavoriteOffers: 0,
    })
  })

  it('Sets the offer number', () => {
    const state = {
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 0,
      sorting: Sorting.Popular,
      location: null,
      numberFavoriteOffers: 0,
    }

    expect(reducerProcess.reducer(state, setNumberOffer(1))).toEqual({
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 1,
      sorting: Sorting.Popular,
      location: null,
      numberFavoriteOffers: 0,
    })
  })

  it('Sets the favorite offer number', () => {
    const state = {
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 0,
      sorting: Sorting.Popular,
      location: null,
      numberFavoriteOffers: 0,
    }

    expect(reducerProcess.reducer(state, setNumberFavoriteOffers(5))).toEqual({
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 0,
      sorting: Sorting.Popular,
      location: null,
      numberFavoriteOffers: 5,
    })
  })

  it('Sets the location of the selected card', () => {
    const state = {
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 0,
      sorting: Sorting.Popular,
      location: null,
      numberFavoriteOffers: 0,
    }

    const locationCard: Location = {
      latitude: 48.85661,
      longitude: 65.73561,
      zoom: 20,
    };

    expect(reducerProcess.reducer(state, setSelectCard(locationCard))).toEqual({
      city: {
        name: citiesList[0].name,
        location: cityCenter[citiesList[0].name]
      },
      numberOffer: 0,
      sorting: Sorting.Popular,
      location: locationCard,
      numberFavoriteOffers: 0,
    })
  })
})
