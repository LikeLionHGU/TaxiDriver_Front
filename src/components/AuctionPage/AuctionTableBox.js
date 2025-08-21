import React from "react";
import AuctionRow from "./AuctionRow";
import styles from "./AuctionTableBox.module.css"; 

function AuctionTableBox({ items }) {

  return (
    <div className={styles.tableWrap}>
      <div className={styles.header}>
        <span>수산물 정보</span>
        <span>시작가</span>
        <span>판매자</span>
        <span>경매 상태</span>
        <span>시간 정보</span>
        <span>등록 상세</span>
      </div>

      {items.map((it) => (<AuctionRow key={it.id} item={it} />))}
    </div>
  );
}

export default AuctionTableBox;