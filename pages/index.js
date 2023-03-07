import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Map from "../components/Map";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Tokyo");
  const [data, setData] = useState(null);

  useEffect(() => {
    const postData = async () => {
      await fetch("api/yelp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedCity }),
      })
        .then((response) => response.json())
        .then((data) => setData(data));
    };
    postData();
  }, [selectedCity]);

  const dataJson = JSON.parse(data); // JSONからJSのオブジェクトに変換
  // console.log(dataJson.jsonBody.businesses);

  return (
    <Layout selectedCity={selectedCity} setSelectedCity={setSelectedCity}>
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
        <Map selectedCity={selectedCity} data={data} />
      </main>
    </Layout>
  );
}
