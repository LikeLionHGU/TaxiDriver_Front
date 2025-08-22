import React from "react";
import ConfirmRow from "./ConfirmRow";
import styles from "./ConfirmTableBox.module.css"; 

function ConfirmTableBox({ items }) {

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

      {items.map((it) => (<ConfirmRow key={it.id} item={it} />))}
    </div>
  );
}

export default ConfirmTableBox;