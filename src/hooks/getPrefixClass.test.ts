import { AppRoute, CLASS_PREFIX } from '../utils/const';
import getPrefixClass from './getPrefixClass';

describe('Hook: getPrefixClass', () => {
  it('Returns the class prefix for the main page', () => {
    expect(getPrefixClass(AppRoute.Root)).toBe(CLASS_PREFIX.mainPage);
  })

  it('Returns the class prefix for the favorite page', () => {
    expect(getPrefixClass(AppRoute.Favorites)).toBe(CLASS_PREFIX.favoritePage);
  })

  it('Returns the class prefix for the property page', () => {
    expect(getPrefixClass(AppRoute.Property)).toBe(CLASS_PREFIX.propertyPage);
  })
})
