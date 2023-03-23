import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Map from "../components/Map";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Tokyo");
  const [businessData, setBusinessData] = useState(null); // ここに入っているのはJSON文字列
  const [showFavorites, setShowFavorites] = useState(false); // お気に入りにオンオフの状態
  const [favorites, setFavorites] = useState(null); // お気に入りのデータを格納　ここのデータが更新されると、バックエンドのデータも更新するようにする

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
      showFavorites={showFavorites}
      setShowFavorites={setShowFavorites}
      setFavorites={setFavorites}
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
