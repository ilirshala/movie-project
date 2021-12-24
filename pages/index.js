import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/components/Home/Container.module.scss";

export const getStaticProps = async () => {
  const res = await fetch("https://www.swapi.tech/api/films");
  const data = await res.json();

  return {
    props: { movies: data },
  };
};

export default function Home({ movies }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.container__movies}>
        <ul>
          {movies?.result.map((movie) => (
            <Link href={"/" + movie.uid}>
              <li className={styles.movieCard}>
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
