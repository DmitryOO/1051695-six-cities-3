import { mainOfferType } from '../../pages/main-page/main-offer-type';
import CitiesCard from '../cities-card/cities-card';


type offersListProps = {
  offers: mainOfferType[];
  page?:string;
  handleHover?: (offer?: string) => void;
}


function OffersList({ offers, handleHover, page }: offersListProps): JSX.Element {


  return (
    <>
      {offers.map((offer) => <CitiesCard handleHover={handleHover} key={offer.id} offer={offer} page={page} />)}
    </>
  );
}

export default OffersList;
