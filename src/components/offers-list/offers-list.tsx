import { mainOfferType } from '../../pages/main-page/main-offer-type';
import CitiesCard from '../cities-card/cities-card';
import { NEAR_PLACES_MAX_LENGTH, CitiesCardClass } from '../../consts';


type offersListProps = {
  offers: mainOfferType[];
  isOfferPage?: boolean;
  handleHover?: (offer?: string) => void;
}


function OffersList({ offers, isOfferPage = false, handleHover }: offersListProps): JSX.Element {
  if (isOfferPage) {
    return (
      <>
        {offers.slice(0, NEAR_PLACES_MAX_LENGTH).map((offer) => <CitiesCard handleHover={handleHover} key={offer.id} offer={offer} page={CitiesCardClass.NEAR_PLACES} />)}
      </>
    );
  }

  return (
    <>
      {offers.map((offer) => <CitiesCard handleHover={handleHover} key={offer.id} offer={offer} page={CitiesCardClass.CITIES} />)}
    </>
  );
}

export default OffersList;
