/* eslint-disable */

import React, { useState, useEffect } from "react";
import axios from "axios";
import LandingHeader from '../components/LandingHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      background: 'white',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      textAlign: 'center',
      maxWidth: '400px',
      width: '90%',
    },
    message: {
      fontSize: '18px',
      marginBottom: '30px',
      color: '#333',
    },
    button: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p style={styles.message}>{message}</p>
        <button style={styles.button} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(
    () => sessionStorage.getItem('registrationComplete') === 'true'
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.registrationComplete) {
      setRegistrationComplete(true);
      sessionStorage.setItem('registrationComplete', 'true');
      setShowModal(true);
      // Prevent the modal from showing up again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleLinkClick = (e) => {
    if (registrationComplete) {
      e.preventDefault();
      setShowModal(true);
    }
  };
  
  const styles = {
    landingPage: {
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)',
      fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    
    heroSection: {
      padding: '120px 20px 100px',
      textAlign: 'center',
      background: 'linear-gradient(180deg, #E3F1FF 0%, #FFF 76.76%)',
      color: 'white',
      position: 'relative'
    },
    
    heroContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '800px',
      margin: '0 auto'
    },
    
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 700,
      marginTop: '-9px',
      marginBottom: '24px',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color: '#000'
    },

     heroColor: {
      fontSize: '3.5rem',
      fontWeight: 700,
      marginTop: '-9px',
      marginBottom: '24px',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      background: 'linear-gradient(90deg, #2563EB 0%, #3D9ABA 44.71%, #7FD7A1 100%)',
    },

    heroMagic: {
      fontSize: '16px',
      fontWeight: 500,
      marginBottom: '24px',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color: '#2563EB'
    },
    
    heroSubtitle: {
      fontSize: '18px',
      fontWeight: 500,
      marginTop: '42px',
      marginBottom: '-32px',
      color: 'var(--text-gray, #444)'
    },
    
    featuresSection: {
      padding: '100px 20px',
      background: 'white'
    },
    
    featureCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      marginBottom: '120px'
    },
    
    featureCard: {
      textAlign: 'center',
      padding: '40px 30px',
      borderRadius: '16px',
      background: 'white',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(102, 126, 234, 0.1)',
      cursor: 'pointer'
    },
    
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '24px'
    },
    
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '16px',
      color: '#2d3748'
    },
    
    featureDescription: {
      fontSize: '1rem',
      color: '#718096',
      lineHeight: 1.6
    },
    
    innovationSection: {
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)'
    },
    
    innovationContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '80px',
      alignItems: 'center'
    },
    
    innovationTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2d3748',
      marginBottom: '40px'
    },
    
    problemItem: {
      marginBottom: '20px'
    },
    
    problemItemTitle: {
      fontSize: '30px',
      fontWeight: 700,
      color: '#000',
      textaligh:'center',
      marginBottom: '20px'
    },
    
    problemList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    
    problemListItem: {
      padding: '12px 0',
      color: '#718096',
      position: 'relative',
      paddingLeft: '24px'
    },
    
    solutionButtons: {
      display: 'grid',
      gap: '16px'
    },
    
    solutionButton: {
      padding: '16px 24px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left'
    },
    
    processSection: {
      padding: '100px 20px',
      background: 'white',
      textAlign: 'center'
    },
    
    processTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2d3748',
      marginBottom: '60px'
    },
    
    processFlow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      flexWrap: 'wrap'
    },
    
    processCircle: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 600,
      fontSize: '0.9rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    
    step1: {
      background: 'linear-gradient(135deg, #84d9d2 0%, #07cdae 100%)'
    },
    
    step2: {
      background: 'linear-gradient(135deg, #a8e6cf 0%, #56ab2f 100%)'
    },
    
    step3: {
      background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)'
    },
    
    step4: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    
    teamSection: {
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
      textAlign: 'center'
    },
    
    teamTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2d3748',
      marginBottom: '60px'
    },
    
    skillsGrid: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '30px',
      flexWrap: 'wrap',
      maxWidth: '800px',
      margin: '0 auto'
    },
    
    skillCircle: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: '0.9rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    
    ctaSection: {
      padding: '120px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textAlign: 'center',
      color: 'white'
    },
    
    ctaContent: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '24px'
    },
    
    ctaSubtitle: {
      fontSize: '1.25rem',
      fontWeight: 300,
      marginBottom: '40px',
      opacity: 0.9
    },
    
    ctaButton: {
      padding: '16px 48px',
      background: 'white',
      color: '#667eea',
      border: 'none',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }
  };

  const handleCardHover = (e, isHover) => {
    if (isHover) {
      e.target.style.transform = 'translateY(-8px)';
      e.target.style.boxShadow = '0 16px 48px rgba(102, 126, 234, 0.15)';
    } else {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
    }
  };

  const handleButtonHover = (e, isHover) => {
    if (isHover) {
      e.target.style.transform = 'translateX(8px)';
      e.target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)';
    } else {
      e.target.style.transform = 'translateX(0)';
      e.target.style.boxShadow = 'none';
    }
  };

  const handleCircleHover = (e, isHover) => {
    if (isHover) {
      e.target.style.transform = 'scale(1.1)';
    } else {
      e.target.style.transform = 'scale(1)';
    }
  };

  const handleCtaButtonHover = (e, isHover) => {
    if (isHover) {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.2)';
    } else {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }
  };

  return (
    <div style={styles.landingPage}>
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        message="로그인 해주세요. 이미 회원가입이 완료되었습니다"
      />
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroMagic}>수산물 경매의 새로운 기준</div>
          <h1 style={styles.heroTitle}>투명하고 신속한</h1>
          <h1 style={styles.heroTitle}>
            <span style={{
              background: 'linear-gradient(90deg, #2563EB 0%, #3D9ABA 44.71%, #7FD7A1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              온라인 경매 플랫폼
            </span>
            , 어울림
          </h1>
          <p style={styles.heroSubtitle}>
            생산자, 중도매인, 위판장을 하나로 연결하여 수산물 경매의 모든 과정을 디지털로 전환합니다.
          </p>
          <p style={styles.heroSubtitle}>
            어민과 중도매인 모두 신뢰할 수  있는 온라인 경매 시스템을 경험하세요.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.featureCards}>
          <Link
            to="consignment-company"
            style={styles.featureCard}
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
            onClick={handleLinkClick}
          >
            <div style={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="57" viewBox="0 0 46 57" fill="none">
<rect x="8.05957" y="0.891113" width="37.2019" height="47.0304" rx="4.77078" fill="url(#paint0_linear_2165_3692)"/>
<g filter="url(#filter0_d_2165_3692)">
<rect x="2.18018" y="5.07568" width="37.2019" height="47.0304" rx="4.77078" fill="url(#paint1_linear_2165_3692)" fill-opacity="0.79" shape-rendering="crispEdges"/>
</g>
<rect x="8.18701" y="14.4756" width="6.02929" height="6.0312" rx="0.795129" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="8.18701" y="25.4766" width="6.02929" height="6.0312" rx="0.795129" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="17.7666" y="25.4766" width="6.02929" height="6.0312" rx="0.795129" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="8.18701" y="36.478" width="6.02929" height="6.0312" rx="0.795129" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="17.7666" y="36.6753" width="6.02929" height="6.0312" rx="0.795129" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="27.3457" y="36.6753" width="6.02929" height="6.0312" rx="0.795129" fill="#FDFEFF" fill-opacity="0.93"/>
<defs>
<filter id="filter0_d_2165_3692" x="0.0333264" y="2.1337" width="44.6759" height="54.5045" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1.59026" dy="0.795129"/>
<feGaussianBlur stdDeviation="1.86855"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2165_3692"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2165_3692" result="shape"/>
</filter>
<linearGradient id="paint0_linear_2165_3692" x1="8.05957" y1="0.891113" x2="41.1528" y2="47.9215" gradientUnits="userSpaceOnUse">
<stop offset="0.0769231" stop-color="#36B7FF"/>
<stop offset="0.490385" stop-color="#317BE7"/>
<stop offset="1" stop-color="#1A498E"/>
</linearGradient>
<linearGradient id="paint1_linear_2165_3692" x1="3.71836" y1="6.77347" x2="98.6332" y2="142.989" gradientUnits="userSpaceOnUse">
<stop stop-color="#DBECFA"/>
<stop offset="1" stop-color="#3A8ACD"/>
</linearGradient>
</defs>
</svg>
            </div>
            <h3 style={styles.featureTitle}>위판장 관리자</h3>
          </Link>
          <Link
            to="/buyer"
            style={styles.featureCard}
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
            onClick={handleLinkClick}
          >
            <div style={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="52" viewBox="0 0 44 52" fill="none">
<circle cx="25.1414" cy="12.2776" r="11.3303" fill="url(#paint0_linear_2165_3705)"/>
<path d="M34.3335 24.064C38.7246 24.0642 42.2846 27.624 42.2847 32.0151V47.7339C42.2845 48.612 41.572 49.3237 40.6938 49.3237H9.58838C8.71019 49.3237 7.99769 48.612 7.99756 47.7339V32.0151C7.99768 27.624 11.5576 24.0641 15.9487 24.064H17.2417C19.3345 25.5731 22.1039 26.4926 25.1421 26.4927C28.1802 26.4927 30.9496 25.573 33.0425 24.064H34.3335Z" fill="url(#paint1_linear_2165_3705)"/>
<circle cx="17.2556" cy="14.4143" r="11.3303" fill="#DBECFA"/>
<path d="M26.4468 26.2002C30.8381 26.2002 34.3979 29.7601 34.3979 34.1514V49.8701C34.3978 50.7482 33.6863 51.46 32.8081 51.46H1.70166C0.823672 51.4597 0.111987 50.7481 0.111816 49.8701V34.1514C0.111899 29.7601 3.67171 26.2003 8.06299 26.2002H9.5874C11.6506 27.6112 14.3265 28.4657 17.2524 28.4658C20.1786 28.4658 22.8552 27.6113 24.9185 26.2002H26.4468Z" fill="#DBECFA"/>
<defs>
<linearGradient id="paint0_linear_2165_3705" x1="19.1488" y1="4.19988" x2="34.8403" y2="23.6079" gradientUnits="userSpaceOnUse">
<stop offset="0.0817308" stop-color="#23A9F3"/>
<stop offset="0.4493" stop-color="#2775E7"/>
<stop offset="1" stop-color="#164181"/>
</linearGradient>
<linearGradient id="paint1_linear_2165_3705" x1="15.244" y1="24.064" x2="37.1979" y2="52.6724" gradientUnits="userSpaceOnUse">
<stop offset="0.0721154" stop-color="#24AAF4"/>
<stop offset="0.466346" stop-color="#2775E7"/>
<stop offset="1" stop-color="#164181"/>
</linearGradient>
</defs>
</svg>
            </div>
            <h3 style={styles.featureTitle}>구매업체</h3>
          </Link>
          <Link
            to="/fishman"
            style={styles.featureCard}
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
            onClick={handleLinkClick}
          >
            <div style={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="61" height="54" viewBox="0 0 61 54" fill="none">
<path d="M31.545 25.7629C33.1352 26.681 33.1352 28.9764 31.545 29.8945L9.49178 42.6269C7.69552 43.664 5.5229 42.0727 5.96969 40.0473L8.21158 29.884C8.51025 28.5301 8.51025 27.1273 8.21158 25.7733L5.96969 15.6101C5.52291 13.5847 7.69552 11.9934 9.49178 13.0305L31.545 25.7629Z" fill="url(#paint0_linear_2165_3683)" fill-opacity="0.8"/>
<path d="M31.545 24.4279C33.1352 25.3461 33.1352 27.6414 31.545 28.5595L9.49178 41.2919C7.69552 42.329 5.5229 40.7377 5.96969 38.7123L8.21158 28.5491C8.51025 27.1951 8.51025 25.7923 8.21158 24.4384L5.96969 14.2751C5.52291 12.2497 7.69552 10.6584 9.49178 11.6955L31.545 24.4279Z" fill="url(#paint1_linear_2165_3683)" fill-opacity="0.88"/>
<path d="M57.1485 24.7579C58.7387 25.676 58.7387 27.9714 57.1485 28.8895L19.6271 50.5525C17.8308 51.5896 15.6582 49.9983 16.105 47.9729L20.3924 28.5365C20.6413 27.4082 20.6413 26.2392 20.3924 25.1109L16.105 5.67456C15.6582 3.64911 17.8308 2.05784 19.6271 3.09491L57.1485 24.7579Z" fill="url(#paint2_linear_2165_3683)" fill-opacity="0.72"/>
<path d="M55.6762 24.8251C57.2602 25.7444 57.2602 28.0319 55.6762 28.9513L19.6304 49.8716C17.8354 50.9134 15.6582 49.3244 16.1031 47.2972L20.2076 28.5924C20.454 27.4696 20.454 26.3067 20.2076 25.1839L16.1031 6.47915C15.6582 4.45192 17.8354 2.86298 19.6304 3.90479L55.6762 24.8251Z" fill="white" fill-opacity="0.16"/>
<circle cx="42.6564" cy="26.4943" r="3.10855" fill="white" fill-opacity="0.86"/>
<defs>
<linearGradient id="paint0_linear_2165_3683" x1="19.9633" y1="10.3237" x2="19.9633" y2="45.3336" gradientUnits="userSpaceOnUse">
<stop stop-color="#1595F6"/>
<stop offset="1" stop-color="#0B289B"/>
</linearGradient>
<linearGradient id="paint1_linear_2165_3683" x1="19.9633" y1="8.98877" x2="19.9633" y2="43.9987" gradientUnits="userSpaceOnUse">
<stop stop-color="#15BAF6"/>
<stop offset="1" stop-color="#2A50E3"/>
</linearGradient>
<linearGradient id="paint2_linear_2165_3683" x1="11.5333" y1="-6.41633" x2="40.4601" y2="45.0936" gradientSpaceOnUse>
<stop stop-color="#DFF1FF"/>
<stop offset="1" stop-color="#A7CFEF"/>
</linearGradient>
</defs>
</svg>
            </div>
            <h3 style={styles.featureTitle}>어민/생산자</h3>
          </Link>
        </div>
      </section>

      {/* Innovation Section */}
      <section style={styles.innovationSection}>
        <div style={styles.innovationContent}>
          <div>
            <div style={styles.problemItem}>
              <h4 style={styles.problemItemTitle}>기존 시스템의 문제점</h4>
              <ul style={styles.problemList}>
                <li style={{...styles.problemListItem, position: 'relative'}}>
                  <span style={{position: 'absolute', left: '0', color: '#667eea', fontWeight: 'bold'}}>•</span>
                  복잡한 사용자 인터페이스
                </li>
                <li style={{...styles.problemListItem, position: 'relative'}}>
                  <span style={{position: 'absolute', left: '0', color: '#667eea', fontWeight: 'bold'}}>•</span>
                  불투명한 처리 과정
                </li>
                <li style={{...styles.problemListItem, position: 'relative'}}>
                  <span style={{position: 'absolute', left: '0', color: '#667eea', fontWeight: 'bold'}}>•</span>
                  정보 부족
                </li>
                <li style={{...styles.problemListItem, position: 'relative'}}>
                  <span style={{position: 'absolute', left: '0', color: '#667eea', fontWeight: 'bold'}}>•</span>
                  번거로운 관리 과정
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div style={styles.solutionButtons}>
              <button 
                style={styles.solutionButton}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                실시간 모니터링
              </button>
              <button 
                style={styles.solutionButton}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                자동화된 워크플로우
              </button>
              <button 
                style={styles.solutionButton}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                통합 대시보드
              </button>
              <button 
                style={styles.solutionButton}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                스마트 알림 시스템
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={styles.processSection}>
        <h2 style={styles.processTitle}>간편한 업무 프로세스</h2>
        <div style={styles.processFlow}>
          <div 
            style={{...styles.processCircle, ...styles.step1}}
            onMouseEnter={(e) => handleCircleHover(e, true)}
            onMouseLeave={(e) => handleCircleHover(e, false)}
          >
            <span>계획 수립</span>
          </div>
          <div 
            style={{...styles.processCircle, ...styles.step2}}
            onMouseEnter={(e) => handleCircleHover(e, true)}
            onMouseLeave={(e) => handleCircleHover(e, false)}
          >
            <span>실행</span>
          </div>
          <div 
            style={{...styles.processCircle, ...styles.step3}}
            onMouseEnter={(e) => handleCircleHover(e, true)}
            onMouseLeave={(e) => handleCircleHover(e, false)}
          >
            <span>모니터링</span>
          </div>
          <div 
            style={{...styles.processCircle, ...styles.step4}}
            onMouseEnter={(e) => handleCircleHover(e, true)}
            onMouseLeave={(e) => handleCircleHover(e, false)}
          >
            <span>최적화</span>
          </div>
        </div>
      </section>

      {/* Team Skills Section */}
      <section style={styles.teamSection}>
        <h2 style={styles.teamTitle}>팀원 기술</h2>
        <div style={styles.skillsGrid}>
          <div 
            style={styles.skillCircle}
            onMouseEnter={(e) => handleCircleHover(e, true)}
            onMouseLeave={(e) => handleCircleHover(e, false)}
          >
            <span>프론트엔드</span>
          </div>
          <div 
            style={styles.skillCircle}
            onMouseEnter={(e) => handleCircleHover(e, true)}
            onMouseLeave={(e) => handleCircleHover(e, false)}
          >
            <span>백엔드</span>
          </div>
          <div 
            style={styles.skillCircle}
            onMouseEnter={(e) => handleCircleHover(e, true)}
            onMouseLeave={(e) => handleCircleHover(e, false)}
          >
            <span>데이터베이스</span>
          </div>
          <div 
            style={styles.skillCircle}
            onMouseEnter={(e) => handleCircleHover(e, true)}
            onMouseLeave={(e) => handleCircleHover(e, false)}
          >
            <span>클라우드</span>
          </div>
          <div 
            style={styles.skillCircle}
            onMouseEnter={(e) => handleCircleHover(e, true)}
            onMouseLeave={(e) => handleCircleHover(e, false)}
          >
            <span>AI/ML</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>지금 바로 시작하세요</h2>
          <p style={styles.ctaSubtitle}>더 스마트한 업무 환경을 경험해보세요</p>
          <button 
            style={styles.ctaButton}
            onMouseEnter={(e) => handleCtaButtonHover(e, true)}
            onMouseLeave={(e) => handleCtaButtonHover(e, false)}
            onClick={handleLinkClick}
          >
            시작하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
