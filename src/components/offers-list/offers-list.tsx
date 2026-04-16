import { mainOfferType } from '../../pages/main-page/main-offer-type';
import CitiesCard from '../cities-card/cities-card';
import { memo } from 'react';


type offersListProps = {
  offers: mainOfferType[];
  page?: string;
  handleHover?: (offer?: string) => void;
}


const OffersListComponent = ({ offers, handleHover, page }: offersListProps): JSX.Element =>(
  <>
    {offers.map((offer) => <CitiesCard handleHover={handleHover} key={offer.id} offer={offer} page={page} />)}
  </>
);

const OffersList = memo(OffersListComponent);

export default OffersList;
