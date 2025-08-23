import React, {useState} from "react";
import styles from "./ConfirmReceipt.module.css";

import PageHeader from "../SalesSettlementPage/PageHeader";
import ConfirmButton from "../ConfirmReceiptPage/ConfirmButton";
import ConfirmTable from "../ConfirmReceiptPage/ConfirmTable";

import TestModal from "../Modal/TestModal";


function ConfirmReceipt() {

// 1) test용 모달 생성
  const [testModalOpen, setTestModalOpen] = useState(false);
    const openTestModal = () => {
      setTestModalOpen(true);
      document.body.style.overflow = "hidden";
    };
    const closeTestModal = () => {
      setTestModalOpen(false);
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
          <button className={styles.excelButton} onClick={openTestModal}>
            <span>모달 확인용</span>
          </button>
          <ConfirmButton />
          <ConfirmTable />
        </div>

      <TestModal
        open={testModalOpen}
        close={closeTestModal}
      />
      </div>
    </>
  );
}

export default ConfirmReceipt;