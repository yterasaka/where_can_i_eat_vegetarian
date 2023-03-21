import "@/styles/globals.css";
import AppContext from "@/context/AppContext";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function App({ Component, pageProps }) {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
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
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ userState, setUserState }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
