// LandingPage.jsx
import React from "react";
import LandingHeader from '../components/LandingHeader';
import styles from '../components/styles/landing-header.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      {/* 헤더 */}
      <LandingHeader />
    </div>
  );
};

export default LandingPage;