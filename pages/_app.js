import "@/styles/globals.css";
import AppContext from "@/context/AppContext";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getFavorite, updateFavorite } from "../lib/favorites";

export default function App({ Component, pageProps }) {
  const [userState, setUserState] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesId, setFavoritesId] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      // TODO: axiosで書き直す
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          Cookies.remove("token");
          setUserState(null);
          return null;
        }
        const user = await res.json();
        setUserState(user);
        const userFavorite = await getFavorite(user.id);
        setFavorites(userFavorite.data.favorite.restaurants);
        setFavoritesId(userFavorite.data.favorite.id);
      });
    }
  }, []);

  useEffect(() => {
    if (favoritesId) {
      updateFavorite(favoritesId, favorites);
    }
  }, [favoritesId, favorites]);

  return (
    <AppContext.Provider
      value={{
        userState,
        setUserState,
        favorites,
        setFavorites,
        showFavorites,
        setShowFavorites,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
