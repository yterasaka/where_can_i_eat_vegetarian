import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className={styles.logo}
          />
        </Link>

        {/* <p className={styles.titleLeft}>Where Can I Eat Vegetarian in</p>
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
                  <Link href="/user" className={styles.dropdownItem}>
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
        </div> */}
      </header>
    </div>
  );
};

export default Header;
