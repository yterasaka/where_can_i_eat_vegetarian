import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const Layout = ({ children, selectedCity, setSelectedCity }) => {
  const cities = ["Tokyo", "Yokohama", "Nagoya", "Kyoto", "Osaka"];
  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className={styles.logo}
          />
          <p className={styles.title}>Where Can I Eat Vegetarian in</p>
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
          <p>?</p>
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
