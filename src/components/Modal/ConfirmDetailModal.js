import styles from "./ConfirmDetailModal.module.css";
// eslint-disable-next-line
import React, { useState } from "react";

/*
모달 사용법 !!
1. 사용하고자 하는 파일에 모달 import
2. 모달 열고 닫는 하는 함수..?랑 변수 선언 (confirmReceipt.js에 주석 달아둠!)
3. 코드 아래쪽에 모달 import한거 넣어주기*/


const ConfirmDetailModal = ({ open, close }) => {

  return (
    <>
      <div 
        className={open ? `${styles.openModal} ${styles.modal}` : styles.modal} 
        onClick={close} // 모달 바깥 클릭 시 닫힘
      >
        {open ? (
          <section onClick={(e) => e.stopPropagation()}>
            <main>

              <div className={styles.modalHeader}>
                <span>수령 확인</span>
              </div>
              <div className={styles.topContainer}>
                <div className={styles.firstContainer}>
                  <span className={styles.containerTitle}>기본 정보</span>
                  <div className={styles.confirmContent}>
                    <div className={styles.contentRow}>
                      <span className={styles.contentTitle}>어종</span>
                      <span className={styles.contentText}>광어</span>
                    </div>
                    <div className={styles.contentRow}>
                      <span className={styles.contentTitle}>포장단위</span>
                      <span className={styles.contentText}>15.5kg</span>
                    </div>
                    <div className={styles.contentRow}>
                      <span className={styles.contentTitle}>어획일</span>
                      <span className={styles.contentText}>2025.08.14</span>
                    </div>
                    <div className={styles.contentRow}>
                      <span className={styles.contentTitle}>어획지역</span>
                      <span className={styles.contentText}>통영</span>
                    </div>
                    <div className={`${styles.contentRow} ${styles.total}`}>
                      <span className={styles.contentTotalTitle}>낙찰 금액</span>
                      <span className={styles.contentTotalText}>2025.08.15</span>
                    </div>
                  </div>
                </div>
                <div className={styles.secondContainer}>
                  <span className={styles.containerTitle}>구매자 정보</span>
                  <input className={styles.confirmInput} placeholder="구매자 이름"/>
                  <input className={styles.confirmInput} placeholder="구매자 연락처"/>
                </div>
              </div>
              <div className={styles.bottomContainer}>
                <div className={styles.button} onClick={close}>
                  <span>취소</span>
                </div>
                <div className={styles.button1} >
                  <span>확인</span>
                </div>
              </div>

            </main>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default ConfirmDetailModal;
