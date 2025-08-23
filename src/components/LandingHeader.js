// LandingHeader.jsx
import React from "react";
import styles from "./styles/landing-header.module.css";

const LandingHeader = () => {
  const handleLogin = () => {
    window.location.href = "https://www.likelion.info/login/oauth2/google";
  };

  const handleSignup = () => {
    // 회원가입 페이지로 이동 또는 모달 열기
    console.log("회원가입 버튼 클릭");
    // 예: window.location.href = "/signup";
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 왼쪽: 로고 */}
        <div className={styles.logo}>
        </div>

        {/* 가운데: 네비게이션 (선택사항) */}
        <nav className={styles.nav}>
        </nav>

        {/* 오른쪽: 로그인/회원가입 버튼 */}
        <div className={styles.authButtons}>
          <button 
            className={styles.loginBtn}
            onClick={handleLogin}
          >
            로그인
          </button>
          <button 
            className={styles.signupBtn}
            onClick={handleSignup}
          >
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;