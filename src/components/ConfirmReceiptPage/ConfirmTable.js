import React from "react";
import styles from "./ConfirmTable.module.css";

import ConfirmTableBox from "./ConfirmTableBox";

function ConfirmTable() {

  const mk = (id, name, unit, qty, price, status, time, addSec = 870) => ({
    id,
    productName: name,
    unit,
    quantity: qty,
    startPrice: price,
    sellerName: "김철수",
    status,           
    time,         
    endAt: new Date(Date.now() + addSec * 1000).toISOString(), // 카운트다운 쓸 때 사용
  });

  const data = {
    items: [
      mk(101, "(활)광어", "2kg/마리", 10, 35000, "PENDING", "14:30"),
      mk(102, "(선)갈치", "0.5kg/마리", 30, 15000, "PENDING", "14:30"),
      mk(103, "(선)갈치", "0.5kg/마리",  4, 25000, "PENDING", "14:30"),
      mk(104, "(선)전어", "박스",      25, 12000, "PENDING", "14:30"),
    ],
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          <div className={styles.searchContainer}>
            수산물을 검색하세요
          </div>
        </div>
        <ConfirmTableBox items={data.items} />
      </div>
    </>
  );
}


export default ConfirmTable;