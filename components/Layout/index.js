import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import AppContext from "@/context/AppContext";

const Layout = ({ children, selectedCity, setSelectedCity }) => {
  const { userState, setUserState } = useContext(AppContext);
  const [openMenu, setOpenMenu] = useState(false);
  const cities = ["Tokyo", "Yokohama", "Nagoya", "Kyoto", "Osaka"];
  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUserState(null);
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className={styles.logo}
          />
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
        <div className={styles.dropdown}>
          <button onClick={handleOpen} className={styles.dropbtn}>
            Menu
          </button>
          {openMenu && (
            <div className={styles.dropdownContent}>
              {userState && (
                <>
                  <Link href="/account" className={styles.dropdownItem}>
                    Account
                  </Link>
                  <Link href="favorites" className={styles.dropdownItem}>
                    My Restaurants
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
        <div className={styles.link}>
          <a
            href={"https://github.com/yterasaka"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className={styles.linkButton} />
          </a>
          <a
            href={"https://www.linkedin.com/in/yuki-terasaka-a5399b129/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin className={styles.linkButton} />
          </a>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
