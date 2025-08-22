import React from "react";
import styles from "./ConfirmReceipt.module.css";

import PageHeader from "../SalesSettlementPage/PageHeader";
import ConfirmButton from "../ConfirmReceiptPage/ConfirmButton";


function ConfirmReceipt() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>
          <PageHeader 
            image="box"
            title="수령 확인"
            content="낙찰 상품의 수령 여부를 확인하고, 상태를 처리하세요."/>
          <ConfirmButton />
        </div>
      </div>
    </>
  );
}

export default ConfirmReceipt;