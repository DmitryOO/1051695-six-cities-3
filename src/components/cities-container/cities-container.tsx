
import Map from '../../components/map/map';
import { useState, useEffect } from 'react';
import { Nullable } from 'vitest';
import { mainOfferType } from '../../pages/main-page/main-offer-type';
import OffersList from '../../components/offers-list/offers-list';

type CitiesContainer = {
  rentOffersCount: number;
  offers: mainOfferType[];
}

function CitiesContainer({ rentOffersCount, offers }: CitiesContainer): JSX.Element {
  const [selectedCardId, setSelectedCardId] = useState<Nullable<string>>(null);
  const handleHover = (offer?: string) => {
    setSelectedCardId(offer || null);
  };

  useEffect(() => {
    //   console.log('component did update');
    // },[offers]);
    // useEffect(()=>{
    //   console.warn(onHoverCard);

    //   return ()=>{
    //     console.log('compt will unmount');
    //   };
  }, []);
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{rentOffersCount} places to stay in Amsterdam</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li
                className="places__option places__option--active"
                tabIndex={0}
              >
                Popular
              </li>
              <li className="places__option" tabIndex={0}>
                Price: low to high
              </li>
              <li className="places__option" tabIndex={0}>
                Price: high to low
              </li>
              <li className="places__option" tabIndex={0}>
                Top rated first
              </li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            <OffersList offers={offers} handleHover = {handleHover}/>
          </div>
        </section>
        <div className="cities__right-section">
          <Map className="cities__map map" offers={offers} city={offers[0]} selectedCardId={selectedCardId} />
        </div>
      </div>
    </div>);
}

export default CitiesContainer;

