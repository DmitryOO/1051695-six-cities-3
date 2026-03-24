import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import { cities } from '../../consts';
import { mainOfferType } from './main-offer-type';
import CitiesContainer from '../../components/cities-container/cities-container';

type mainPageProps = {
  rentOffersCount: number;
  isSignedIn: boolean;
  offers: mainOfferType[];
}

function MainPage({ rentOffersCount, isSignedIn, offers }: mainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header isSignedIn={isSignedIn} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          {LocationsList(cities)}
        </div>
        <CitiesContainer rentOffersCount={rentOffersCount} offers={offers} />
      </main>
    </div>
  );
}

export default MainPage;
