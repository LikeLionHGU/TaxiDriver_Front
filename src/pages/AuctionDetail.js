import React from "react";
import styles from "../styles/AuctionDetail.module.css";

import PageHeader from "../components/SalesSettlementPage/PageHeader";
import AuctionItem from "../components/AuctionDetail/AuctionItem"
import AuctionPeople from "../components/AuctionDetail/AuctionPeople"

import stopbutton from "../assets/AuctionTable/stop.svg";
import beforestopbutton from "../assets/AuctionTable/beforestop.svg";


function AuctionDetail() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>
          <button className={styles.stopButton}>
            <img src={stopbutton} alt="excel"/>
            <span>거래 종료</span>
          </button>
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