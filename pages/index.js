import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HomeScreen from "./HomeScreen/HomeScreen";

export const getStaticProps = async () => {
  const res = await fetch("https://www.swapi.tech/api/films");
  const data = await res.json();

  return {
    props: { movies: data },
  };
};

export default function Home({ movies }) {
  console.log(movies);
  return <HomeScreen movies={movies} />;
}
