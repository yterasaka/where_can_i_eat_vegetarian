import styles from "./index.module.css";
import Header from "../../components/Header";

const About = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>
          About &quot;Where Can I Eat Vegetarian?&quot;
        </h1>
        <p className={styles.paragraph}>
          &quot;Where Can I Eat Vegetarian?&quot; is a web application that
          displays vegetarian restaurants across Japan on a map. It is currently
          available in five cities: Tokyo, Yokohama, Nagoya, Kyoto and Osaka.
          With this application, vegetarians travelling in Japan can easily find
          restaurants where they can eat in peace.
        </p>
        <h2 className={styles.listTitle}>How to use</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            1. Select the city you wish to view from the drop-down box on the
            menu bar.
          </li>
          <li className={styles.listItem}>
            2. Click the menu button at the right end of the menu bar to open
            the menu.
          </li>
          <li className={styles.listItem}>
            3. Click a marker on the map to view restaurant information.
          </li>
          <li className={styles.listItem}>
            4. If you are logged in, you can add a restaurant as a Favourite by
            clicking the Favourites icon in the bottom right-hand corner of the
            restaurant information window.
          </li>
          <li className={styles.listItem}>
            5. If you are signed in, a Favourites icon will appear to the right
            of the Menu button. Clicking this button will only show you the
            restaurants you have added to your Favourites.
          </li>
        </ul>
        <p>
          If you have any feedback on the app or features you would like to see
          added, you can easily submit it using the{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSew93nbLG10EpF1knb9rG6y9130uyoK2kof5oTtqNlzV1dsdA/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            contact form
          </a>
          . Your feedback is a valuable resource for me as a developer.
        </p>
      </div>
    </div>
  );
};

export default About;
