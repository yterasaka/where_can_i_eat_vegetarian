import React, { useRef, useCallback, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import PlaceInfo from "./Placeinfo";

// 地図の大きさを指定
const containerStyle = {
  width: "100%",
  height: "calc(100svh - 60px)",
};

const options = {
  disableDefaultUI: true, // 衛星写真オプションをキャンセル
  zoomControl: true,
};

function Map({ selectedCity, businessList }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });
  const [center, setCenter] = useState("");

  useEffect(() => {
    const centerCity = () => {
      switch (selectedCity) {
        case "Sapporo":
          setCenter({
            lat: 43.068661,
            lng: 141.350755,
          });
          break;
        case "Tokyo":
          setCenter({
            lat: 35.681236,
            lng: 139.767125,
          });
          break;
        case "Yokohama":
          setCenter({
            lat: 35.465981,
            lng: 139.622062,
          });
          break;
        case "Nagoya":
          setCenter({
            lat: 35.170915,
            lng: 136.881537,
          });
          break;
        case "Kyoto":
          setCenter({
            lat: 34.985849,
            lng: 135.758767,
          });
          break;
        case "Osaka":
          setCenter({
            lat: 34.702485,
            lng: 135.495951,
          });
          break;
        case "Fukuoka":
          setCenter({
            lat: 33.581322,
            lng: 130.424997,
          });
          break;
        default:
          setCenter({
            lat: 35.681236,
            lng: 139.767125,
          });
      }
    };
    centerCity();
  }, [selectedCity]);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={options}
        onLoad={onMapLoad}
      >
        {<PlaceInfo businessList={businessList} />}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <></>;
}

export default Map;
