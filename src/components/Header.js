import React, { use } from "react";
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

        <nav>
          {items.map((it) => (
            <a key={it.key} href={it.href} className={styles.buttonContainer}>
              <span className={styles.button}>{it.label}</span>
            </a>
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