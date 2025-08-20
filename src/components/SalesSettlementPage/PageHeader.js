import React from "react";
import styles from "./PageHeader.module.css";

import NoteImg from "../../assets/SaleTable/note.svg"; 
import CartImg from "../../assets/SaleTable/cart.svg";


function PageHeader() {

  const headerText =[
    { id: 1, src: NoteImg, title: "경매 상태", content: "내가 등록한 상품의 경매 상태를 확인하세요." },
    { id: 2, src: CartImg, title: "판매 정산 현황", content: "낙찰된 상품의 정산 처리 현황과 수익을 확인하세요." },
  ]
  return (
    <>
      <div className={styles.main}>
        <img src={CartImg} alt="Note" />
        <div className={styles.textContainer}>
          <span className={styles.title}>판매 정산</span>
          <span className={styles.content}>내가 등록한 상품의 경매 상태를 확인하세요.</span>
        </div>
      </div>
    </>
  );
}


export default PageHeader;