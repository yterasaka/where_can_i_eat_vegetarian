import Image from "next/image";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
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
          <option value="Kyoto">Kyoto</option>
          <option value="Osaka">Osaka</option>
        </select>
        <p>?</p>
      </header>
      <main>{children}</main>
      {/* <footer className={styles.footer}>
        <p>GitHub</p>
      </footer> */}
    </div>
  );
};

export default Layout;
