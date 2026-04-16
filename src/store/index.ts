import { configureStore } from '@reduxjs/toolkit';
import { Slice } from './slice';

import createAPI from '../services/api';
const api = createAPI();

export const store = configureStore({
  reducer: Slice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
