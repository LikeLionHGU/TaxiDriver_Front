import React from "react";
import styles from "./PeopleRow.module.css";

const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);

export default function PeopleRow({ name, status, lastBid, note }) {
  return (
    <div className={styles.row} role="listitem">
      <div className={styles.left}>
        <span className={styles.dot} aria-hidden="true" />
        <div className={styles.texts}>
          <div className={styles.name}>{name}</div>
          <div className={styles.sub}>{status}</div>
        </div>
      </div>

      <div className={styles.right}>
        {lastBid != null && <div className={styles.price}>{formatKRW(lastBid)}</div>}
        {note && <div className={styles.note}>{note}</div>}
      </div>
    </div>
  );
}
