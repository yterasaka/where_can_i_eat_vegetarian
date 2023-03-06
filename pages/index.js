import Head from "next/head";
import Layout from "../components/Layout";
import Map from "../components/Map";

// import { useState, useEffect } from "react";

export default function Home() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api/yelp")
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  // const dataJson = JSON.parse(data);
  // console.log(dataJson.jsonBody.businesses);

  return (
    <Layout>
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
        <Map />
      </main>
    </Layout>
  );
}
