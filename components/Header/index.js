import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Menu from "../Menu";

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
        <Menu />
      </header>
    </div>
  );
};

export default Header;
