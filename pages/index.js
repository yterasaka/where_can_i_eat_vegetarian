import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Map from "../components/Map";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Tokyo");

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
        <Map selectedCity={selectedCity} />
      </main>
    </Layout>
  );
}
