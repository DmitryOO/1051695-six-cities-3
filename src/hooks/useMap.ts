import { useEffect, useState, useRef } from 'react';
import leaflet from 'leaflet';
import { mainOfferType } from '../pages/main-page/main-offer-type';
type useMapType = {
  mapRef: React.MutableRefObject<null>;
  city: mainOfferType;
}

function useMap({ mapRef, city }: useMapType) {
  const [map, setMap] = useState(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.city.location.latitude,
          lng: city.city.location.longitude,
        },
        zoom: city.city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
