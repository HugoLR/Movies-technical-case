import { secureBaseUrl, mobileSize } from "~utils/images";
import { IMovie } from "~hooks/useFetchMovies";
import styles from "./movieCard.module.css";

interface IMovieCardProps {
  movie: IMovie;
}

function MovieCard({ movie }: IMovieCardProps) {
  // const reference = useRef<HTMLParagraphElement>(null);
  // if (reference.current) {
  //   console.log("xxx", { loading, data, reference, height: reference.current.scrollHeight });
  // }
  return (
    <div className={styles.MovieCard}>
      <figure className={styles["MovieCard-imageContainer"]}>
        <img
          src={`${secureBaseUrl}${mobileSize}${movie.poster_path}`}
          alt={`Poster de la pelicula ${movie.title}`}
          loading="lazy"
        />
      </figure>
      <div className={styles["MovieCard-informationContainer"]}>
        <h2 className={styles["MovieCard-title"]}>{movie.title}</h2>
        <p className={styles["MovieCard-releaseDate"]}>Fecha de estreno: {movie.release_date}</p>
        <p className={styles["MovieCard-overview"]}>{movie.overview}</p>
        <span className={styles["MovieCard-voteAverage"]}>{movie.vote_average}</span>
        <div className={styles["MovieCard-buttonContainer"]}>
          <button type="button" className={styles["MovieCard-button"]}>
            Agregar a watchlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
