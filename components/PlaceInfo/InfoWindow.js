/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import Image from "next/image";
import { InfoWindowF } from "@react-google-maps/api";
import { IconContext } from "react-icons";
import { BsStarFill, BsFillHouseHeartFill, BsPhoneFill } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import styles from "./index.module.css";
import FavoriteButton from "../FavoriteButton";

const InfoWindow = () => {
  const { selected, setSelected, setSelectedIndex } = useContext(AppContext);

  const handleCloseInfoWindow = () => {
    setSelected(null);
    setSelectedIndex(null);
  };

  return (
    <InfoWindowF
      position={{
        lat: selected.coordinates.latitude,
        lng: selected.coordinates.longitude,
      }}
      onCloseClick={handleCloseInfoWindow}
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
          <BsFillHouseHeartFill className={styles.icon} /> {selected.location}
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
          <FavoriteButton businessListItem={selected} />
        </div>
      </div>
    </InfoWindowF>
  );
};

export default InfoWindow;
