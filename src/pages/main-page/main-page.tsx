import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import CitiesContainer from '../../components/cities-container/cities-container';
import MainEmpty from '../../components/main-empty/main-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { State } from '../../store/index';
import { changeCity } from '../../store/offer-slice/offer-slice';

type mainPageProps = {
  isSignedIn: string;
}

function MainPage({ isSignedIn }: mainPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state: State) => state.city);
  const offers = useAppSelector((state: State) => state.offers);
  const cityOffers = offers?.filter((offer) => (offer.city.name === currentCity));
  const emptyClass = cityOffers.length === 0 ? ' page__main--index-empty' : '';
  const favoriteOffersCount = offers.filter((offer) => (offer.isFavorite)).length;
  return (
    <div className='page page--gray page--main'>
      <Header isSignedIn={isSignedIn} favoriteOffersCount={favoriteOffersCount} />
      <main className={`page__main page__main--index${emptyClass}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList currentCity={currentCity} onCityClick={(city) => dispatch(changeCity(city))} />
        </div>
        {cityOffers.length > 0
          ? <CitiesContainer offers={cityOffers} currentCity={currentCity} />
          : <MainEmpty currentCity={currentCity} />}
      </main>
    </div>
  );
}

export default MainPage;
