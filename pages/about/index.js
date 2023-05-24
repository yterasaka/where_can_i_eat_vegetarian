import styles from "./index.module.css";
import Header from "../../components/Header";
import { BsBookmarkHeart } from "react-icons/bs";
import { RiFileListFill } from "react-icons/ri";

const About = () => {
  return (
    <div className={styles.body}>
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
        <h2 className={styles.listTitle}>How to use the Application</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            1. Begin by selecting your desired city from the drop-down box on
            the menu bar.
          </li>
          <li className={styles.listItem}>
            2. To access other features, click the menu button on the far right
            of the menu bar. This will open a drop-down menu that will allow you
            to navigate to the Login or Account page, etc.
          </li>
          <li className={styles.listItem}>
            3. For restaurant information, simply click on a marker on the map.
          </li>
          <li className={styles.listItem}>
            4. To view a list of restaurants displayed on the map, click the
            List button <RiFileListFill /> on the menu bar. <br />
            Hovering over a list item will change the color of the corresponding
            marker on the map. Clicking on a list item will reposition the map
            so that the corresponding marker appears in the center. <br />
            In addition, clicking a marker on the map will automatically scroll
            the list to bring the corresponding item into view.
          </li>
          <li className={styles.listItem}>
            5. If you are logged in, you can add a restaurant to your Favorites
            by clicking the Favorites button <BsBookmarkHeart /> in the lower
            right hand corner of the restaurant information window.
          </li>
          <li className={styles.listItem}>
            6. If you are logged in, a Favorites button <BsBookmarkHeart /> will
            appear to the right of the Menu button. Clicking this button will
            filter the view to show only the restaurants you have added to your
            Favorites.
          </li>
        </ul>

        <h2 className={styles.listTitle}>Feedback & Source code</h2>
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
        <p>
          Moreover, the source code for the app is available on{" "}
          <a
            href="https://github.com/yterasaka/where_can_i_eat_vegetarian"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          , should you want to look into it more deeply or contribute to its
          development. I appreciate your time and input in helping to improve
          this application.
        </p>
      </div>
    </div>
  );
};

export default About;
