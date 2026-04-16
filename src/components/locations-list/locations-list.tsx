import { cities } from '../../consts';
import { Nullable } from 'vitest';
import { memo } from 'react';

type LocationsListProps = {
  currentCity: Nullable<string>;
  onCityClick: (city: string) => void;
};

const LocationsListComponent = ({ currentCity, onCityClick }: LocationsListProps): JSX.Element => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((el) => (
        < li className="locations__item" key={el}>
          <a className={`locations__item-link tabs__item ${el === currentCity ? 'tabs__item--active' : ''}`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              onCityClick(el);
            }}
          >
            <span>{el}</span>
          </a>
        </li>))}
    </ul>
  </section>
);

const LocationsList = memo(LocationsListComponent);

export default LocationsList;
