import React from "react";
import styles from "../../styles/components/Home/Container.module.scss";
import Navbar from "../Navbar/Navbar";
function Container() {
  return (
    <div className={styles.container}>
      <Navbar />
    </div>
  );
}

export default Container;
