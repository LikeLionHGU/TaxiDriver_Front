import React from "react";
import styles from "./AuctionRow.module.css";

// 통화 포맷
const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);

// 상태 배지
function StatusBadge({ status }) {
  const map = {
    IN_PROGRESS: { label: "진행중", bg: "#FFF8B0", color: "#A57113" },
    PENDING:     { label: "대기중", bg: "#C6E7F8", color: "#115C6D" },
    DONE:        { label: "종료",   bg: "#E5E5E5", color: "#757575" },
  };
  const s = map[status] || map.PENDING;
  return (
    <span
      className={styles.badge}
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

function AuctionRow({ item }) {
  const displayTime =
    item.time ??
    (item.endAt
      ? new Date(item.endAt).toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "");

  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <div className={styles.productTitle}>{item.productName}</div>
        <div className={styles.productText}>
          {item.unit} | {item.quantity}
        </div>
      </div>

      <div className={styles.price}>{formatKRW(item.startPrice)}</div>
      <div className={styles.seller}>{item.sellerName}</div>
      <div className={styles.status}><StatusBadge status={item.status} /></div>
      <div className={styles.time}>{displayTime}</div>

      <div className={styles.action}>
        <button className={styles.detailBtn}>상세보기</button>
      </div>
    </div>
  );
}

export default AuctionRow;
