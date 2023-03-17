import type { Offer } from '../types/offers';

const offers: Offer[] = [
  {
    id: 1,
    price: 111,
    rating: 4.4,
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
    title: 'Amsterdam Beautiful & luxurious apartment at great location',
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    images: ['imgUrl'],
    maxAdults: 5,
    type: 'apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10
    }
  },
  {
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
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 10
    }
  },
  {
    id: 3,
    price: 333,
    rating: 5.0,
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
    title: 'Cologne Great location apartment at great location',
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    images: ['imgUrl'],
    maxAdults: 5,
    type: 'house',
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 10
    }
  },
  {
    id: 4,
    price: 444,
    rating: 3.2,
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
    title: 'Brussels Luxurious & beautiful apartment at great location',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    images: ['imgUrl'],
    maxAdults: 5,
    type: 'hotel',
    city: {
      name: 'Brussels',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 10
    }
  },
  {
    id: 5,
    price: 555,
    rating: 3.2,
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
    title: 'Hamburg Luxurious & beautiful apartment at great location',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    images: ['imgUrl'],
    maxAdults: 5,
    type: 'hotel',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 10
    }
  },
  {
    id: 6,
    price: 666,
    rating: 3.2,
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
    title: 'Dusseldorf Luxurious & beautiful apartment at great location',
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/apartment-01.jpg',
    images: ['imgUrl'],
    maxAdults: 5,
    type: 'hotel',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 10
    }
  },
];

export {offers};
