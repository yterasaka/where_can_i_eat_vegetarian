import React, { useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import Link from "next/link";
import styles from "./placeinfo.module.css";

export default function PlaceInfo({ businessList }) {
  const [selected, setSelected] = useState(null);

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
          icon={{
            url: "/tomato.svg",
          }}
        />
      ))}

      {selected ? (
        <InfoWindowF
          position={{
            lat: selected.coordinates.latitude,
            lng: selected.coordinates.longitude,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div className={styles.infoWindows}>
            <h1>{selected.name}</h1>
            <p className={styles.alias}>{selected.alias}</p>
            <p className={styles.categories}>{selected.categories}</p>
            <p>{selected.location}</p>
            <p>{selected.phone}</p>
            <Link href={selected.url}>Link</Link>
          </div>
        </InfoWindowF>
      ) : null}
    </>
  );
}
