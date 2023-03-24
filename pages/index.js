import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Map from "../components/Map";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Tokyo");
  const [businessData, setBusinessData] = useState(null); // ここに入っているのはJSON文字列
  // const [showFavorites, setShowFavorites] = useState(false); // お気に入りにオンオフの状態
  // const { favorites, setFavorites } = useContext(AppContext);
  // console.log(favorites);

  // マウントする度にお気に入りの状態変数を更新
  // _app.jsに移動　すでにあるuseEffectに統合
  // useEffect(() => {
  //   const token = Cookies.get("token");

  //   if (token) {
  //     fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then(async (res) => {
  //       const user = await res.json();
  //       const userFavorite = await getFavorite(user.id); // この部分と
  //       // console.log(userFavorite);
  //       setFavorites(userFavorite.data.favorite.restaurants); // この部分
  //     });
  //   }
  // }, [setFavorites]);

  useEffect(() => {
    const postData = async () => {
      await fetch("api/yelp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedCity }), // 選択した都市の情報をAPIルートに渡す
      })
        .then((response) => response.json())
        .then((data) => {
          setBusinessData(data);
        });
    };
    postData();
  }, [selectedCity]);

  const dataJson = JSON.parse(businessData);

  // オプショナルチェイニング演算子 ?. を使用することで、data が null の場合には処理がスキップされ、エラーが発生しなくなる
  // dataJsonの部分を変数にして、お気に入りと入れ替わるようにする。
  const businessList = dataJson?.map((business) => {
    const businessInfo = {
      id: business.id,
      name: business.name,
      alias: business.alias,
      rating: business.rating,
      price: business.price,
      categories: business.categories
        .map((category) => category.title)
        .join(", "),
      coordinates: {
        latitude: business.coordinates.latitude,
        longitude: business.coordinates.longitude,
      },
      location: business.location.display_address.join(", "),
      phone: business.phone,
      url: business.url,
    };
    return businessInfo;
  });

  return (
    <Layout
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      // showFavorites={showFavorites}
      // setShowFavorites={setShowFavorites}
    >
      <Head>
        <title>Where Can I Eat Vegetarian?</title>
        <meta
          name="description"
          content="Find Vegetarian Restaurants in Japan"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Map selectedCity={selectedCity} businessList={businessList} />
      </main>
    </Layout>
  );
}
