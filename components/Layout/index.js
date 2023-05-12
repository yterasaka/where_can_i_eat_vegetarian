// import Link from "next/link";
import styles from "./index.module.css";
import { RiFileListFill } from "react-icons/ri";
import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
// import Cookies from "js-cookie";
import AppContext from "@/context/AppContext";
import Menu from "../Menu";

const Layout = ({
  children,
  selectedCity,
  setSelectedCity,
  isListView,
  setIsListView,
}) => {
  const {
    userState,
    // setUserState,
    showFavorites,
    setShowFavorites,
    selected,
    setSelected,
  } = useContext(AppContext);
  // const [openMenu, setOpenMenu] = useState(false);
  const cities = ["Tokyo", "Yokohama", "Nagoya", "Kyoto", "Osaka"];
  // const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // const handleOpen = () => {
  //   setOpenMenu(!openMenu);
  // };

  // const handleLogout = () => {
  //   Cookies.remove("token");
  //   setUserState(null);
  //   window.location.reload();
  // };

  // 地図のお気に入り表示を切り替える
  const handleToggleFavorite = () => {
    setShowFavorites(!showFavorites);
  };

  // ドロップダウンメニュー枠外をクリックしたときにメニューを閉じる
  // const handleClickOutside = (e) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //     setOpenMenu(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside); // クリーンアップ関数
  //   };
  // }, []);

  // 地図表示とリスト表示の切り替え
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
        {/* <div className={styles.dropdown} ref={dropdownRef}>
          <button onClick={handleOpen} className={styles.dropbtn}>
            Menu
          </button>
          {openMenu && (
            <div className={styles.dropdownContent}>
              {userState && (
                <>
                  <Link href="/user" className={styles.dropdownItem}>
                    Account
                  </Link>
                  <Link href="/about" className={styles.dropdownItem}>
                    About
                  </Link>
                  <button
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              )}
              {!userState && (
                <>
                  <Link href="/about" className={styles.dropdownItem}>
                    About
                  </Link>
                  <Link href="/login" className={styles.dropdownItem}>
                    Log in
                  </Link>
                  <Link href="/register" className={styles.dropdownItem}>
                    Sign in
                  </Link>
                </>
              )}
            </div>
          )}
        </div> */}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
