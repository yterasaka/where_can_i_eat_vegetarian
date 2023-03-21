import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useState } from "react";

const Layout = ({ children, selectedCity, setSelectedCity }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const cities = ["Tokyo", "Yokohama", "Nagoya", "Kyoto", "Osaka"];
  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleOpen = () => {
    setOpenMenu(!openMenu);
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
              <Link href="/account" className={styles.dropdownItem}>
                About Me
              </Link>
              {/* <Link href="favorites" className={styles.dropdownItem}>
                My Restaurants
              </Link> */}
              <Link href="/login" className={styles.dropdownItem}>
                Log in
              </Link>
              <button className={styles.dropdownItem}>Log out</button>
            </div>
          )}
        </div>
        <div className={styles.link}>
          <Link href={"https://github.com/yterasaka"}>
            <FiGithub className={styles.linkButton} />
          </Link>
          <Link href={"https://www.linkedin.com/in/yuki-terasaka-a5399b129/"}>
            <FiLinkedin className={styles.linkButton} />
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
