import React, { useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";

export default function PlaceInfo({ businessList }) {
  const [selected, setSelected] = useState(null);

  console.log(selected);

  return (
    <>
      {businessList?.map((marker) => (
        <MarkerF
          key={`${marker.coordinates.latitude * marker.coordinates.longitude}`}
          position={{
            lat: marker.coordinates.latitude,
            lng: marker.coordinates.longitude,
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
            lat: selected.coordinates.latitude,
            lng: selected.coordinates.longitude,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>{selected.name}</div>
        </InfoWindowF>
      ) : null}
    </>
  );
}
