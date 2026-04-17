import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import CitiesCard from '../../components/cities-card/cities-card';
import { CitiesCardClass } from '../../consts';
import { useAppSelector } from '../../hooks';

type favoritePageProps = {
  isSignedIn: string;
}

function FavoritesPage({ isSignedIn }: favoritePageProps): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);
  const uniqueCities = Array.from(new Set(favorites.map((offer) => offer.city.name)));
  const emptyMainClass = uniqueCities.length > 0 ? ' page__main--favorites-empty' : '';

  return (
    <div className="page">
      <Header isSignedIn={isSignedIn} />
      <main className={`page__main page__main--favorites${emptyMainClass}`}>
        <div className="page__favorites-container container">
          {uniqueCities.length > 0 ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {uniqueCities.map((city) => (
                  <li key={city || null} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" >
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favorites.map((offer) => (offer.city.name === city ?
                        <CitiesCard key={offer.id} offer={offer} page={CitiesCardClass.FAVORITES} imgWidth={150} imgHeight={110} infoClass='favorites__card-info' />
                        : null))}
                    </div>
                  </li>))}
              </ul>
            </section>
            : <FavoritesEmpty />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
