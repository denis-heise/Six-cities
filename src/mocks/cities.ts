import { ZOOM } from '../utils/const';

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export const citiesList = [
  {
    id: 1,
    name: 'Paris',
    select: true
  },
  {
    id: 2,
    name: 'Cologne',
    select: false
  },
  {
    id: 3,
    name: 'Brussels',
    select: false
  },
  {
    id: 4,
    name: 'Amsterdam',
    select: false
  },
  {
    id: 5,
    name: 'Hamburg',
    select: false
  },
  {
    id: 6,
    name:'Dusseldorf',
    select: false
  }] as const;
export const cityCenter = {
  'Paris': {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: ZOOM
  },
  'Cologne': {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: ZOOM
  },
  'Brussels': {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: ZOOM
  },
  'Amsterdam': {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: ZOOM
  },
  'Hamburg': {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: ZOOM
  },
  'Dusseldorf': {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: ZOOM
  },
};
