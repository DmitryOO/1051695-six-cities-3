import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentOfferAction, fetchNearbyOffersAction, fetchComments, fetchOffersAction, checkAuthAction, loginAction, logoutAction, postReviewAction, userData, fetchFavoritesAction, toggleFavoritesAction } from './api-actions';
import { cities, AuthorizationStatus } from '../consts';
import { currentOfferType } from '../pages/offer-page/current-offer-type';
import { mainOfferType } from '../pages/main-page/main-offer-type';
import { commentsType } from '../pages/offer-page/comments-type';
import { Nullable } from 'vitest';
import { PayloadAction } from '@reduxjs/toolkit';
type InitialStateType = {
  user: userData;
  city: Nullable<string>;
  offers: mainOfferType[];
  authorizationStatus: string;
  error: string | null;
  isSending: boolean;
  isLoading: boolean;
  isOffersDataLoading: boolean;
  nearbyOffers: mainOfferType[];
  currentOffer: Nullable<currentOfferType>;
  comments: commentsType;
  favorites: mainOfferType[];
};

const initialState: InitialStateType = {
  user: {},
  city: cities[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isLoading: false,
  isSending: false,
  isOffersDataLoading: false,
  nearbyOffers: [],
  currentOffer: null,
  comments: [],
  favorites: []
};

export const Slice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })

      .addCase(postReviewAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isSending = false;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isSending = false;
      })

      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = {};
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.favorites = [];
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })

      .addCase(toggleFavoritesAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
          state.currentOffer.isFavorite = updatedOffer.isFavorite;
        }
        const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        if (offerIndex !== -1) {
          state.offers[offerIndex].isFavorite = updatedOffer.isFavorite;
        }
        const nearbyIndex = state.nearbyOffers.findIndex((offer) => offer.id === updatedOffer.id);
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex].isFavorite = updatedOffer.isFavorite;
        }

      });
  },
});

export const { changeCity, setError } = Slice.actions;
