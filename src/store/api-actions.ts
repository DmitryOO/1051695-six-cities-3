import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State, store } from '.';
import { AxiosInstance } from 'axios';
import { loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setUser } from './action';
import { APIRoute, AuthorizationStatus, TIMEOUT_ERROR } from '../consts';
import { mainOfferType } from '../pages/main-page/main-offer-type';
import { dropToken, saveToken } from '../services/token';

type authData = {
  email: string;
  password: string;
}

export type userData = {
  name?: string;
  avatarUrl?: string;
  isPro?: boolean;
  token?: string;
  email?: string;
}

const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<mainOfferType[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<userData>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

const loginAction = createAsyncThunk<void, authData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<userData>(APIRoute.Login, { email, password });
    if (data.token) {
      saveToken(data.token);
    }
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(() => store.dispatch(setError(null)), TIMEOUT_ERROR);
  }
);

// const loadOfferAction = createAsyncThunk<void, string, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'loadOffer',
//   async (_arg, { dispatch, extra: api }) => {
//     const { data } = await api.get<mainOfferType[]>(APIRoute.Offers);
//   }
// );

export { fetchOfferAction, checkAuthAction, loginAction, logoutAction, clearErrorAction };
