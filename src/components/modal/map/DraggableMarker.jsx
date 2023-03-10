import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
  CircleMarker,
} from "react-leaflet";
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import * as L from "leaflet";
import { Icon } from "@iconify/react";
function DraggableMarker({ position, setPosition }) {
  const LeafIcon = L.Icon.extend({
    options: {},
  });
  const blueIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
    }),
    greenIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
    });
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const markRef = useRef();
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  return position === null ? null : (
    <Marker
      eventHandlers={eventHandlers}
      draggable={true}
      ref={markRef}
      position={position}
      icon={greenIcon}
    >
      <Popup>
        <div>
          <p className="font-bold">You</p>
        </div>
      </Popup>
    </Marker>
  );
}
export default DraggableMarker;
