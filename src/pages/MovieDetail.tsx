import { useParams, useNavigate } from "react-router-dom";

import Loader from "~atoms/Loader";
import ArrowLeft from "~atoms/ArrowLeft";
import Button from "~atoms/Button";
import useFetchMovie, { IMovie } from "~hooks/useFetchMovie";
import { secureBaseUrl, mobileSize } from "~utils/images";
import styles from "./movieDetail.module.css";

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
  const showMovies = movie && !error;

  const handleClick = () => navigate(-1);

  const getMovieGenresText = (_movie: IMovie) => {
    const moviesGenres = _movie.genres.map((genre) => genre.name);
    return moviesGenres.join(", ");
  };

  return (
    <div className={styles.MovieDetail}>
      {loading && <MovieDetailLoading />}
      {showMovies && (
        <>
          <header className={styles["MovieDetail-header"]}>
            <span onClick={handleClick} onKeyDown={handleClick} role="button" aria-hidden="true">
              <ArrowLeft />
            </span>
            <Button placeholder="Agregar a watchlist" />
          </header>
          <main>
            <figure>
              <img
                src={`${secureBaseUrl}${mobileSize}${movie.poster_path}`}
                alt={`Poster de la pelicula ${movie.title}`}
                className={styles["MovieDetail-img"]}
              />
            </figure>
            <h2 className={styles["MovieDetail-title"]}>{movie.title}</h2>
            <p className={styles["MovieDetail-releaseDate"]}>Fecha de estreno: {movie.release_date}</p>
            <p className={styles["MovieDetail-releaseDate"]}>Géneros: {getMovieGenresText(movie)}</p>
            <p className={styles["MovieDetail-overview"]}>{movie.overview}</p>
            <section className={styles["MovieDetail-dataSection"]}>
              <div>
                <span className={styles["MovieDetail-voteAverage"]}>{movie.vote_average}</span>
                Score
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
  );
}

export default MovieDetail;
