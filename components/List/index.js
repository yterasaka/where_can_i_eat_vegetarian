/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { IconContext } from "react-icons";
import { BiLinkExternal } from "react-icons/bi";
import { BsStarFill, BsPhoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import AppContext from "@/context/AppContext";
import FavoriteButton from "../FavoriteButton";

const List = ({ isListView, businessList }) => {
  const { setSelectedIndex, selectedMarker, setPanTo } = useContext(AppContext);

  const handleMouseEnter = (index) => {
    setSelectedIndex(index);
  };

  const handleMouseLeave = () => {
    setSelectedIndex(null);
  };

  const handlePanTo = (item) => {
    setPanTo({
      lat: item.coordinates.latitude,
      lng: item.coordinates.longitude,
    });
  };

  useEffect(() => {
    const element = document.getElementById(selectedMarker);
    element?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedMarker]);

  return (
    <div className={`${styles.container} ${isListView && styles.listOpen}`}>
      {!businessList?.length && (
        <p className={styles.noResults}>
          Your favorite restaurants have not yet been selected.
        </p>
      )}
      <div className={styles.listItemWrapper}>
        {businessList?.map((item) => {
          const number = item.index + 1;
          return (
            <div
              key={item.id}
              id={item.index}
              onMouseEnter={() => handleMouseEnter(number)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handlePanTo(item)}
              className={styles.listItem}
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt="Restaurant image"
                  className={styles.image}
                />
              )}
              {!item.image_url && (
                <Image
                  src="/image/No_Image_Available.jpg"
                  alt="No image available"
                  width={150}
                  height={150}
                  className={`${styles.image} ${styles.image__noimage}`}
                />
              )}
              <div className={styles.information}>
                <h1>{`${number}. ${item.name}`}</h1>
                <div className={styles.alias}>{item.alias}</div>
                <div className={styles.star__categories}>
                  <IconContext.Provider value={{ className: styles.star }}>
                    <p className={styles.rating}>
                      <BsStarFill /> {item.rating}
                    </p>
                  </IconContext.Provider>
                  <p className={styles.categories}>{item.categories}</p>
                </div>
                <div className={styles.address__phone}>
                  <div className={styles.address}>
                    <div className={styles.address__phone__icon}>
                      <FaMapMarkerAlt className={styles.icon} />
                    </div>
                    <p className={styles.address__text}>{item.location}</p>
                  </div>
                  <div className={styles.phone}>
                    <div className={styles.address__phone__icon}>
                      <BsPhoneFill className={styles.icon} />
                    </div>
                    <p className={styles.phone__text}>{item.phone}</p>
                  </div>
                </div>
                <div className={styles.link__favorite}>
                  <IconContext.Provider value={{ className: styles.link }}>
                    <a href={item.url} target="blank" rel="noopener noreferrer">
                      Link <BiLinkExternal />
                    </a>
                  </IconContext.Provider>
                  <FavoriteButton businessListItem={item} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
