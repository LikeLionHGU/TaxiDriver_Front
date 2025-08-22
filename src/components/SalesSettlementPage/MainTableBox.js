import React from "react";
import styles from "./MainTableBox.module.css";
import styles1 from "./SaleRow.module.css";

import SaleRow from "./SaleRow";

import Rectangle from "../../assets/SaleTable/Rectangle.png";


function MainTableBox({items = []}) {

  
  return (
    <>
      <div className={styles.main}>
        <div className={styles.tableTitle}>
          {/* <img src={Rectangle} alt="checkbox" /> */}
          <div className={styles1.checkCell}>
            <input type="checkbox" 
              disabled
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
          <span className={styles.product}>상품명</span>
          <span className={styles.quantity}>수량</span> 
          <span className={styles.price}>낙찰가</span>
          <span className={styles.date}>낙찰일</span>
        </div>

        {/* row 를 맵으로 */}
        {items.map((it) => (<SaleRow key={it.id} item={it} />))}
      </div>
    </>
  );
}


export default MainTableBox;