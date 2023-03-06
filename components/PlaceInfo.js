import React, { useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";

export default function PlaceInfo() {
  // マーカー
  const places = [
    {
      info: "info1",
      location: { lat: 35.710057714926265, lng: 139.81071829999996 },
    },
    {
      info: "info2",
      location: { lat: 35.69731, lng: 139.7747 },
    },
  ];

  // 選択（クリック）したマーカーのステート
  const [selected, setSelected] = useState(null);

  return (
    <>
      {places.map((marker) => (
        <MarkerF
          key={`${marker.location.lat * marker.location.lng}`}
          position={{
            lat: marker.location.lat,
            lng: marker.location.lng,
          }}
          onClick={() => {
            setSelected(marker);
          }}
        />
      ))}

      {selected ? (
        // MarkerがクリックされたときにInfoWindowが表示される
        <InfoWindowF
          position={{
            lat: selected.location.lat,
            lng: selected.location.lng,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>{selected.info}</div>
        </InfoWindowF>
      ) : null}
    </>
  );
}
