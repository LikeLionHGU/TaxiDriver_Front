import styles from "./TestModal.module.css";
// eslint-disable-next-line
import React, { useState } from "react";


const TestModal = ({ open, close }) => {

  return (
    <>
    <div 
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal} 
      onClick={close} // 모달 바깥 클릭 시 닫힘
    >
      {open ? (
        <section onClick={(e) => e.stopPropagation()}>
          <main>
            <div className={styles.topContainer}>
              <span>리크루팅을 생성하시겠어요?</span>
              <p>마이페이지에서 수정 가능합니다.</p>
            </div>
            <div className={styles.bottomContainer}>
              <div className={styles.button} onClick={close}>
                <span>취소</span>
              </div>
              <div className={styles.button1} >
                <span>생성하기</span>
              </div>
            </div>
          </main>
        </section>
      ) : null}
    </div>
        </>
  );
};

export default TestModal;
