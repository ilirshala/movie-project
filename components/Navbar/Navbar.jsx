import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/components/Navbar/Navbar.module.scss";

function Navbar({ searchMovies }) {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, []);
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <h1>Movie Site</h1>
      </div>
      <div className={styles.navbar__right}>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
        </ul>
        <input
          type="text"
          placeholder="Search..."
          onInput={(e) => searchMovies(e.target.value)}
          style={{ display: showSearch ? "none" : "" }}
        />
      </div>
    </div>
  );
}

export default Navbar;
