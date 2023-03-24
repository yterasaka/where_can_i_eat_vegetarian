import React, { useContext, useEffect, useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { IconContext } from "react-icons";
import { BiLinkExternal } from "react-icons/bi";
import {
  BsStarFill,
  BsBookmarkHeartFill,
  BsBookmarkHeart,
} from "react-icons/bs";
import styles from "./index.module.css";
import AppContext from "@/context/AppContext";

export default function PlaceInfo({ businessList }) {
  const { favorites, setFavorites } = useContext(AppContext);
  const [selected, setSelected] = useState(null);

  const handleToggleFavorite = (data) => {
    const duplicate = favorites.findIndex((item) => item.id === data.id);
    if (duplicate === -1) {
      setFavorites([...favorites, data]);
    } else {
      setFavorites(favorites.filter((item) => item.id !== data.id));
    }
  };

  // favorite に追加されているレストランのハートマークをピンクにする
  // TODO: useStateを使って書き直す
  const toggleIcon = () => {
    if (selected) {
      const toggle = favorites.some((item) => item.id === selected.id);
      return toggle;
    }
  };

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
            url: "/carrot.svg",
          }}
        />
      ))}

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

            <div className={styles.footer}>
              <IconContext.Provider value={{ className: styles.link }}>
                <a href={selected.url} target="blank" rel="noopener noreferrer">
                  Link <BiLinkExternal />
                </a>
              </IconContext.Provider>
              <button
                className={styles.favoritesBtn}
                onClick={() => handleToggleFavorite(selected)}
              >
                {/* できれば三項演算子で関数は使わない */}
                {toggleIcon() ? (
                  <BsBookmarkHeartFill className={styles.favoritesBtnIconOn} />
                ) : (
                  <BsBookmarkHeart className={styles.favoritesBtnIconOff} />
                )}
              </button>
            </div>
          </div>
        </InfoWindowF>
      )}
    </>
  );
}
