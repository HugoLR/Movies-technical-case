import { Link, Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";

import styles from "./mainLayout.module.css";

function MainLayout() {
  const location = useLocation();

  const mainLinkStyle = classNames({
    [styles["MainLayout-link"]]: true,
    [styles["MainLayout-link--active"]]: location.pathname === "/movies/home",
  });

  const secondaryLinkStyle = classNames({
    [styles["MainLayout-link"]]: true,
    [styles["MainLayout-link--active"]]: location.pathname !== "/movies/home",
  });

  return (
    <div className={styles.MainLayout}>
      <header className={styles["MainLayout-header"]}>
        <h1>
          <Link to="/movies/home" className={mainLinkStyle}>
            🏠 Home
          </Link>
        </h1>
        <nav className={styles["MainLayout-nav"]}>
          <ul>
            <li>
              <Link to="/movies/watchlist" className={secondaryLinkStyle}>
                Watchlist
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles["MainLayout-main"]}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
