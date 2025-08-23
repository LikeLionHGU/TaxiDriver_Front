import React from "react";
import styles from "../styles/AuctionDetail.module.css";

import PageHeader from "../components/SalesSettlementPage/PageHeader";


function AuctionDetail() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>
          <div className={styles.auctionItem}>
            <PageHeader 
              image="note"
              title="경매 대기"
              content=""/>
          </div>

        </div>
      </div>
    </>
  );
}

export default AuctionDetail;