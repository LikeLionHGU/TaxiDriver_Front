import React from "react";
import styles from "./GuideBar.module.css";

import BlueButton from "../../assets/SaleTable/bluebutton.svg";
import PurpleButton from "../../assets/SaleTable/purplebutton.svg";
import YellowButton from "../../assets/SaleTable/yellowbutton.svg";


function GuideBar() {

  return (
    <>
      <div className={styles.guideBarContainer}>

        <div className={`${styles.sideLayout} ${styles.w2}`}>
          <span className={styles.guideBarTitle}>총 판매</span>
          <div className={styles.right}>
            <span className={styles.guideBarBoldTitle}>1</span>
            <span className={styles.guideBarBoldTitle}>건</span>
          </div>
        </div>


        <div className={styles.bar}></div>

        <div className={`${styles.sideLayout} ${styles.w25}`}>
          <div className={styles.left}>
            <img src={BlueButton} alt="Blue Button" className={styles.icon}/>
            <span className={styles.guideBarText}>정산 완료</span>
          </div>

          <div className={styles.right}>
            <span className={styles.guideBarBoldText}>1</span>
            <span className={styles.guideBarBoldText}>건</span>
          </div>
        </div>

        <div className={styles.bar}></div>

        <div className={`${styles.sideLayout} ${styles.w25}`}>
          <div className={styles.left}>
            <img src={PurpleButton} alt="Purple Button" className={styles.icon}/>
            <span className={styles.guideBarText}>대기 중</span>
          </div>

          <div className={styles.right}>
            <span className={styles.guideBarBoldText}>1</span>
            <span className={styles.guideBarBoldText}>건</span>
          </div>
        </div>

        <div className={styles.bar}></div>

        <div className={`${styles.sideLayout} ${styles.w3}`}>
          <div className={styles.left}>
            <img src={YellowButton} alt="Yellow Button" className={styles.icon}/>
            <span className={styles.guideBarText}>총 수익</span>
          </div>

          <div className={styles.right}>
            <span className={styles.guideBarBoldText}>₩</span>
            <span className={styles.guideBarBoldText}>120,000</span>
          </div>
        </div>
      </div>
    </>
  );
}


export default GuideBar;