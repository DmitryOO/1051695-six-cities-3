import { mainOfferType } from '../../pages/main-page/main-offer-type';
import { AppRoute } from '../../consts';
import { Link } from 'react-router-dom';

type citiesCardProps = {
  offer: mainOfferType;
  handleHover?: (offer?: mainOfferType) => void;
  page?: string;
  imgWidth?: number;
  imgHeight?: number;
  infoClass?: string;
}

function CitiesCard({ offer, handleHover = () => {}, page = 'cities', imgWidth = 260, imgHeight = 200, infoClass = '' }: citiesCardProps): JSX.Element {
  const { price, title, type, isPremium, isFavorite, previewImage, rating } = offer;

  const handleMouseOn = () => {
    handleHover(offer);
  };
  const handleMouseOff = () => {
    handleHover();
  };


  return (
    <article className={`${page}__card place-card`} onMouseEnter={handleMouseOn} onMouseLeave={handleMouseOff }>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${page}__image-wrapper place-card__image-wrapper`}>
        <Link to={`../offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imgWidth}
            height={imgHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${infoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button  button ${isFavorite && 'place-card__bookmark-button--active'}`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`../offer/${offer.id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type[0].toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}

export default CitiesCard;
