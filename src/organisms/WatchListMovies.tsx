import { useContext, useMemo } from "react";

import { IWatchListContext, WatchListContext } from "~context/watchListContext";
import MovieCard from "~molecules/MovieCard";
import styles from "./watchListMovies.module.css";

export default function WatchListMovies() {
  const { watchList } = useContext(WatchListContext) as IWatchListContext;

  const movies = useMemo(
    () => watchList.sort((firstMovie, secondeMovie) => secondeMovie.vote_average - firstMovie.vote_average),
    [watchList]
  );

  if (movies.length === 0) {
    return <h2 className={styles["WatchListMovies-heading"]}>Aún no cuentas con películas agregadas a tu watchlist</h2>;
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </>
  );
}
