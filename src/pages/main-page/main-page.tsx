import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import CitiesContainer from '../../components/cities-container/cities-container';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { State } from '../../store';
import { changeCity } from '../../store/action';
import { mainOfferType } from './main-offer-type';
// import { Nullable } from 'vitest';

type mainPageProps = {
  isSignedIn: boolean;
  offers: mainOfferType[];
}

function MainPage({ isSignedIn,offers }: mainPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state: State) => state.city);
  const cityOffers = offers?.filter((offer) => (offer.city.name === currentCity));
  return (
    <div className="page page--gray page--main">
      <Header isSignedIn={isSignedIn} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList currentCity={currentCity} onCityClick={(city) => dispatch(changeCity(city))} />
        </div>
        {cityOffers.length > 0 ? <CitiesContainer offers={cityOffers} currentCity={currentCity} /> : null}
      </main>
    </div>
  );
}

export default MainPage;
