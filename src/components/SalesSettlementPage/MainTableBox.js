import React from "react";
import styles from "./MainTableBox.module.css";

import AuctionRow from "../AuctionPage/AuctionRow";

import Rectangle from "../../assets/SaleTable/Rectangle.png";


function MainTableBox({items = []}) {

  
  return (
    <>
      <div className={styles.main}>
        <div className={styles.tableTitle}>
          <img src={Rectangle} alt="checkbox" />
          <span className={styles.product}>상품명</span>
          <span className={styles.quantity}>수량</span> 
          <span className={styles.price}>낙찰가</span>
          <span className={styles.date}>낙찰일</span>
        </div>

        {/* row 를 맵으로 */}
        {items.map((it) => (<AuctionRow key={it.id} item={it} />))}
      </div>
    </>
  );
}


export default MainTableBox;