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
  const [favouritesFilms, setFavouritesFilms] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([...movies.result]);
  const [searchInput, setSearchInput] = useState("");

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
    console.log(movies.result);
    for (const favourite of favourites) {
      let findMovie = movies.result.find((movie) => movie.uid === favourite);
      console.log(findMovie);
      if (findMovie) {
        setFavouritesFilms((films) => [...films, findMovie]);
      }
    }
  }, []);

  const searchMovies = (movieTitle) => {
    setSearchInput(movieTitle);
    console.log(movieTitle);
    const filteredMovies = movies.result.filter((movie) => {
      return movie.properties.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    if (searchInput.length > 1) {
      setFilteredMovies(filteredMovies);
    } else {
      setFilteredMovies(movies.result);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar
        moviesApi={movies}
        setFilteredMovies={setFilteredMovies}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchMovies={searchMovies}
      />
      <div className={styles.container__movies}>
        <div
          className={styles.container__movies_favouritesMovies}
          style={{ display: favouritesFilms.length === 0 ? "none" : "flex" }}
        >
          <h1>Favourites Movies</h1>
          <ul>
            {favouritesFilms?.map((movie, index) => (
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
        <h1>Movies</h1>

        <ul>
          {filteredMovies.map((movie, index) => (
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
