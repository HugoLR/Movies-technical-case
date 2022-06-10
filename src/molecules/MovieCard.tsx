import { useNavigate } from "react-router-dom";

import { secureBaseUrl, mobileSize } from "~utils/images";
import { IMovie } from "~hooks/useFetchMovies";
import Button from "~atoms/Button";
import styles from "./movieCard.module.css";

interface IMovieCardProps {
  movie: IMovie;
}

function MovieCard({ movie }: IMovieCardProps) {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/movies/detail/${movie.id}`);

  return (
    <div className={styles.MovieCard} onClick={handleClick} aria-hidden="true">
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
          <Button placeholder="Agregar a watchlist" />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
