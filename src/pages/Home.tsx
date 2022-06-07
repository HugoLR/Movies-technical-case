import Seo from "~molecules/Seo";
import MovieCard from "~molecules/MovieCard";
import useFetchMovies from "~hooks/useFetchMovies";
import styles from "./home.module.css";

function Home() {
  const { loading, data } = useFetchMovies();
  const showMovies = data && Array.isArray(data.results);

  if (loading) {
    return <p>cargando..</p>;
  }

  return (
    <>
      <Seo title="Home" />
      <div className={styles.Home}>
        <header>
          <h1 className={styles["Home-title"]}>🏠 Home</h1>
        </header>
        <main className={styles["Home-main"]}>
          {showMovies && data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </main>
      </div>
    </>
  );
}

export default Home;
