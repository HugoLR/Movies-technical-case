import Seo from "~molecules/Seo";
import Movies from "~organisms/Movies";
import styles from "./home.module.css";

function Home() {
  return (
    <>
      <Seo title="Home" />
      <div className={styles.Home}>
        <header>
          <h1 className={styles["Home-title"]}>🏠 Home</h1>
        </header>
        <main className={styles["Home-main"]}>
          <Movies />
        </main>
      </div>
    </>
  );
}

export default Home;
