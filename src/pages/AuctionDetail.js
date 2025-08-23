import React from "react";
import styles from "../styles/AuctionDetail.module.css";

import PageHeader from "../components/SalesSettlementPage/PageHeader";
import AuctionItem from "../components/AuctionDetail/AuctionItem"
import AuctionPeople from "../components/AuctionDetail/AuctionPeople"


function AuctionDetail() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>
          <div className={styles.auctionLeft}>
            <PageHeader 
              image="note"
              title="경매 대기"
              content=""/>
            <AuctionItem />
          </div>
          <AuctionPeople />
        </div>
      </div>
    </>
  );
}

export default AuctionDetail;