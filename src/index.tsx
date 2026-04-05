import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOfferAction } from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchOfferAction());
// store.dispatch(logoutAction());

// store.dispatch(logoutAction({email:'123q@nm.ru', password:'1234aa'}));
// store.dispatch(loginAction({email:'123q@nm.ru', password:'1234aa'}));
// store.dispatch(checkAuthAction());
// store.dispatch(checkAuthAction());
// store.dispatch(checkAuthAction());
// store.dispatch(logoutAction({email:'123q@nm.ru', password:'1234aa'}));
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
