// LandingPage.jsx
import React from "react";
import LandingHeader from '../components/LandingHeader';
import styles from '../components/styles/landing-header.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      {/* 헤더 */}
      <LandingHeader />
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>불편함은 간소함</h1>
          <p className={styles.heroSubtitle}>복잡하고 번거로웠던 업무 처리, 이제 스마트하게 해결하세요.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3 className={styles.featureTitle}>데이터 분석</h3>
            <p className={styles.featureDescription}>실시간 데이터 분석으로 효율적인 의사결정</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3 className={styles.featureTitle}>보안 시스템</h3>
            <p className={styles.featureDescription}>안전하고 신뢰할 수 있는 보안 체계</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>빠른 처리</h3>
            <p className={styles.featureDescription}>신속하고 정확한 업무 처리 시스템</p>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className={styles.innovationSection}>
        <div className={styles.innovationContent}>
          <div className={styles.innovationLeft}>
            <h2 className={styles.innovationTitle}>혁신적인 접근 방식</h2>
            <div className={styles.problemList}>
              <div className={styles.problemItem}>
                <h4>기존 시스템의 문제점</h4>
                <ul>
                  <li>복잡한 사용자 인터페이스</li>
                  <li>불투명한 처리 과정</li>
                  <li>정보 부족</li>
                  <li>번거로운 관리 과정</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.innovationRight}>
            <div className={styles.solutionButtons}>
              <button className={styles.solutionButton}>실시간 모니터링</button>
              <button className={styles.solutionButton}>자동화된 워크플로우</button>
              <button className={styles.solutionButton}>통합 대시보드</button>
              <button className={styles.solutionButton}>스마트 알림 시스템</button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <h2 className={styles.processTitle}>간편한 업무 프로세스</h2>
        <div className={styles.processFlow}>
          <div className={styles.processStep}>
            <div className={`${styles.processCircle} ${styles.step1}`}>
              <span>계획 수립</span>
            </div>
          </div>
          <div className={styles.processStep}>
            <div className={`${styles.processCircle} ${styles.step2}`}>
              <span>실행</span>
            </div>
          </div>
          <div className={styles.processStep}>
            <div className={`${styles.processCircle} ${styles.step3}`}>
              <span>모니터링</span>
            </div>
          </div>
          <div className={styles.processStep}>
            <div className={`${styles.processCircle} ${styles.step4}`}>
              <span>최적화</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Skills Section */}
      <section className={styles.teamSection}>
        <h2 className={styles.teamTitle}>팀원 기술</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCircle}>
            <span>프론트엔드</span>
          </div>
          <div className={styles.skillCircle}>
            <span>백엔드</span>
          </div>
          <div className={styles.skillCircle}>
            <span>데이터베이스</span>
          </div>
          <div className={styles.skillCircle}>
            <span>클라우드</span>
          </div>
          <div className={styles.skillCircle}>
            <span>AI/ML</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>지금 바로 시작하세요</h2>
          <p className={styles.ctaSubtitle}>더 스마트한 업무 환경을 경험해보세요</p>
          <button className={styles.ctaButton}>시작하기</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;