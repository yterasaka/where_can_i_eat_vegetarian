import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Map from "../components/Map";
import List from "../components/List";
import AppContext from "@/context/AppContext";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Tokyo");
  const [businessData, setBusinessData] = useState(null);
  const [isListView, setIsListView] = useState(false);
  const { favorites, showFavorites } = useContext(AppContext);

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

  const showedRestaurants = () => {
    if (showFavorites) {
      return favorites;
    } else {
      return JSON.parse(businessData);
    }
  };

  // オプショナルチェイニング演算子 ?. を使用することで、data が null の場合には処理がスキップされ、エラーが発生しなくなる
  const businessList = showedRestaurants()?.map((business) => {
    const businessInfo = {
      id: business.id,
      name: business.name,
      alias: business.alias,
      rating: business.rating,
      price: business.price,
      categories: showFavorites
        ? business.categories
        : business.categories.map((category) => category.title).join(", "),
      coordinates: {
        latitude: business.coordinates.latitude,
        longitude: business.coordinates.longitude,
      },
      location: showFavorites
        ? business.location
        : business.location.display_address.join(", "),
      phone: business.phone,
      url: business.url,
      image_url: business.image_url,
    };
    return businessInfo;
  });

  return (
    <Layout
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      isListView={isListView}
      setIsListView={setIsListView}
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
        <Map
          selectedCity={selectedCity}
          businessList={businessList}
          isListView={isListView}
          setIsListView={setIsListView}
        />
        <List isListView={isListView} businessList={businessList} />
      </main>
    </Layout>
  );
}
