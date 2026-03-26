import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { Settings, AppRoute } from '../../consts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { offers } from '../../mocks/offers-mock';
import { currentOffers } from '../../mocks/current-offer-mocks';
import { comments } from '../../mocks/comments-mock';


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage rentOffersCount={Settings.rentOffersCount} isSignedIn={Settings.isSignedIn} offers={offers} />}
        />
        <Route
          path={AppRoute.Favorite}
          element={
            <PrivateRoute authorizationStatus={Settings.isSignedIn}>
              <FavoritesPage isSignedIn={Settings.isSignedIn} offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage isSignedIn={Settings.isSignedIn} />}
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage isSignedIn={Settings.isSignedIn} offers={offers} currentOffers={currentOffers} comments={comments} />}
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
