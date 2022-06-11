import { useContext, MouseEvent, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { secureBaseUrl, mobileSize } from "~utils/images";
import { IMovie } from "~hooks/useFetchMovies";
import { IWatchListContext, WatchListContext } from "~context/watchListContext";
import Button from "~atoms/Button";
import styles from "./movieCard.module.css";
import toastSuccess from "~utils/toast";

interface IMovieCardProps {
  movie: IMovie;
}

function MovieCard({ movie }: IMovieCardProps) {
  const navigate = useNavigate();
  const { saveMovie, watchList, updateWatchList } = useContext(WatchListContext) as IWatchListContext;
  const isMovieInWatchList = useMemo(
    () => watchList.some((watchListMovie) => watchListMovie.id === movie.id),
    [movie.id, watchList]
  );
  const buttonText = isMovieInWatchList ? "Eliminar de watchlist" : "Agregar a watchlist";
  const buttonColor = isMovieInWatchList ? "danger" : "primary";

  useEffect(() => () => toast.remove(), []);

  const handleClick = () => navigate(`/movies/detail/${movie.id}`);

  const handleAddToWatchList = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    saveMovie(movie);
    toast.success("Película agregada al watchlist", toastSuccess);
  };

  const handleRemoveToWatchList = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    updateWatchList(movie.id);
    toast.success("Película eliminada del watchlist", toastSuccess);
  };

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
          <Button
            placeholder={buttonText}
            color={buttonColor}
            onClick={isMovieInWatchList ? handleRemoveToWatchList : handleAddToWatchList}
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
