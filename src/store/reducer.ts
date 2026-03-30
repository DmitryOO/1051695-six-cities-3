import { createReducer } from '@reduxjs/toolkit';
import { changeCity, showOffers } from './action';
import { cities } from '../consts';
import { offers } from '../mocks/offers-mock';
import { mainOfferType } from '../pages/main-page/main-offer-type';
import { Nullable } from 'vitest';

type InitialStateType = {
  city: Nullable<string>;
  offers: mainOfferType[];
}
const initialState: InitialStateType = {
  city: cities[0],
  offers: offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
  // .addCase(showOffers, (state, action) => {
  //   state.offers = action.payload || [];
  // });
});
