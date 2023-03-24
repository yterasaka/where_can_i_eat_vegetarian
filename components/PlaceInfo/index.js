import React, { useContext, useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { IconContext } from "react-icons";
import { BsStarFill } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import styles from "./index.module.css";
import AppContext from "@/context/AppContext";

export default function PlaceInfo({ businessList }) {
  const { favorites, setFavorites } = useContext(AppContext);
  const [selected, setSelected] = useState(null);

  const handleToggleFavorite = (data) => {
    if (!favorites) {
      setFavorites([data]);
      return;
    }
    const duplicate = favorites.findIndex((item) => item.id === data.id);
    if (duplicate === -1) {
      // console.log("重複なし");
      setFavorites([...favorites, data]);
    } else {
      // console.log("重複あり", duplicate);
      setFavorites(favorites.filter((item) => item.id !== data.id));
    }
  };

  // favorite に追加されているレストランのハートマークをピンクにする
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
            url: "/carrot.svg", // この部分だけ、お気に入り表示の時にハートに変化するように変更
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
                onClick={() => handleToggleFavorite(selected)} // テスト用。
              >
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
