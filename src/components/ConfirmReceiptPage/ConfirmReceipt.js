import React, { useState } from "react";
import styles from "./ConfirmReceipt.module.css";

import PageHeader from "../SalesSettlementPage/PageHeader";
import ConfirmButton from "../ConfirmReceiptPage/ConfirmButton";
import ConfirmTable from "../ConfirmReceiptPage/ConfirmTable";

import ConfirmDetailModal from "../Modal/ConfirmDetailModal";


function ConfirmReceipt() {
  const [activeFilter, setActiveFilter] = useState("today");


// 1) test용 모달 생성
  const [confirmDetailModalOpen, setConfirmDetailModalOpen] = useState(false);
    const openConfirmDetailModal = () => {
      setConfirmDetailModalOpen(true);
      document.body.style.overflow = "hidden";
    };
    const closeConfirmDetailModal = () => {
      setConfirmDetailModalOpen(false);
      document.body.style.removeProperty("overflow");
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradientBox}/>
        <div className={styles.pageContainer}>
          <PageHeader 
            image="box"
            title="수령 확인"
            content="낙찰 상품의 수령 여부를 확인하고, 상태를 처리하세요."/>
          <button className={styles.excelButton} onClick={openConfirmDetailModal}>
            <span>모달 확인용</span>
          </button>
          <ConfirmButton value={activeFilter} onChange={setActiveFilter} />
          <ConfirmTable activeFilter={activeFilter} />
        </div>

      <ConfirmDetailModal
        open={confirmDetailModalOpen}
        close={closeConfirmDetailModal}
      />
      </div>
    </>
  );
}

export default ConfirmReceipt;