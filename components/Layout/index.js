import styles from "./index.module.css";
import { RiFileListFill } from "react-icons/ri";
import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import Menu from "../Menu";

const Layout = ({
  children,
  selectedCity,
  setSelectedCity,
  isListView,
  setIsListView,
}) => {
  const { userState, showFavorites, setShowFavorites, selected, setSelected } =
    useContext(AppContext);
  const cities = ["Tokyo", "Yokohama", "Nagoya", "Kyoto", "Osaka"];

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleToggleFavorite = () => {
    setShowFavorites(!showFavorites);
  };

  const handleToggleView = () => {
    setIsListView(!isListView);
    if (selected) {
      setSelected(null);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {/* 左側の要素 */}
        <div className={styles.titleContainer}>
          <p className={styles.titleLeft}>Where Can I Eat Vegetarian in</p>
          <select
            className={styles.selecter}
            value={selectedCity}
            onChange={handleChange}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <p className={styles.titleRight}>?</p>
        </div>

        {/* 右側の要素 */}
        <div className={styles.menuButtons}>
          {userState && (
            <button
              className={styles.favoritesBtn}
              onClick={handleToggleFavorite}
            >
              {showFavorites ? (
                <BsBookmarkHeartFill className={styles.favoritesBtnIconOn} />
              ) : (
                <BsBookmarkHeart className={styles.favoritesBtnIconOff} />
              )}
            </button>
          )}
          <button className={styles.listButton} onClick={handleToggleView}>
            <RiFileListFill
              className={`${styles.listButtonIcon} ${
                isListView && styles.listButtonIconActive
              }`}
            />
          </button>
        </div>
        <Menu />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
