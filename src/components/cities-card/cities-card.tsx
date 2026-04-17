import { mainOfferType } from '../../pages/main-page/main-offer-type';
import { AppRoute, CitiesCardClass, AuthorizationStatus } from '../../consts';
import { Link, useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { toggleFavoritesAction } from '../../store/api-actions';

type citiesCardProps = {
  offer: mainOfferType;
  handleHover?: (offer?: string) => void;
  page?: string;
  imgWidth?: number;
  imgHeight?: number;
  infoClass?: string;
}

const CitiesCardComponent = ({ offer, handleHover = () => { }, page = CitiesCardClass.CITIES, imgWidth = 260, imgHeight = 200, infoClass = '' }: citiesCardProps): JSX.Element => {
  const { id, price, title, type, isPremium, isFavorite, previewImage, rating } = offer;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const handleMouseOn = () => {
    handleHover(id);
  };
  const handleMouseOff = () => {
    handleHover();
  };
  const handleBookmarkClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(toggleFavoritesAction({
      id,
      status: isFavorite ? 0 : 1
    }));
  };


  return (
    <article className={`${page}__card place-card`} onMouseEnter={handleMouseOn} onMouseLeave={handleMouseOff}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${page}__image-wrapper place-card__image-wrapper`}>
        <Link to={`..${AppRoute.Offer}/${id}`}>
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
            onClick={handleBookmarkClick}
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
            <span style={{ width: `${Math.round(rating) * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`..${AppRoute.Offer}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type[0].toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
};
const CitiesCard = memo(CitiesCardComponent);

export default CitiesCard;
