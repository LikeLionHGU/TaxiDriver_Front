import React from "react";
import styles from "./SaleRow.module.css";

// ₩ 포맷
const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);

/**
 * props
 *  - item: { productName, origin, qty, unit, price, date }
 *  - checked?: boolean
 *  - onCheck?: (checked, item) => void
 */
function SaleRow({ item, checked = false, onCheck }) {
  return (
    <div className={styles.row} role="row">
      {/* 체크박스 */}
      <div className={styles.checkCell}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheck?.(e.target.checked, item)}
          aria-label={`${item.productName} 선택`}
        />
      </div>

      {/* 상품명 / 원산지 */}
      <div className={styles.productCell}>
        <div className={styles.productName}>{item.productName}</div>
        <div className={styles.origin}>{item.origin}</div>
      </div>

      {/* 수량 */}
      <div className={styles.qtyCell}>
        {item.qty}
        {item.unit}
      </div>

      {/* 낙찰가 */}
      <div className={styles.priceCell}>{formatKRW(item.price)}</div>

      {/* 낙찰일 */}
      <div className={styles.dateCell}>{item.date}</div>
    </div>
  );
}

export default SaleRow;
