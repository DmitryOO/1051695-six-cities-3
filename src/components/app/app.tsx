import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Spinner from '../spinner/spinner';
import { AppRoute } from '../../consts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';


function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const stateOffers = useAppSelector((state) => state.offers);
  const stateAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);

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
          element={
            <PrivateRoute authorizationStatus={stateAuthorizationStatus} isLoginPage>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage isSignedIn={stateAuthorizationStatus} offers={stateOffers} />}
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
