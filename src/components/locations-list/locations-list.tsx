

function LocationsList(locations: string[]): JSX.Element {

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {locations.map((el) => (
          < li className="locations__item" key={el}>
            <a className="locations__item-link tabs__item" href="#">
              <span>{el}</span>
            </a>
          </li>))}
      </ul>
    </section>);
}

export default LocationsList;
