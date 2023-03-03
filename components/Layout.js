import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const Layout = ({ children }) => {
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
          <select className={styles.selecter} name="city">
            <option value="Tokyo">Tokyo</option>
            <option value="Yokohama">Yokohama</option>
            <option value="Nagoya">Nagoya</option>
            <option value="Kyoto">Kyoto</option>
            <option value="Osaka">Osaka</option>
          </select>
          <p>?</p>
        </div>
        <div className={styles.link}>
          <Link href={"/"}>
            <FiGithub className={styles.linkButton} />
          </Link>
          <Link href={"/"}>
            <FiLinkedin className={styles.linkButton} />
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
