import React from "react";
import styles from "./styles/SaleTable.module.css";

import PageHeader from "./SalesSettlementPage/PageHeader";
import GuideBar from "./SalesSettlementPage/GuideBar";
import MainTable from "./SalesSettlementPage/MainTable";


function SaleTable() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>

        <div className={styles.pageContainer}>
          <PageHeader />
          <GuideBar />
          <MainTable />
        </div>
      </div>
    </>
  );
}

export default SaleTable;