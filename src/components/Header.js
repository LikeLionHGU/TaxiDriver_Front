import React, {useState} from "react";
import { NavLink, useLocation /*, Link, useNavigate */ } from "react-router-dom";

import styles from "./styles/Header.module.css";
import { NAV_BY_ROLE, ROLES } from "../config/headerTest";

function Header() {
  const [role] = useState(ROLES.AMIN);
  const items = NAV_BY_ROLE[role];

// 1) 현재 경로 확인해서 현재 페이지 알려주는 border추가
  const location = useLocation();



  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
        </div>

         <nav className={styles.nav} aria-label="main">
            {items.map((it) => (
              <NavLink key={it.key} to={it.href} className={`${location.pathname === it.href ? styles.currentPage : ""} ${styles.buttonContainer}`}>
                <span className={styles.button}>{it.label}</span>
              </NavLink>
            ))}
          </nav>

        {/* <div className={styles.buttonContainer}>

          <span className={styles.button}>등록 현황</span>
        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.button}>수산물 등록</span>  
        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.button}>경매 상태</span>
        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.button}>판매 정산</span>

        </div> */}

      </div>
    </>
  );
}

export default Header;