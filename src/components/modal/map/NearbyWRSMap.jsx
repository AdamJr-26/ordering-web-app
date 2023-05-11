import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  CircleMarker,
} from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import * as L from "leaflet";
import DraggableMarker from "./DraggableMarker";
import FixedMarker from "./FixedMarker";
import axiosAPI from "../../../services/api.axios";
import { useAuth } from "../../../hooks/auth";
import UpdateAddess from "../UpdateAddess";

function NearbyWRSMap({ station, setStation }) {
  const { profile } = useAuth();
  const address = profile?.data?.data.address;
  const complete_address = `${address?.municipal_city} ${
    address?.province || ""
  } Philippines`;
  console.log("complete_address", complete_address);

  // update draggable position.
  const [position, setPosition] = useState(null);

  // get location
  useEffect(() => {
    async function getGeolocation() {
      try {
        const result = await axiosAPI().get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            complete_address
          )}&format=geojson`,
          {
            method: "GET",
            headers: {
              "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
            },
            withCredentials: false,
          }
        );
        if (result.data.features.length) {
          setPosition(
            L.latLng(
              result.data.features[0]?.geometry?.coordinates[1],
              result.data.features[0]?.geometry?.coordinates[0]
            )
          );
        }
      } catch (error) {
        console.log("errrrrrrrr", error);
      }
    }
    getGeolocation();
  }, []);

  // update radius.
  const [radius, setRadius] = useState(200);
  const metric = L.CRS.EPSG3857;
  const radiusInMeters = 10000;
  const radiusInPixels = metric.scale(radiusInMeters) / metric.scale(1);

  // fetch all nearby stations
  const [stations, setStations] = useState([]);
  useEffect(() => {
    async function getAllNearbyStation() {
      if (!position) return;
      try {
        const res = await axiosAPI().get(
          `/api/stations/nearby/${position.lng}/${position.lat}`
        );
        console.log("resssssss", res?.data?.data);
        setStations(res?.data?.data);
      } catch (error) {
        console.log("errrrrrr", error);
      }
    }
    getAllNearbyStation();
  }, [position]);
  console.log("position", position);
  return position ? (
    <MapContainer
      style={{ width: "100%", height: "100%" }}
      center={position}
      zoom={14}
      scrollWheelZoom={true}
      zoomControl={false}
      crs={metric}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker position={position} setPosition={setPosition} />
      <CircleMarker
        center={position}
        fillColor="#52ab98"
        fillOpacity={0.2}
        stroke={false}
        radius={radius}
      />
      {stations.map((station, i) => (
        <FixedMarker key={i} station={station} setStation={setStation} />
      ))}
    </MapContainer>
  ) : (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-1">
      <p className="font-bold text-[24px]">Getting your location...</p>
      <p>
        If a prompt appears asking to allow your location on the browser, please
        click 'Allow'.
      </p>
      <p>
        When the map has already appeared, you can click on it to automatically
        locate your current location.
      </p>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-row gap-2 items-center">
          <span>Or you can update your address by clicking on </span>
          <UpdateAddess />
        </div>
      </div>
    </div>
  );
}

export default NearbyWRSMap;
