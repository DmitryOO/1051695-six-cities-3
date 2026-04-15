import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './offer-slice/offer-slice';

import createAPI from '../services/api';
const api = createAPI();

export const store = configureStore({
  reducer: offersSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
