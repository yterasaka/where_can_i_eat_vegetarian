import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import styles from "./index.module.css";
import { useContext } from "react";
import AppContext from "@/context/AppContext";

const FavoriteButton = ({ businessListItem }) => {
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
    const isCheckFavorite = favorites.some((item) => item.id === data.id);
    return isCheckFavorite;
  };

  return (
    <>
      {userState && (
        <button
          className={styles.favoritesBtn}
          onClick={() => handleToggleFavorite(businessListItem)}
        >
          {/* TODO: できれば三項演算子で関数は使わない */}
          {handleCheckFavorite(businessListItem) ? (
            <BsBookmarkHeartFill className={styles.favoritesBtnIconOn} />
          ) : (
            <BsBookmarkHeart className={styles.favoritesBtnIconOff} />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
