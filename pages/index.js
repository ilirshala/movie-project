import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/components/Home/Container.module.scss";

export const getStaticProps = async () => {
  let data = [];
  try {
    const res = await fetch("https://www.swapi.tech/api/films");
    data = await res.json();
  } catch (err) {
    console.log(err);
  }

  return {
    props: { movies: data },
  };
};

export default function Home({ movies }) {
  const [favourites, setFavourites] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    let ifLocalExsi = localStorage.getItem("favourites") ? true : false;

    if (!ifLocalExsi) {
      localStorage.setItem("favourites", JSON.stringify([]));
    }
    let arrayFrom = localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites"))
      : [];
    console.log("Array from local storage", arrayFrom);
    setFavourites((arr) => [...arr, ...arrayFrom]);

    for (const favourite of favourites) {
      let findMovie = films.find((movie) => movie.uid === favourite);

      if (findMovie) {
        setFilms((films) => [...films, findMovie]);
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.container__movies}>
        <ul>
          {favourites?.map((movie, index) => {
            return (
              <Link href={"/" + movie.uid} key={index}>
                <li>{movie}</li>
              </Link>
            );
          })}
        </ul>
        <ul>
          {movies?.result?.map((movie, index) => (
            <Link href={"/" + movie.uid} key={index}>
              <li className={styles.movieCard} key={movie.uid}>
                <div className={styles.movieCard__header}>
                  <h3>{movie.description}</h3>
                  <h2>{movie.properties.title}</h2>
                </div>
                <div className={styles.movieCard__episodes}>
                  <h3>Episodes: {movie.properties.episode_id}</h3>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
