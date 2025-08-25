import React, {useState} from "react";
import { NavLink/*, useLocation , Link, useNavigate */ } from "react-router-dom";


import styles from "./styles/Header.module.css";
import { NAV_BY_ROLE, ROLES } from "../config/headerTest";

function Header() {
  const [role] = useState(ROLES.JUNGDOMAEIN);


// 1) 현재 경로 확인해서 현재 페이지 알려주는 border추가
  // const location = useLocation();



  return (
    <>
      <header className={styles.headerContainer}>
        <img src={headerlogo} alt="Header Logo" className={styles.headerLogo} />

         <nav className={styles.nav} aria-label="main">
            {items.map((it) => (

              <NavLink
                key={it.key}
                to={it.href}
                // isActive 가 true면 currentPage 스타일을 추가
                className={({ isActive }) =>
                  `${styles.buttonContainer} ${isActive ? styles.currentPage : ""}`
                }
              >
                <span className={styles.button}>{it.label}</span>
              </NavLink>
            ))}
          </nav>
        </header>
      </>
  );
}

export default Header;