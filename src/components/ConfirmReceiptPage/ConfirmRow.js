import React from "react";
import styles from "./ConfirmRow.module.css";

const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

// 수령 상태 Pill
function ReceivePill({ state }) {
  const map = {
    WAITING: { label: "수령대기", bg: "none", color: "#000", border: "#2775E7" },
    DONE:    { label: "수령완료", bg: "#E5E5E5", color: "#757575", border: "none" },
  };
  const s = map[state] ?? map.WAITING;
  return (
    <button
      type="button"
      className={styles.statusPill}
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
      disabled
    >
      {s.label}
    </button>
  );
}

function ConfirmRow({ item }) {
  return (
    <div className={styles.row} role="row">
      {/* 수산물 정보 */}
      <div className={styles.productCell}>
        <div className={styles.productName}>{item.productName}</div>
        <div className={styles.subText}>{item.origin} | {item.weight}</div>
      </div>

      {/* 낙찰 금액 */}
      <div className={styles.priceCell}>{formatKRW(item.bidPrice)}</div>

      {/* 구매자 / 판매자 */}
      <div className={styles.buyerCell}>{item.buyerName}</div>
      <div className={styles.sellerCell}>{item.sellerName}</div>

      {/* 수령 장소 */}
      <div className={styles.placeCell}>{item.pickupPlace}</div>

      {/* 수령 기한(날짜/시간) */}
      <div className={styles.dueCell}>
        <div className={styles.dueDate}>{item.dueDate}</div>
        <div className={styles.dueTime}>{item.dueTime}</div>
      </div>

      {/* 수령 상태 */}
      <div className={styles.statusCell}>
        <ReceivePill state={item.receiveStatus} />
      </div>
    </div>
  );
}
export default ConfirmRow;
