import React from "react";
import styles from "./MainTable.module.css";


function MainTable() {

  return (
    <>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          <div className={styles.dropdown}>
            <span className={styles.dropdownText}>정산 상태</span>
            {/* 드롭다운 */}
            <div className={styles.dropdownDiv}>

            </div>

          </div>

          <div className={styles.dropdown}>
            <span className={styles.dropdownText}>기간</span>
            {/* 드롭다운 */}
            <div className={styles.dropdownDiv}>

            </div>
            
          </div>

          <div className={styles.searchButton}>
            <span>조회하기</span>
          </div>
        </div>

{/*-------------------------------------------------------------------  */}

        <div className={styles.tableTitle}>
          <span className={styles.tableTitle1}>수산물 정보</span>
          <span className={styles.tableTitle2}>날짜 정보</span>
          <span className={styles.tableTitle3}>가격 정보</span>
          <span className={styles.tableTitle4}>구매업체</span>
          <span className={styles.tableTitle5}>정산 상태</span>
        </div>

        <div className={styles.tableContent}>

        </div>

      </div>
    </>
  );
}


export default MainTable;