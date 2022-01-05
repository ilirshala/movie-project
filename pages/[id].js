import styles from "../styles/components/MovieDetails/MovieDetail.module.scss";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

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
  const [save, setSave] = useState(false);
  const [actorArray, setActorArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actorId, setActorId] = useState("");
  const [getArrayFrom, setGetArrayFrom] = useState();
  const [favouritesArray, setFavouritesArray] = useState([]);
  // const thisMovie = movie.find((m) => m.uid === movie.result.uid);

  const requestCharacter = async (link) => {
    const response = await fetch(link);
    const data = await response.json();

    return data;
  };

  useEffect(async () => {
    setLoading(true);
    const [firstelememt] = movie.result.properties.characters;
    for (let actor of [firstelememt]) {
      const actorData = await requestCharacter(actor);
      if (actorData.message === "ok") {
        const { result } = actorData;
        actorArray.push(result);
      }
    }
    setLoading(false);
    console.log(movie.result.uid);
  }, []);

  useEffect(() => {
    let arrayFrom = localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites"))
      : [];
    setFavouritesArray(arrayFrom);
    console.log(
      "Favourites Array from local storage to use state",
      favouritesArray
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favouritesArray));
    if (favouritesArray.indexOf(movie.result.uid) > -1) {
      setSave(true);
    } else {
      setSave(false);
    }
  }, [favouritesArray]);

  const saveMovie = () => {
    setFavouritesArray((favouritesArray) => [
      ...favouritesArray,
      movie.result.uid,
    ]);
    setSave(true);
    console.log(favouritesArray, "With add Item");
    console.log("Movie UID", movie.result.uid);
  };

  const deleteMovie = () => {
    let index = movie.result.uid;
    if (index > -1) {
      let newMovieArray = favouritesArray.filter((m) => m !== index);
      setFavouritesArray(newMovieArray);
    }
    setSave(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.movieDetails}>
        <div className={styles.movieDetails__container}>
          <h4 className={styles.movieDetails__container_episodes}>
            Episodes No: {movie.result.properties.episode_id}
            <p onClick={save ? deleteMovie : saveMovie}>
              {save === false ? (
                <FaRegHeart size={50} />
              ) : (
                <FaHeart size={50} />
              )}
            </p>
          </h4>
          <div className={styles.movieDetails__container_flexPart}>
            <div className={styles.movieDetails__container_flexPart_left}>
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
            </div>
            <div className={styles.movieDetails__container_flexPart_right}>
              {" "}
              <h2>List of Characters</h2>
              {loading ? (
                <Loading />
              ) : (
                <ul>
                  {actorArray.map((actor, index) => (
                    <li
                      onMouseOver={() => setActorId(actor._id)}
                      onMouseLeave={() => setActorId(!actor._id)}
                      key={index}
                    >
                      {actor.properties.name}
                      <ul
                        style={{
                          display: actorId === actor._id ? "block" : "none",
                        }}
                      >
                        <li>Height: {actor.properties.height}</li>
                        <li>Mass: {actor.properties.mass}</li>
                        <li>Hair Color: {actor.properties.hair_color}</li>
                        <li>Skin Color: {actor.properties.skin_color}</li>
                        <li>Birth Year: {actor.properties.eye_color}</li>
                        <li>Gender: {actor.properties.gender}</li>
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
