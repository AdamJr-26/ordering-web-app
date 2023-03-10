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
function FixedMarker({ station, setStation }) {
  const center = {
    lat: station.dist.location.coordinates[1],
    lng: station.dist.location.coordinates[0],
  };

  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const LeafIcon = L.Icon.extend({
    options: {},
  });
  const blueIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
  });
  return (
    <Marker
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={blueIcon}
    >
      <Popup minWidth={90}>
        <div
          onClick={() => setStation(station)}
          className="flex flex-col rounded-lg gap-0"
        >
          <div className="flex flex-row gap-2  items-center">
            <div className="min-h-[50px] min-w-[50px] bg-teal rounded-lg "></div>
            <p className="p-0 font-bold text-[24px]">{station.wrs_name}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-[-30px]">
            <span className="text-[16px]">
              <Icon icon="material-symbols:location-on" />
            </span>
            <p className="p-0 mt-[-10px]">{`${station.address.street_building}, ${station.address.barangay}, ${station.address.city}, ${station.address.province}`}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-[-20px]">
            <span className="text-[16px]">
              <Icon icon="game-icons:path-distance" />
            </span>
            {(station?.dist?.calculated / 1000).toFixed(1)} KM
            <p className="p-0 mt-[-10px]"></p>
          </div>
          <div className="w-full">
            <button className="w-full px-5 py-2 bg-aqua-marine text-white font-bold rounded-lg">
              View
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
export default FixedMarker;
