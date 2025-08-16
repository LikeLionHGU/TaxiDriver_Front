import React from "react";
import styles from "./styles/Header.module.css";


function Header() {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>

        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.button}>등록 현황</span>
        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.button}>수산물 등록</span>  
        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.button}>경매 상태</span>
        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.button}>판매 정산</span>
        </div>
      </div>
    </>
  );
}

export default Header;