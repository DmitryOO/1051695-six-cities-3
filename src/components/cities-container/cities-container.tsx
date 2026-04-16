
import Map from '../../components/map/map';
import { useState, useCallback } from 'react';
import { Nullable } from 'vitest';
import { mainOfferType } from '../../pages/main-page/main-offer-type';
import OffersList from '../../components/offers-list/offers-list';
import SortMenu from '../../components/sort-menu/sort-menu';
import { SortOption } from '../../consts';

type CitiesContainer = {
  offers: mainOfferType[];
  currentCity: Nullable<string>;
}

function CitiesContainer({ offers, currentCity }: CitiesContainer): JSX.Element {
  const [selectedCardId, setSelectedCardId] = useState<Nullable<string>>(null);
  const handleHover = useCallback((offer?: string) => {
    setSelectedCardId(offer || null);
  }, []);
  const [activeSort, setActiveSort] = useState(SortOption.Popular);


  let sortedOffers = offers;

  if (activeSort === SortOption.PriceLowToHigh) {
    sortedOffers = offers.toSorted((a: mainOfferType, b: mainOfferType) => a.price - b.price);
  }
  if (activeSort === SortOption.PriceHighToLow) {
    sortedOffers = offers.toSorted((a: mainOfferType, b: mainOfferType) => b.price - a.price);
  }
  if (activeSort === SortOption.TopRatedFirst) {
    sortedOffers = offers.toSorted((a: mainOfferType, b: mainOfferType) => b.rating - a.rating);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} place{offers.length === 1 || 's'} to stay in {currentCity}</b>
          <SortMenu current={activeSort} setter={setActiveSort} />
          <div className="cities__places-list places__list tabs__content">
            <OffersList offers={sortedOffers} handleHover={handleHover} />
          </div>
        </section>
        <div className="cities__right-section">
          <Map className="cities__map map" offers={sortedOffers} selectedCardId={selectedCardId} />
        </div>
      </div>
    </div>);
}

export default CitiesContainer;

