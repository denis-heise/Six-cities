import { cities } from '../../mocks/cities';
import { Offer } from '../../types/offers';
import { changeFavoriteOffers, fetchComments, fetchFavoriteOffers, fetchNearbyOffers, fetchOffers, sendComment } from '../action';
import { reducerData  } from './reducer-data';
import {Comment} from '../../types/comment';
import { SubmitStatus } from '../../utils/const';

const offers: Offer[] = [{
    id: 2,
    price: 222,
    rating: 3.4,
    bedrooms: 3,
    description: 'derty',
    goods: ['qwerty'],
    host: {
      avatarUrl: 'img/avatar.jpg',
      id: 23,
      isPro: true,
      name: 'NameUser',
      email: 'user@gmail.com',
      token: 'tokenqwerty'
    },
    title: 'Paris A apartment at great location beautiful',
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    images: ['imgUrl'],
    maxAdults: 5,
    type: 'room',
    city: {
      name: 'Paris',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 10
    }
  }
];

const OfferFavorite: Offer[] = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 48.85661,
        longitude: 65.73561,
        zoom: 20,
      },
      name: cities[0]
    },
    description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
    goods: ['Fridge'],
    host: {
      avatarUrl: 'img/avatar.jpg',
      id: 23,
      isPro: true,
      name: 'NameUser',
      email: 'user@gmail.com',
      token: 'tokenqwerty'
    },
    id: 3,
    images: ['img/image.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 48.85881,
      longitude: 65.73111,
      zoom: 16,
    },
    maxAdults: 7,
    previewImage: 'img/preview-image.jpg',
    price: 452,
    rating: 4.5,
    title: 'One offer',
    type: 'house',
  }
];

const comments: Comment[] = [
  {
    comment: 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
    date: '2022-06-23T12:25:36.939Z',
    id: 1,
    rating: 3,
    user: {
      avatarUrl: 'img/avatar.jpg',
      id: 12,
      isPro: true,
      name: 'Isaac'
    }
  }
];

describe('Reducer: reducerData', () => {
  it('Returns initial state if no additional parameters', () => {
    expect(reducerData.reducer(undefined, { type: 'UNKNOWN' })).toEqual({
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    })
  })

  it('Fetch offers', () => {
    const state = {
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    }

    expect(reducerData.reducer(state, { type: fetchOffers.pending.type })).toEqual({
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: true,
    })

    expect(reducerData.reducer(state, { type: fetchOffers.fulfilled.type, payload: offers })).toEqual({
      offers: offers,
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    })

    expect(reducerData.reducer(state, { type: fetchOffers.rejected.type })).toEqual({
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    })
  })

  it('Fetch favorite offer', () => {
    const state = {
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    }

    expect(reducerData.reducer(state, { type: fetchFavoriteOffers.pending.type })).toEqual({
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: true,
    })

    expect(reducerData.reducer(state, { type: fetchFavoriteOffers.fulfilled.type, payload: OfferFavorite })).toEqual({
      offers: [],
      favoriteOffers: OfferFavorite,
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    })

    expect(reducerData.reducer(state, { type: fetchFavoriteOffers.rejected.type })).toEqual({
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    })
  })

  it('Get a favorite offer', () => {
    const state = {
      offers: offers,
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    }

    expect(reducerData.reducer(state, { type: changeFavoriteOffers.fulfilled.type, payload: {...offers[0], isFavorite: true } })).toEqual({
      offers: [{...offers[0], isFavorite: true }],
      favoriteOffers: [{...offers[0], isFavorite: true }],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    })

    expect(reducerData.reducer(state, { type: changeFavoriteOffers.fulfilled.type, payload: {...offers[0], isFavorite: false } })).toEqual({
      offers: offers,
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    })
  })

  it('Fetch comments', () => {
    const state = {
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    }

    expect(reducerData.reducer(state, { type: fetchComments.fulfilled.type, payload: comments })).toEqual({
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: comments,
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    })
  })

    it('Fetch nearby offers', () => {
      const state = {
        offers: [],
        favoriteOffers: [],
        changeFavoriteOffer: null,
        offer: null,
        comments: [],
        commentStatus: SubmitStatus.Still,
        nearbyOffers: [],
        isOffersLoading: false,
      }

      expect(reducerData.reducer(state, { type: fetchNearbyOffers.fulfilled.type, payload: offers[0] })).toEqual({
        offers: [],
        favoriteOffers: [],
        changeFavoriteOffer: null,
        offer: null,
        comments: [],
        commentStatus: SubmitStatus.Still,
        nearbyOffers: offers[0],
        isOffersLoading: false,
      })
  })

  it('Send new comment', () => {
    const state = {
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: [],
      commentStatus: SubmitStatus.Still,
      nearbyOffers: [],
      isOffersLoading: false,
    }

    expect(reducerData.reducer(state, { type: sendComment.fulfilled.type, payload: comments })).toEqual({
      offers: [],
      favoriteOffers: [],
      changeFavoriteOffer: null,
      offer: null,
      comments: comments,
      commentStatus: SubmitStatus.Fullfilled,
      nearbyOffers: [],
      isOffersLoading: false,
    })
  })
})
