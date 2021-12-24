import styles from "../styles/components/MovieDetails/MovieDetail.module.scss";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

export const getStaticPaths = async () => {
  const response = await fetch("https://www.swapi.tech/api/films");
  const data = await response.json();

  const paths = data.result.map((movie) => {
    return {
      params: { id: movie.uid.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const response = await fetch("https://www.swapi.tech/api/films/" + id);
  const data = await response.json();

  console.log(data.result.properties.characters);

  return {
    props: { movie: data },
  };
};

const Details = ({ movie }) => {
  const [favourite, setFavourite] = useState(false);
  console.log(movie.result.properties.characters[1]);
  return (
    <div className={styles.movieDetails}>
      <div className={styles.movieDetails__container}>
        <h4 className={styles.movieDetails__container_episodes}>
          Episodes No: {movie.result.properties.episode_id}
          <p onClick={() => setFavourite(!favourite)}>
            {favourite === false ? (
              <FaRegHeart size={50} />
            ) : (
              <FaHeart size={50} />
            )}
          </p>
        </h4>
        <h1>{movie.result.properties.title}</h1>
        <p>{movie.result.properties.opening_crawl}</p>
        <div className={styles.movieDetails__container_directors}>
          <h4>
            Director: <span>{movie.result.properties.director}</span>
          </h4>
        </div>
        <div className={styles.movieDetails__container_directors}>
          <h4>
            Producers: <span>{movie.result.properties.producer}</span>
          </h4>
        </div>
        <h2>List of Characters</h2>
        <ul>
          {/* {movie.result.properties.characters.map((actor) => (
            <li>{actor}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default Details;
//<h1>Hello World</h1>
//<h1> {movie.result.properties.opening_crawl}</h1>
