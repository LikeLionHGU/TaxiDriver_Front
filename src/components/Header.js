import React, { useState, useEffect} from "react";
import { NavLink /*, Link, useNavigate */ } from "react-router-dom";
import styles from "./styles/Header.module.css";
import { NAV_BY_ROLE, ROLES } from "../config/headerTest";

function Header() {
  const [role, setRole] = useState(ROLES.JUNGDOMAEIN);
  const items = NAV_BY_ROLE[role];

  useEffect(() => {
    setRole(ROLES.JUNGDOMAEIN); 
  }, [role]);


  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>

        </div>

         <nav className={styles.nav} aria-label="main">
            {items.map((it) => (
              <NavLink
                key={it.key}
                to={it.href}
                className={({ isActive }) =>
                  [
                    styles.buttonContainer,
                    isActive ? styles.active : ""
                  ].join(" ")
                }
                end
              >
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