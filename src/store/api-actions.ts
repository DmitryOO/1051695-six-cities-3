import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../store/index';
import { AxiosInstance } from 'axios';
import { setError } from './slice';
import { APIRoute, TIMEOUT_ERROR } from '../consts';
import { mainOfferType } from '../pages/main-page/main-offer-type';
import { dropToken, saveToken } from '../services/token';
import { currentOfferType } from '../pages/offer-page/current-offer-type';
import { commentsType } from '../pages/offer-page/comments-type';
import { reviewType } from '../pages/offer-page/comments-type';


type authData = {
  email: string;
  password: string;
}

type FavoriteStatusData = {
  id: string;
  status: number;
}

export type userData = {
  name?: string;
  avatarUrl?: string;
  isPro?: boolean;
  token?: string;
  email?: string;
}

const fetchOffersAction = createAsyncThunk<
  mainOfferType[],
  undefined,
  { extra: AxiosInstance }
>(
  'fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<mainOfferType[]>(APIRoute.Offers);
    return data;
  }
);

const checkAuthAction = createAsyncThunk<userData, undefined, { extra: AxiosInstance }>(
  'checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<userData>(APIRoute.Login);
    return data;
  }
);

const clearErrorAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'clearError',
  (_arg, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_ERROR
    );
  }
);

const fetchNearbyOffersAction = createAsyncThunk<mainOfferType[], string, {
  extra: AxiosInstance;
}>(
  'fetchNearbyOffers',
  async (id, { extra: api }) => {
    const { data } = await api.get<mainOfferType[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  }
);

const fetchCurrentOfferAction = createAsyncThunk<currentOfferType, string, {
  extra: AxiosInstance;
}>(
  'fetchCurrentOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<currentOfferType>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);

const fetchComments = createAsyncThunk<commentsType, string, {

  extra: AxiosInstance;
}>(
  'fetchComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<commentsType>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

const postReviewAction = createAsyncThunk<
  void,
  reviewType & { id: string },
  { dispatch: AppDispatch; extra: AxiosInstance }
>(
  'postReview',
  async ({ comment, rating, id }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Comments}/${id}`, { comment, rating });
    dispatch(fetchComments(id));
  }
);

const fetchFavoritesAction = createAsyncThunk<
  mainOfferType[],
  undefined,
  { extra: AxiosInstance }
>(
  'fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<mainOfferType[]>(APIRoute.Favorite);
    return data;
  }
);

const toggleFavoritesAction = createAsyncThunk<currentOfferType, FavoriteStatusData, { extra: AxiosInstance }>(
  'toggleFavorites',
  async ({status, id}, { dispatch, extra: api }) => {
    const { data } = await api.post<currentOfferType>(`${APIRoute.Favorite}/${id}/${status}`);
    dispatch(fetchFavoritesAction());
    return data;
  }
);


const loginAction = createAsyncThunk<userData, authData, { extra: AxiosInstance }>(
  'login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<userData>(APIRoute.Login, { email, password });
    saveToken(data.token || '');
    dispatch(fetchFavoritesAction());
    dispatch(fetchOffersAction());
    return data;
  }
);

const logoutAction = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'logout',
  async (_arg, {dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(fetchOffersAction());
  }
);


export { fetchOffersAction, checkAuthAction, loginAction, logoutAction, clearErrorAction, fetchNearbyOffersAction, fetchCurrentOfferAction, fetchComments, postReviewAction, fetchFavoritesAction, toggleFavoritesAction };
