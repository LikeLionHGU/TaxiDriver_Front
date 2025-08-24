import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Auction.module.css";

import PageHeader from "../SalesSettlementPage/PageHeader";
import SelcetButton from "./SelectButton";
import AuctionTable from "./AuctionTable";

function Auction() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("ALL");

  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>
          <PageHeader 
            image="cart"
            title="경매 상태"
            content="내가 등록한 상품의 경매 상태를 확인하세요."/>
          <div onClick={() => navigate(`/auction/detail`)}>상세 확인</div>
          <SelcetButton value={activeStatus} onChange={setActiveStatus}/>
          <AuctionTable activeStatus={activeStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}/> 
        </div>
      </div>
    </>
  );
}

export default Auction;