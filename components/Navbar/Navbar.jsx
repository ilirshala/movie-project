import Link from "next/link";
import React from "react";
import styles from "../../styles/components/Navbar/Navbar.module.scss";

function Navbar() {
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
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
}

export default Navbar;
