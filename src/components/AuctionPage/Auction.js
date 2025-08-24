import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Auction.module.css";

import PageHeader from "../SalesSettlementPage/PageHeader";
import SelcetButton from "./SelectButton";
import AuctionTable from "./AuctionTable";
import Pagination from "../Pagination";

function Auction() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("ALL");

  // 페이지네이션
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 4;

  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>
          <PageHeader 
            image="cart"
            title="경매 상태"
            content="내가 등록한 상품의 경매 상태를 확인하세요."/>
          <SelcetButton value={activeStatus} onChange={setActiveStatus}/>
          <AuctionTable
            activeStatus={activeStatus}
            searchTerm={searchTerm}
            setSearchTerm={(v) => { setSearchTerm(v); setPage(1); }} // 검색이 바뀌면 1페이지
            page={page}
            pageSize={pageSize}
            onTotalChange={setTotalPages}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      </div>
    </>
  );
}

export default Auction;