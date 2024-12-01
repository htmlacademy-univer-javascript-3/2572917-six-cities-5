import React, {useEffect, useRef} from 'react';
import {ICity, IPlaceCard} from '../types.ts';
import {Icon, layerGroup, Marker} from 'leaflet';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../constant.ts';
import useMap from '../hooks/usemap.tsx';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: ICity;
  places: IPlaceCard[];
  selectedPlace: IPlaceCard | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const Map: React.FC<MapProps> = (props: MapProps) => {
  const {city, places, selectedPlace} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      places.forEach((place: IPlaceCard) => {
        const marker = new Marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        });

        marker
          .setIcon(
            selectedPlace !== undefined && place.name === selectedPlace.name
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, places, selectedPlace]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
};
