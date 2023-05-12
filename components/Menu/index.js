import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "@/context/AppContext";
import Cookies from "js-cookie";
import styles from "./index.module.css";

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const { userState, setUserState } = useContext(AppContext);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleIsHome = () => {
    setIsHome(false);
  };

  useEffect(() => {
    if (router.pathname === "/") {
      handleIsHome();
    }
  });

  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUserState(null);
    window.location.reload();
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // クリーンアップ関数
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={handleOpen} className={styles.dropbtn}>
        Menu
      </button>
      {openMenu && (
        <div className={styles.dropdownContent}>
          {userState && (
            <>
              {isHome && (
                <Link href="/" className={styles.dropdownItem}>
                  Home
                </Link>
              )}
              <Link href="/user" className={styles.dropdownItem}>
                Account
              </Link>
              <Link href="/about" className={styles.dropdownItem}>
                About
              </Link>
              <button className={styles.dropdownItem} onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
          {!userState && (
            <>
              {isHome && (
                <Link href="/" className={styles.dropdownItem}>
                  Home
                </Link>
              )}
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
    </div>
  );
};

export default Menu;
