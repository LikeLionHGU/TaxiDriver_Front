import React from "react";
import styles from "./MainTableBox.module.css";
import styles1 from "./SaleRow.module.css";

import SaleRow from "./SaleRow";

function MainTableBox({ items = [], selectedRows, selectAll, handleSelectRow, handleSelectAll }) {
  const handleHeaderCheckboxChange = (event) => {
    handleSelectAll(event.target.checked, items);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.tableTitle}>
          <div className={styles1.checkCell}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleHeaderCheckboxChange}
            />
          </div>
          <span className={styles.product}>상품명</span>
          <span className={styles.quantity}>수량</span> 
          <span className={styles.price}>낙찰가</span>
          <span className={styles.date}>낙찰일</span>
        </div>

        {items.map((item) => (
          <SaleRow
            key={item.id}
            item={item}
            isSelected={selectedRows[item.id] || false}
            handleSelectRow={handleSelectRow}
          />
        ))}
      </div>
    </>
  );
}


export default MainTableBox;