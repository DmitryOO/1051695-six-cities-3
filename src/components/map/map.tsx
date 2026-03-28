import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import leaflet from 'leaflet';
import { UrlMarker } from '../../consts';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { mainOfferType } from '../../pages/main-page/main-offer-type';
import { Nullable } from 'vitest';

type MapType = {
  className: string;
  offers: mainOfferType[];
  selectedCardId?: Nullable<string>;
}

function Map({ className, offers, selectedCardId }: MapType): JSX.Element {
  const city = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });
  const { id: offerId = '' } = useParams();

  const defaultCustomIcon = leaflet.icon({
    iconUrl: UrlMarker.Default,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: UrlMarker.Current,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });
  const activeIcon = selectedCardId || offerId;

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeIcon)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, selectedCardId, currentCustomIcon, defaultCustomIcon, activeIcon]);

  return (
    <section
      className={className}
      ref={mapRef}
    >


    </section>
  );
}

export default Map;
