import React from "react";
import styles from "../../styles/components/MovieCard/MovieCard.module.scss";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Link from "next/link";

function MovieCard({ company, title, movieId, numOfEpisodes }) {
  return (
    <div className={styles.movieCard}>
      <div className={styles.movieCard__header}>
        <h3>{company}</h3>
        <h2>{title}</h2>
      </div>

      <div className={styles.movieCard__episodes}>
        <h3>Episodes: {numOfEpisodes}</h3>
        <FavoriteBorderIcon />
      </div>
      <div className={styles.movieCard__buttom}>
        <Link href={"/" + movieId}>
          <button>Movie details</button>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
