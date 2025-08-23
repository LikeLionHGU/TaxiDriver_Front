import React from "react";
import styles from "./styles/Footer.module.css";


function Footer() {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerTopContainer}>
          <div className={styles.leftWidth}>
            <span className={styles.mainText}>어울림</span>
          </div>
          <span className={styles.sideText}>문의</span>
        </div>
        <div className={styles.footerBottomContainer}>
          <div className={styles.leftContainer}>
            <span>온라인 수산물 경매 플랫폼</span>
            <span>어민과 중도매인을 연결하는 투명한 경매 시스템</span>
          </div>
          <div className={styles.rightContainer}>
            <span>전화: 010-5833-0651</span>
            <span>이메일: rejames01@handong.ac.kr</span>
            <span>주소: 경상북도 포항시 북구 흥해읍 한동로 558</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;