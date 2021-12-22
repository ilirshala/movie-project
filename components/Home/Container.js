import React, { useEffect } from "react";
import styles from "../../styles/components/Home/Container.module.scss";
import Navbar from "../Navbar/Navbar";
import { fetchMovies } from "../../store/actions/fetchMovies.actions";
import { useSelector, useDispatch } from "react-redux";
import api from "../../pages/api/api";
import MovieCard from "../MovieCard/MovieCard";

function Container({ movies }) {
  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.container__movies}>
        {movies?.result.map((movie) => (
          <MovieCard
            key={movie.uid}
            company={movie.description}
            title={movie.properties.title}
            // description={movie.properties.opening_crawl}
            producer={movie.properties.producer}
            director={movie.properties.director}
            numOfEpisodes={movie.properties.episode_id}
          />
        ))}
      </div>
    </div>
  );
}

export default Container;
