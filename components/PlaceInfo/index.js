/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from "react";
import { MarkerF } from "@react-google-maps/api";
import AppContext from "@/context/AppContext";
import ActiveMarker from "./ActiveMarker";
import InfoWindow from "./InfoWindow";

export default function PlaceInfo({ businessList, isListView }) {
  const {
    selected,
    setSelected,
    selectedIndex,
    setSelectedIndex,
    setSelectedMarker,
  } = useContext(AppContext);

  const handleClickMarker = (marker) => {
    if (isListView) {
      setSelectedMarker(marker.index);
      setSelectedIndex(marker.index + 1);
      return;
    }
    setSelected(marker);
    setSelectedIndex(null);
  };

  useEffect(() => {
    businessList?.map((item) => {
      if (item.id === selected?.id) {
        setSelectedIndex(item.index + 1);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, selectedIndex, businessList]);

  return (
    <>
      {businessList?.map((marker) => (
        <MarkerF
          key={marker.index}
          position={{
            lat: marker.coordinates.latitude,
            lng: marker.coordinates.longitude,
          }}
          onClick={() => {
            handleClickMarker(marker);
          }}
          label={{ text: `${marker.index + 1}`, color: "#fff" }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "#ff0000",
            fillOpacity: 1,
            scale: 14,
            strokeColor: "#fff",
            strokeWeight: 1,
          }}
        />
      ))}
      {selectedIndex && <ActiveMarker businessList={businessList} />}
      {selected && <InfoWindow />}
    </>
  );
}
