import React, { useRef, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// import PlaceInfo from './GoogleMapPlaceinfo';

// 地図の大きさを指定
const containerStyle = {
  width: "100%",
  height: "calc(100svh - 60px)",
};

// テスト
const center = {
  lat: 35.710057714926265,
  lng: 139.81071829999996,
};

// オプション
const options = {
  disableDefaultUI: true, // 衛星写真オプションをキャンセル
  zoomControl: true,
};

function Map() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={options}
        onLoad={onMapLoad}
      >
        {
          // ...Your map components
          // <PlaceInfo />
        }
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <></>;
}

export default Map;
