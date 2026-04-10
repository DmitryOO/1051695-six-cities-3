import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State, store } from '.';
import { AxiosInstance } from 'axios';
import { loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setUser, loadNearbyOffers, loadCurrentOffer, loadComments } from './action';
import { APIRoute, AuthorizationStatus, TIMEOUT_ERROR } from '../consts';
import { mainOfferType } from '../pages/main-page/main-offer-type';
import { dropToken, saveToken } from '../services/token';
import { currentOfferType } from '../pages/offer-page/current-offer-type';
import { commentsType } from '../pages/offer-page/comments-type';
import { reviewType } from '../pages/offer-page/comments-type';

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

const fetchOffersAction = createAsyncThunk<void, undefined, {
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

const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchNearbyOffers',
  async (id: string, { dispatch, extra: api }) => {
    const { data } = await api.get<mainOfferType[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadNearbyOffers(data));
  }
);

const fetchCurrentOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchCurrentOffer',
  async (id: string, { dispatch, extra: api }) => {
    // dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<currentOfferType>(`${APIRoute.Offers}/${id}`);
    // dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadCurrentOffer(data));
  }
);

const fetchComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchComments',
  async (id: string, { dispatch, extra: api }) => {
    const { data } = await api.get<commentsType>(`${APIRoute.Comments}/${id}`);
    dispatch(loadComments(data));
  }
);

const postReviewAction = createAsyncThunk<void, reviewType & { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postReview',
  async ({ comment, rating, id }, { dispatch, extra: api }) => {
    await api.post<reviewType & { id: string }>(`${APIRoute.Comments}/${id}`, { comment, rating });
    dispatch(fetchComments(id));
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

export { fetchOffersAction, checkAuthAction, loginAction, logoutAction, clearErrorAction, fetchNearbyOffersAction, fetchCurrentOfferAction, fetchComments, postReviewAction };
