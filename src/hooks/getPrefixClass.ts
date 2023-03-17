import { AppRoute, CLASS_PREFIX } from '../utils/const';

export default function getPrefixClass (location:string): string {
  let nameClass = '';

  if(location.includes(AppRoute.Favorites)){
    nameClass = CLASS_PREFIX.favoritePage;
  }
  if(location.includes(AppRoute.Property)) {
    nameClass = CLASS_PREFIX.propertyPage;
  }
  if(!(location.includes(AppRoute.Favorites)) && !(location.includes(AppRoute.Property))) {
    nameClass = CLASS_PREFIX.mainPage;
  }

  return nameClass;
}
