import React from "react";
import styles from "./ConfirmReceipt.module.css";

import PageHeader from "../SalesSettlementPage/PageHeader";


function ConfirmReceipt() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>
          <PageHeader 
            image="cart"
            title="경매 상태"
            content="내가 등록한 상품의 경매 상태를 확인하세요."/>

        </div>
      </div>
    </>
  );
}

export default ConfirmReceipt;