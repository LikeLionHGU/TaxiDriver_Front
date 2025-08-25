import React from "react";
import ConfirmRow from "./ConfirmRow";
import styles from "./ConfirmTableBox.module.css"; 

function ConfirmTableBox({ items, onOpenDetail }) {

  return (
    <div className={styles.tableWrap}>
      <div className={styles.header}>
        <span>수산물 정보</span>
        <span>낙찰 금액</span>
        <span>구매자</span>
        <span>판매자</span>
        <span>수령 장소</span>
        <span>수령 시간</span>
        <span>수령 상태</span>
      </div>

      {items.map((it) => (
        <ConfirmRow key={it.id} item={it} onOpenDetail={onOpenDetail} />
      ))}
    </div>
  );
}

export default ConfirmTableBox;