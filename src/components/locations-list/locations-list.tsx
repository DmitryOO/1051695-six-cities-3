import { cities } from '../../consts';
import { Nullable } from 'vitest';

type LocationsListProps = {
  currentCity: Nullable<string>;
  onCityClick: (city: string) => void;
};

function LocationsList({currentCity, onCityClick}:LocationsListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((el) => (
          < li className="locations__item" key={el}>
            <a className={`locations__item-link tabs__item ${el === currentCity && 'tabs__item--active'}`}
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
    </section>);
}

export default LocationsList;
