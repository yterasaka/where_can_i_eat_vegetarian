import React, { useRef, useCallback, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import PlaceInfo from "../PlaceInfo";
import { locations } from "@/utils/constants";

// 地図の大きさを指定
const containerStyle = {
  width: "100%",
  height: "calc(100svh - 60px)",
};

const options = {
  disableDefaultUI: true, // 衛星写真オプションをキャンセル
  zoomControl: true,
};

function Map({ selectedCity, businessList, isListView, setIsListView }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });
  const [center, setCenter] = useState("");

  useEffect(() => {
    setCenter(locations[selectedCity]);
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
        {
          <PlaceInfo
            businessList={businessList}
            isListView={isListView}
            setIsListView={setIsListView}
          />
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
