import { useContext, MouseEvent, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "~atoms/Loader";
import ArrowLeft from "~atoms/ArrowLeft";
import Button from "~atoms/Button";
import Seo from "~molecules/Seo";
import styles from "./movieDetail.module.css";
import toastSuccess from "~utils/toast";
import { IMovie } from "~hooks/useFetchMovies";
import useWindowSize from "~hooks/useWindowSize";
import useFetchMovie, { IMovieDeatil } from "~hooks/useFetchMovie";
import { secureBaseUrl, mobileSize, desktopSize } from "~utils/images";
import desktop from "~utils/breakpoints";
import { IWatchListContext, WatchListContext } from "~context/watchListContext";

function MovieDetailLoading() {
  return (
    <div className={styles["MovieDetail-loaderContainer"]}>
      <Loader />
    </div>
  );
}

function MovieDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { movie, error, loading } = useFetchMovie(params.id || "");
  const { saveMovie, watchList, updateWatchList } = useContext(WatchListContext) as IWatchListContext;
  const { width } = useWindowSize();
  const showMovie = movie && !error && !loading;
  const isMovieInWatchList = useMemo(
    () => watchList.some((watchListMovie) => watchListMovie.id === movie?.id),
    [movie?.id, watchList]
  );
  const imageUrl = useMemo(() => {
    const isDesktop = width && width > desktop;
    const imageSize = isDesktop ? desktopSize : mobileSize;
    const imagePath = isDesktop ? movie?.backdrop_path : movie?.poster_path;

    if (movie) {
      return `${secureBaseUrl}${imageSize}${imagePath}`;
    }

    return "";
  }, [width, movie]);

  const buttonText = isMovieInWatchList ? "Eliminar de watchlist" : "Agregar a watchlist";
  const buttonColor = isMovieInWatchList ? "danger" : "primary";

  const handleClick = () => navigate(-1);

  const getMovieGenresText = (_movie: IMovieDeatil) => {
    const moviesGenres = _movie.genres.map((genre) => genre.name);
    return moviesGenres.join(", ");
  };

  const handleAddToWatchList = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (movie) {
      saveMovie(movie as unknown as IMovie);
      toast.success("Pel??cula agregada al watchlist", toastSuccess);
    }
  };

  const handleRemoveToWatchList = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (movie) {
      updateWatchList(movie?.id);
      toast.success("Pel??cula eliminada del watchlist", toastSuccess);
    }
  };

  return (
    <>
      {showMovie && <Seo title={`${movie?.title}` || "Detalle de pel??cula"} />}
      <div className={styles.MovieDetail}>
        {loading && <MovieDetailLoading />}
        {showMovie && (
          <>
            <header className={styles["MovieDetail-header"]}>
              <span onClick={handleClick} role="button" aria-hidden="true">
                <ArrowLeft />
              </span>
              <Button
                placeholder={buttonText}
                color={buttonColor}
                onClick={isMovieInWatchList ? handleRemoveToWatchList : handleAddToWatchList}
              />
            </header>
            <main>
              <figure>
                <img
                  src={imageUrl}
                  alt={`Poster de la pelicula ${movie.title}`}
                  className={styles["MovieDetail-img"]}
                />
              </figure>
              <h1 className={styles["MovieDetail-title"]}>{movie.title}</h1>
              <p className={styles["MovieDetail-releaseDate"]}>Fecha de estreno: {movie.release_date}</p>
              <p className={styles["MovieDetail-releaseDate"]}>G??neros: {getMovieGenresText(movie)}</p>
              <p className={styles["MovieDetail-overview"]}>{movie.overview}</p>
              <section className={styles["MovieDetail-dataSection"]}>
                <div>
                  <span className={styles["MovieDetail-voteAverage"]}>{movie.vote_average}</span>
                </div>
                <div>
                  <p>Reviews</p>
                  <p>{movie.vote_count}</p>
                </div>
                <div>
                  <p>Popularidad</p>
                  <p>{movie.popularity}</p>
                </div>
              </section>
            </main>
          </>
        )}
      </div>
    </>
  );
}

export default MovieDetail;
