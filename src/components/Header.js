import React, {useState} from "react";
import { NavLink/*, useLocation , Link, */, useNavigate  } from "react-router-dom";

import styles from "./styles/Header.module.css";
import { NAV_BY_ROLE, ROLES } from "../config/headerTest";

import logo from "../assets/mainLogo.svg";

function Header() {
  const [role] = useState(ROLES.JUNGDOMAEIN);
  const navigate = useNavigate();

// 1) 현재 경로 확인해서 현재 페이지 알려주는 border추가
  // const location = useLocation();
  const items = NAV_BY_ROLE[role] ?? [];


  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" onClick={() => navigate("/")} />
        </div>

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

      </div>
    </>
  );
}

export default Header;