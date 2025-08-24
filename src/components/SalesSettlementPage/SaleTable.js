import React from "react";
import styles from "./SaleTable.module.css";

import PageHeader from "./PageHeader";
import MainTable from "./MainTable";

import excel from "../../assets/excel.svg";


function SaleTable({ data }) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>

        <div className={styles.pageContainer}>
          <PageHeader 
            image="note"
            title="판매 정산"
            content="판매한 상품 내역을 한눈에 보고, 엑셀파일로 쉽게 관리하세요."/>
          <button className={styles.excelButton}>
            <img src={excel} alt="excel"/>
            <span>엑셀 다운로드</span>
          </button>
          <MainTable data={data} />
        </div>
      </div>
    </>
  );
}

export default SaleTable;