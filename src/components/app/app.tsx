import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { Settings, AppRoute } from '../../consts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { offers } from '../../mocks/offers-mock';
import { currentOffer } from '../../mocks/current-offer-mock';
import { comments } from '../../mocks/comments-mock';


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage rentOffersCount={Settings.rentOffersCount} isSignedIn={Settings.isSignedIn} offers= {offers}/>}
        />
        <Route
          path={AppRoute.Favorite}
          element={
            <PrivateRoute authorizationStatus = {Settings.isSignedIn}>
              <FavoritesPage isSignedIn = {Settings.isSignedIn} offers= {offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage isSignedIn={Settings.isSignedIn} />}
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage isSignedIn={Settings.isSignedIn} offers={offers} currentOffer ={currentOffer} comments={comments}/>}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
      {/* <NotFoundPage />
      <MainPage rentOffersCount={Settings.rentOffersCount} isSignedIn={Settings.isSignedIn} /> */}
    </BrowserRouter>
  );
}

export default App;
