import React from "react";
import styles from "./ConfirmTable.module.css";

import ConfirmTableBox from "./ConfirmTableBox";

function ConfirmTable() {

  const items = [
    {
      id: 1,
      productName: "대게",
      origin: "포항",
      weight: "25.5kg",
      bidPrice: 275000,                 // 낙찰 금액
      buyerName: "부산수산",             // 구매자
      sellerName: "김철수",             // 판매자
      pickupPlace: "포항수협 죽도위판장 2층",
      dueDate: "2024-11-19",            // 수령 기한(날짜)
      dueTime: "15:30",                 // 수령 기한(시간)
      receiveStatus: "WAITING",         // WAITING | DONE
    },
    {
      id: 2,
      productName: "대게",
      origin: "포항",
      weight: "25.5kg",
      bidPrice: 185000,
      buyerName: "서울수산",
      sellerName: "이영희",
      pickupPlace: "포항수협 죽도위판장 2층",
      dueDate: "2024-11-19",
      dueTime: "15:30",
      receiveStatus: "DONE",
    },
    {
      id: 3,
      productName: "대게",
      origin: "포항",
      weight: "25.5kg",
      bidPrice: 185000,
      buyerName: "대구유통",
      sellerName: "박민수",
      pickupPlace: "포항수협 죽도위판장 2층",
      dueDate: "2024-11-19",
      dueTime: "15:30",
      receiveStatus: "DONE",
    },
    {
      id: 4,
      productName: "대게",
      origin: "포항",
      weight: "25.5kg",
      bidPrice: 185000,
      buyerName: "인천수산",
      sellerName: "정수진",
      pickupPlace: "포항수협 죽도위판장 2층",
      dueDate: "2024-11-19",
      dueTime: "15:30",
      receiveStatus: "DONE",
    },
  ];
  

  return (
    <>
      <div className={styles.main}>
        <ConfirmTableBox items={items} />
      </div>
    </>
  );
}


export default ConfirmTable;