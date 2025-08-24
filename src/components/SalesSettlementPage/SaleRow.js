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
 *  - isSelected?: boolean
 *  - handleSelectRow?: (id, isSelected) => void
 */
function SaleRow({ item, isSelected = false, handleSelectRow }) {
  return (
    <div className={styles.row} role="row">
      {/* 체크박스 */}
      <div className={styles.checkCell}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => handleSelectRow?.(item.id, e.target.checked)}
          aria-label={`${item.productName} 선택`}
        />
      </div>

      {/* 상품명 / 원산지 */}
      <div className={styles.productCell}>
        <div className={styles.productName}>{item.name}</div>
      </div>

      {/* 수량 */}
      <div className={styles.qtyCell}>
        {item.count}
      </div>

      {/* 낙찰가 */}
      <div className={styles.priceCell}>{formatKRW(item.price)}</div>

      {/* 낙찰일 */}
      <div className={styles.dateCell}>{item.date}</div>
    </div>
  );
}

export default SaleRow;
