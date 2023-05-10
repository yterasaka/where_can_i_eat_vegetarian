/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "./index.module.css";
import { IconContext } from "react-icons";
import { BiLinkExternal } from "react-icons/bi";
import {
  BsStarFill,
  BsFillHouseHeartFill,
  BsPhoneFill,
  BsBookmarkHeartFill,
  BsBookmarkHeart,
} from "react-icons/bs";

const List = ({ isListView, businessList }) => {
  return (
    <div className={`${styles.container} ${isListView && styles.listOpen}`}>
      <div className={styles.listItemWrapper}>
        {businessList?.map((item, index) => {
          const number = index + 1;
          return (
            <div key={item.id} className={styles.listItem}>
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt="Restaurant image"
                  className={styles.image}
                />
              )}
              {!item.image_url && (
                <Image
                  src="/image/No_Image_Available.jpg"
                  alt="No image available"
                  width={150}
                  height={150}
                  className={`${styles.image} ${styles.image__noimage}`}
                />
              )}
              <div className={styles.information}>
                <h1>{`${number}. ${item.name}`}</h1>
                <p className={styles.alias}>{item.alias}</p>
                <div className={styles.star__categories}>
                  <IconContext.Provider value={{ className: styles.star }}>
                    <p>
                      <BsStarFill /> {item.rating}
                    </p>
                  </IconContext.Provider>
                  <p className={styles.categories}>{item.categories}</p>
                </div>
                <div className={styles.address__phone}>
                  <p className={styles.textS}>
                    <BsFillHouseHeartFill className={styles.icon} />{" "}
                    {item.location}
                  </p>
                  <p className={styles.textS}>
                    <BsPhoneFill className={styles.icon} /> {item.phone}
                  </p>
                </div>
                <IconContext.Provider value={{ className: styles.link }}>
                  <a href={item.url} target="blank" rel="noopener noreferrer">
                    Link <BiLinkExternal />
                  </a>
                </IconContext.Provider>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
