import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOffersAction,clearErrorAction } from './store/api-actions';
import { setError } from './store/slice';

store.dispatch(checkAuthAction())
  .unwrap()
  .catch((err: { message: string }) => {
    store.dispatch(setError(err.message || 'error'));
    store.dispatch(clearErrorAction());
  });
store.dispatch(fetchOffersAction())
  .unwrap()
  .catch((err: { message: string }) => {
    store.dispatch(setError(err.message || 'error'));
    store.dispatch(clearErrorAction());
  });
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
