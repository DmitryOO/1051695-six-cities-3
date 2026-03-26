import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import Form from '../../components/form/form';
import { mainOfferType } from '../main-page/main-offer-type';
import { currentOfferType } from './current-offer-type';
import { commentsType } from './comments-type';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import dayjs from 'dayjs';

type offerPageProps = {
  isSignedIn: boolean;
  offers: mainOfferType[];
  currentOffers: currentOfferType[];
  comments: commentsType;
}

function OfferPage({ isSignedIn, offers, currentOffers, comments }: offerPageProps){
  const { id: offerId = '' } = useParams();
  const currentOffer = currentOffers.find((el) => (el.id === offerId));
  if (!currentOffer) {
    return <NotFoundPage />;
  }
  const {
    // id,
    bedrooms,
    // city,
    description,
    goods,
    host,
    images,
    isFavorite,
    isPremium,
    // location,
    maxAdults,
    price,
    rating,
    title,
    type
  } = currentOffer;
  return (
    <div className="page">
      <Header isSignedIn={isSignedIn} />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((img, i) => (
                i < 6 &&
                <div key={img + Math.random()} className="offer__image-wrapper">
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
                <button className={`offer__bookmark-button button ${isFavorite && 'offer__bookmark-button--active'}`} type="button">
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
                  <div className={`offer__avatar-wrapper offer__avatar-wrapper${host.isPro && '--pro'} user__avatar-wrapper`}>
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
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ul className="reviews__list">
                  {comments.map((comment) => (
                    <li key={comment.id} className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img
                            className="reviews__avatar user__avatar"
                            src={comment.user.avatarUrl}
                            width={54}
                            height={54}
                            alt="Reviews avatar"
                          />
                        </div>
                        <span className="reviews__user-name">{comment.user.name}</span>
                        {comment.user.isPro && <span className="offer__user-status">Pro</span>}
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{ width: `${comment.rating * 20}%` }} />
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
                          {comment.comment}
                        </p>
                        <time className="reviews__time" dateTime={dayjs(comment.date).format('YYYY-MM-DD')}>
                          {dayjs(comment.date).format('MMMM YYYY')}
                        </time>
                      </div>
                    </li>))}
                </ul>
                {isSignedIn && <Form />}
              </section>
            </div>
          </div>
          <Map className="offer__map map" offers={currentOffers} city={offers[3]}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList offers={currentOffers} isOfferPage />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
