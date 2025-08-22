import React from "react";
import styles from "./Auction.module.css";

import PageHeader from "../SalesSettlementPage/PageHeader";
import SelcetButton from "./SelectButton";
import AuctionTable from "./AuctionTable";

function Auction() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>
          <PageHeader 
            image="box"
            title="수령 확인"
            content="낙찰 상품의 수령 여부를 확인하고, 상태를 처리하세요."/>
          <SelcetButton />
          <AuctionTable /> 
        </div>
      </div>
    </>
  );
}

export default Auction;