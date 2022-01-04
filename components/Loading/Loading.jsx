import React from "react";
import styles from "../../styles/components/Loading/Loading.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <p>Loading...</p>
      <div className={styles.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
