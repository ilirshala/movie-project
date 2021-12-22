import React from "react";
import styles from "../../styles/components/MovieCard/MovieCard.module.scss";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function MovieCard({
  company,
  title,
  description,
  producer,
  director,
  numOfEpisodes,
}) {
  return (
    <div className={styles.movieCard}>
      <div className={styles.movieCard__header}>
        <h3>{company}</h3>
        <h2>{title}</h2>
      </div>
      <div className={styles.movieCard__description}>
        <p>{description}</p>
      </div>
      <div className={styles.movieCard__creators}>
        <div>
          <h3>Producer:</h3>
          <h3>{producer}</h3>
        </div>
        <div>
          <h3>Director:</h3>
          <h3>{director}</h3>
        </div>
      </div>
      <div className={styles.movieCard__episodes}>
        <h3>Episodes: {numOfEpisodes}</h3>
        <FavoriteBorderIcon />
      </div>
    </div>
  );
}

export default MovieCard;
