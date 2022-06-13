import { useRef, useCallback, useEffect } from "react";
import debounce from "just-debounce-it";

import MovieCard from "~molecules/MovieCard";
import Loader from "~atoms/Loader";
import useFetchMovies from "~hooks/useFetchMovies";
import useNearScreen from "~hooks/useNearScreen";
import styles from "./movies.module.css";

function MoviesLoading() {
  return (
    <div className={styles["Movies-loaderContainer"]}>
      <Loader />
    </div>
  );
}

function Movies() {
  const { loading, movies, setPage, paginationLoading } = useFetchMovies();
  const showMovies = movies && Array.isArray(movies) && !loading;
  const externalRef = useRef(null);
  const { isNearScreen } = useNearScreen({ externalRef: loading ? null : externalRef, once: false });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleNextPage = useCallback(
    debounce(
      () =>
        setPage((prevPage) => {
          const newPage = prevPage + 1;
          return newPage;
        }),
      300
    ),
    [setPage]
  );

  useEffect(() => {
    if (isNearScreen) {
      debounceHandleNextPage();
    }
  }, [debounceHandleNextPage, isNearScreen]);

  if (loading) {
    return <MoviesLoading />;
  }

  return (
    <>
      {showMovies && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      <div id="viewfinder" ref={externalRef} />
      {paginationLoading && <MoviesLoading />}
    </>
  );
}

export default Movies;
