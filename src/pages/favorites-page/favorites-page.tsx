import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { mainOfferType } from '../main-page/main-offer-type';
import CitiesCard from '../../components/cities-card/cities-card';

type favoritePageProps = {
  isSignedIn: boolean;
  offers: mainOfferType[];
}

function FavoritesPage({ isSignedIn, offers }: favoritePageProps): JSX.Element {
  const uniqueCities = Array.from(new Set(offers.map((offer) => offer.city.name)));
  return (
    <div className="page">
      <Header isSignedIn={isSignedIn} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {uniqueCities.map((city) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offers.map((offer) => (offer.city.name === city ?
                      <CitiesCard key={offer.id} offer={offer} page='favorites' imgWidth={150} imgHeight={110} infoClass='favorites__card-info'/>
                      : null))}
                  </div>
                </li>))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
