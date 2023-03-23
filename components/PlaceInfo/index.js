import React, { useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { IconContext } from "react-icons";
import { BsStarFill } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import styles from "./index.module.css";

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
            url: "/carrot.svg", // この部分だけ、お気に入り表示の時にハートに変化するように変更
          }}
        />
      ))}

      {/* && で置き換えられる */}
      {selected && (
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
            <IconContext.Provider value={{ className: styles.star }}>
              <p>
                <BsStarFill /> {selected.rating}
              </p>
            </IconContext.Provider>
            <p className={styles.categories}>{selected.categories}</p>
            <p>{selected.location}</p>
            <p>{selected.phone}</p>
            <IconContext.Provider value={{ className: styles.link }}>
              <a href={selected.url} target="blank" rel="noopener noreferrer">
                Link <BiLinkExternal />
              </a>
            </IconContext.Provider>
          </div>
        </InfoWindowF>
      )}
    </>
  );
}
