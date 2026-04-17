import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import Form from '../../components/form/form';
import Reviews from '../../components/reviews/reviews';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import { NEAR_PLACES_MAX_LENGTH, AppRoute } from '../../consts';
import { CitiesCardClass, AuthorizationStatus } from '../../consts';
import { fetchNearbyOffersAction, fetchCurrentOfferAction, fetchComments, toggleFavoritesAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner from '../../components/spinner/spinner';

type offerPageProps = {
  isSignedIn: string;
}

function OfferPage({ isSignedIn }: offerPageProps) {
  const { id: offerId = '' } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentOffer = useAppSelector((state) => state.currentOffer);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchCurrentOfferAction(offerId));
      dispatch(fetchNearbyOffersAction(offerId));
      dispatch(fetchComments(offerId));
    }
  }, [offerId, dispatch]);

  const nearbyOffers = useAppSelector((state) => state.nearbyOffers).slice(0, NEAR_PLACES_MAX_LENGTH);

  const comments = useAppSelector((state) => state.comments);
  const isLoading = useAppSelector((state) => state.isLoading);
  const mapOffers = useMemo(() => {
    if (!currentOffer) {
      return nearbyOffers;
    }
    return [...nearbyOffers, currentOffer];
  }, [nearbyOffers, currentOffer]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!currentOffer) {
    return <NotFoundPage />;
  }
  const {
    bedrooms,
    description,
    goods,
    host,
    images,
    isFavorite,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type
  } = currentOffer;

  const handleBookmarkClick = () => {
    if (isSignedIn !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(toggleFavoritesAction({
      id: offerId,
      status: isFavorite ? 0 : 1
    }));
  };

  return (
    <div className="page">
      <Header isSignedIn={isSignedIn} />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((img, i) => (
                i < 6 &&
                <div key={img} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={img}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button" onClick={handleBookmarkClick}>
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(rating) * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type[0].toUpperCase() + type.slice(1)}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults === 1 ? 'Adult' : 'Adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((el) => <li key={el} className="offer__inside-item">{el}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper offer__avatar-wrapper${host.isPro ? '--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <Reviews comments={comments} />
                {isSignedIn === AuthorizationStatus.Auth && <Form />}
              </section>
            </div>
          </div>
          <Map className="offer__map map" offers={mapOffers} />
        </section>
        <div className="container">
          <section className="near-places places">
            {nearbyOffers.length > 0 ?
              <>
                <h2 className="near-places__title">
                  Other places in the neighbourhood
                </h2>
                <div className="near-places__list places__list">
                  <OffersList offers={nearbyOffers} page={CitiesCardClass.NEAR_PLACES} />
                </div>
              </> : ''}

          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
