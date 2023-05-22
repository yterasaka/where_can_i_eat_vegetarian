/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { IconContext } from "react-icons";
import { BiLinkExternal } from "react-icons/bi";
import {
  BsStarFill,
  BsPhoneFill,
  BsBookmarkHeartFill,
  BsBookmarkHeart,
} from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import AppContext from "@/context/AppContext";

const List = ({ isListView, businessList }) => {
  const { userState, favorites, setFavorites } = useContext(AppContext);

  const handleToggleFavorite = (data) => {
    const duplicate = favorites.findIndex((item) => item.id === data.id);
    if (duplicate === -1) {
      setFavorites([...favorites, data]);
    } else {
      setFavorites(favorites.filter((item) => item.id !== data.id));
    }
  };

  const handleCheckFavorite = (data) => {
    const checkFavorite = favorites.some((item) => item.id === data.id); // is 変数名
    return checkFavorite;
  };

  return (
    <div className={`${styles.container} ${isListView && styles.listOpen}`}>
      {!businessList?.length && (
        <p className={styles.noResults}>
          Your favorite restaurants have not yet been selected.
        </p>
      )}
      <div className={styles.listItemWrapper}>
        {businessList?.map((item, index) => {
          const number = index + 1;
          return (
            <div key={item.id} className={styles.listItem}>
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

                  {userState && (
                    <button
                      className={styles.favoritesBtn}
                      onClick={() => handleToggleFavorite(item)}
                    >
                      {/* TODO: できれば三項演算子で関数は使わない */}
                      {handleCheckFavorite(item) ? (
                        <BsBookmarkHeartFill
                          className={styles.favoritesBtnIconOn}
                        />
                      ) : (
                        <BsBookmarkHeart
                          className={styles.favoritesBtnIconOff}
                        />
                      )}
                    </button>
                  )}
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
