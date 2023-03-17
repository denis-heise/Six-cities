import { State, UserData} from '../../types/offers';
import { StoreSlice } from '../../utils/const';

export type InitialStateUser = {
  user: string;
  authorizationStatus: string;
}

export const getAuthorizationStatus = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): string => USER_PROCESS.authorizationStatus;
export const getUserEmail = ({ [StoreSlice.UserProcess]: USER_PROCESS }: State): UserData | string => USER_PROCESS.user;

