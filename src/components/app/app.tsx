import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Spinner from '../spinner/spinner';
import { Settings, AppRoute, AuthorizationStatus } from '../../consts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
// import { offers } from '../../mocks/offers-mock';
import { currentOffers } from '../../mocks/current-offer-mocks';
import { comments } from '../../mocks/comments-mock';
import { showOffers } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';


function App(): JSX.Element {

  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const stateOffers = useAppSelector((state) => state.offers);
  const stateAuthorizationStatus = useAppSelector((state)=> state.authorizationStatus);

  if (isOffersDataLoading === true) {
    return (
      <Spinner />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage isSignedIn={stateAuthorizationStatus} />}
        />
        <Route
          path={AppRoute.Favorite}
          element={
            <PrivateRoute authorizationStatus={stateAuthorizationStatus}>
              <FavoritesPage isSignedIn={stateAuthorizationStatus} offers={stateOffers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage isSignedIn={stateAuthorizationStatus} />}
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage isSignedIn={stateAuthorizationStatus} offers={stateOffers} currentOffers={currentOffers} comments={comments} />}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
