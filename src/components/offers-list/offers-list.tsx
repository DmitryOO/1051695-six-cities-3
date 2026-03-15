import { mainOfferType } from '../../pages/main-page/main-offer-type';
import { useState, useEffect } from 'react';
import CitiesCard from '../cities-card/cities-card';
import { Nullable } from 'vitest';

type offersListProps = {
  offers: mainOfferType[];
}


function OffersList({ offers }: offersListProps): JSX.Element {
  const [onHoverCard, setOnHoverCard] = useState<Nullable<mainOfferType>>(null);
  const handleHover = (offer?: mainOfferType) => {
    setOnHoverCard(offer || null);
  };

  useEffect(()=>{
    console.log('component did update');
  },[offers]);
  useEffect(()=>{
    console.warn(onHoverCard);

    return ()=>{
      console.log('compt will unmount');
    };
  },[]);

  return (
    <>
      {offers.map((offer) => <CitiesCard handleHover={handleHover} key={offer.id} offer={offer} page="cities" />)}
    </>
  );
}

export default OffersList;
