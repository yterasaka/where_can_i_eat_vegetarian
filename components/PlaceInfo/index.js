/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { IconContext } from "react-icons";
import { BiLinkExternal } from "react-icons/bi";
import {
  BsStarFill,
  BsFillHouseHeartFill,
  BsPhoneFill,
  BsBookmarkHeartFill,
  BsBookmarkHeart,
} from "react-icons/bs";
import styles from "./index.module.css";
import AppContext from "@/context/AppContext";
import Image from "next/image";

export default function PlaceInfo({ businessList, isListView, setIsListView }) {
  const { userState, favorites, setFavorites, selected, setSelected } =
    useContext(AppContext);

  const handleToggleFavorite = (data) => {
    const duplicate = favorites.findIndex((item) => item.id === data.id);
    if (duplicate === -1) {
      setFavorites([...favorites, data]);
    } else {
      setFavorites(favorites.filter((item) => item.id !== data.id));
    }
  };

  // TODO: useStateを使って書き直す
  const toggleIcon = () => {
    if (selected) {
      const toggle = favorites.some((item) => item.id === selected.id);
      return toggle;
    }
  };

  const handleToggleView = (marker) => {
    setSelected(marker);
    if (isListView) {
      setIsListView(false);
    }
  };

  return (
    <>
      {businessList?.map((marker, index) => (
        <MarkerF
          key={`${marker.coordinates.latitude * marker.coordinates.longitude}`}
          position={{
            lat: marker.coordinates.latitude,
            lng: marker.coordinates.longitude,
          }}
          onClick={() => {
            handleToggleView(marker);
          }}
          label={{ text: `${index + 1}`, color: "#fff" }}
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
            {selected.image_url && (
              <img
                src={selected.image_url}
                alt="Restaurant image"
                className={styles.image}
              />
            )}
            {!selected.image_url && (
              <Image
                src="/image/No_Image_Available.jpg"
                alt="No image available"
                width={150}
                height={150}
                className={`${styles.image} ${styles.image__noimage}`}
              />
            )}
            <h1>{selected.name}</h1>
            <p className={styles.alias}>{selected.alias}</p>
            <IconContext.Provider value={{ className: styles.star }}>
              <p>
                <BsStarFill /> {selected.rating}
              </p>
            </IconContext.Provider>
            <p className={styles.categories}>{selected.categories}</p>
            <p className={styles.location}>
              <BsFillHouseHeartFill className={styles.icon} />{" "}
              {selected.location}
            </p>
            <p className={styles.phone}>
              <BsPhoneFill className={styles.icon} /> {selected.phone}
            </p>

            <div className={styles.footer}>
              <IconContext.Provider value={{ className: styles.link }}>
                <a href={selected.url} target="blank" rel="noopener noreferrer">
                  Link <BiLinkExternal />
                </a>
              </IconContext.Provider>
              {userState && (
                <button
                  className={styles.favoritesBtn}
                  onClick={() => handleToggleFavorite(selected)}
                >
                  {/* できれば三項演算子で関数は使わない */}
                  {toggleIcon() ? (
                    <BsBookmarkHeartFill
                      className={styles.favoritesBtnIconOn}
                    />
                  ) : (
                    <BsBookmarkHeart className={styles.favoritesBtnIconOff} />
                  )}
                </button>
              )}
            </div>
          </div>
        </InfoWindowF>
      )}
    </>
  );
}
