import React from "react";
import { NavLink, useLocation /*, Link, */, useNavigate  } from "react-router-dom";


import styles from "./styles/Header.module.css";
import { useAuth, ROLES } from "../auth/AuthContext";
import { NAV_BY_ROLE } from "../config/headerTest";
import LandingHeader from "./LandingHeader";

import logo from "../assets/mainLogo.svg";

function Header() {
  // const [role] = useState(ROLES.JUNGDOMAEIN);
  const { role, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const items = NAV_BY_ROLE[role] ?? NAV_BY_ROLE[ROLES.GUEST] ?? [];

  if (loading) return null;

  if (role === ROLES.GUEST) {
    return <LandingHeader />;
  }

  // 디버그(원인 추적용)
  console.log("role =", role, "items =", items.map(i => i.key));

  const handleLogin = () => {
    window.location.href = "https://www.likelion.info/login/oauth2/google";
  };
  
  return ( 
    <>
      <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
      </div>

      <nav className={styles.nav} aria-label="main">
        {items.map((it) => {
          // /auction/..., /producermain/...도 활성화 처리
          const isCurrent =
            location.pathname === it.href ||
            location.pathname.startsWith(`${it.href}/`);
          return (
            <NavLink
              key={it.key}
              to={it.href}
              end={false} // 부분 일치 허용(하위경로도 활성화)
              className={`${styles.buttonContainer} ${
                isCurrent ? styles.currentPage : ""
              }`}
            >
              <span className={styles.button}>{it.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <button 
        className={styles.loginBtn}
        onClick={handleLogin}
      >
        재로그인
      </button>
    </div>
    </>

  );
}

export default Header;