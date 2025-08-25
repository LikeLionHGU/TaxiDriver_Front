"use client"

import { useState } from "react"
import styles from "../styles/consignment-company-form.module.css"
import { regions } from "../data/regions"
import axios from 'axios';
import { ReactComponent as LocationIcon } from '../assets/위치.svg';
import { useNavigate } from 'react-router-dom';

// axios 기본 설정
axios.defaults.withCredentials = true; // 쿠키 자동 포함
axios.defaults.timeout = 10000; // 10초 타임아웃

export default function LocationSelector() {
  const [selectedProvince, setSelectedProvince] = useState("") // 빈 문자열로 초기화
  const [selectedLocation, setSelectedLocation] = useState("") // 빈 문자열로 초기화
  const [companyName, setCompanyName] = useState('');
  const [personName, setPersonName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const provinces = Object.keys(regions);

  // 선택된 도에 따른 위판장 목록
  const currentLocations = selectedProvince ? regions[selectedProvince] : []

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province)
    setSelectedLocation("") // 도가 바뀌면 선택된 위판장 초기화
  }

  const handleSubmit = async () => {
    if (!personName || !companyName || !phoneNumber || !selectedLocation) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const requestBody = {
      personName,
      companyName,
      phoneNumber,
      location: selectedLocation,
    };

    console.log("=== 어민 생산자(판매자) 회원가입 API 요청 시작 ===");
    console.log('전송 데이터:', requestBody);

    try {
      const response = await axios.post('https://likelion.info/user/signin/seller', requestBody, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log("=== API 응답 성공 ===");
      console.log("응답 상태:", response.status);
      console.log("응답 데이터:", response.data);

      if (response.data === true || response.status === 200) {
        alert('회원가입이 완료되었습니다.');
        navigate('/', { state: { registrationComplete: true } });
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error("=== 어민 생산자(판매자) 회원가입 API 요청 실패 ===");
      console.error("에러 상태:", error.response?.status);
      console.error("에러 데이터:", error.response?.data);
      console.error("에러 메시지:", error.message);
      console.error("전체 에러:", error);
      
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
         <svg width="111" height="111" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3087_1437)">
<circle cx="55.6016" cy="51.9217" r="49.075" fill="white"/>
</g>
<g filter="url(#filter1_f_3087_1437)">
<path d="M53.9417 50.6729C55.532 51.591 55.532 53.8864 53.9417 54.8045L37.5441 64.2717C35.7479 65.3087 33.5752 63.7175 34.022 61.692L35.5436 54.794C35.8423 53.4401 35.8423 52.0373 35.5436 50.6834L34.022 43.7854C33.5753 41.76 35.7479 40.1687 37.5441 41.2058L53.9417 50.6729Z" fill="url(#paint0_linear_3087_1437)" fill-opacity="0.8"/>
</g>
<g filter="url(#filter2_f_3087_1437)">
<path d="M53.9417 49.587C55.532 50.5051 55.532 52.8004 53.9417 53.7186L37.5441 63.1857C35.7479 64.2228 33.5752 62.6315 34.022 60.6061L35.5436 53.7081C35.8423 52.3542 35.8423 50.9514 35.5436 49.5974L34.022 42.6995C33.5753 40.674 35.7479 39.0827 37.5441 40.1198L53.9417 49.587Z" fill="url(#paint1_linear_3087_1437)" fill-opacity="0.88"/>
</g>
<g filter="url(#filter3_f_3087_1437)">
<path d="M74.769 49.8556C76.3592 50.7737 76.3592 53.0691 74.769 53.9872L45.7885 70.719C43.9923 71.7561 41.8197 70.1648 42.2665 68.1394L45.4661 53.6342C45.715 52.5059 45.715 51.3369 45.4661 50.2086L42.2665 35.7034C41.8197 33.6779 43.9923 32.0867 45.7885 33.1237L74.769 49.8556Z" fill="url(#paint2_linear_3087_1437)" fill-opacity="0.72"/>
</g>
<g filter="url(#filter4_f_3087_1437)">
<path d="M73.5758 49.9096C75.1598 50.8289 75.1598 53.1165 73.5758 54.0358L45.7915 70.1612C43.9965 71.203 41.8194 69.6141 42.2642 67.5868L45.3166 53.677C45.5629 52.5541 45.5629 51.3913 45.3166 50.2684L42.2642 36.3586C41.8194 34.3313 43.9965 32.7424 45.7915 33.7842L73.5758 49.9096Z" fill="white" fill-opacity="0.16"/>
</g>
<g filter="url(#filter5_f_3087_1437)">
<circle cx="63.6478" cy="51.6527" r="2.5287" fill="white" fill-opacity="0.86"/>
</g>
<defs>
<filter id="filter0_d_3087_1437" x="0.900119" y="0.850183" width="109.403" height="109.403" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="0.907499" operator="erode" in="SourceAlpha" result="effect1_dropShadow_3087_1437"/>
<feOffset dy="3.63"/>
<feGaussianBlur stdDeviation="3.267"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3087_1437"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3087_1437" result="shape"/>
</filter>
<filter id="filter1_f_3087_1437" x="28.397" y="35.314" width="32.3033" height="34.8496" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.318052" result="effect1_foregroundBlur_3087_1437"/>
</filter>
<filter id="filter2_f_3087_1437" x="31.5775" y="37.4086" width="25.9423" height="28.4886" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.318052" result="effect1_foregroundBlur_3087_1437"/>
</filter>
<filter id="filter3_f_3087_1437" x="41.4121" y="32.0027" width="35.3447" height="39.8373" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.397565" result="effect1_foregroundBlur_3087_1437"/>
</filter>
<filter id="filter4_f_3087_1437" x="40.6154" y="31.8648" width="35.7386" height="40.2157" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.795129" result="effect1_foregroundBlur_3087_1437"/>
</filter>
<filter id="filter5_f_3087_1437" x="60.483" y="48.4879" width="6.32958" height="6.32982" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.318052" result="effect1_foregroundBlur_3087_1437"/>
</filter>
<linearGradient id="paint0_linear_3087_1437" x1="45.1879" y1="38.499" x2="45.1879" y2="66.9784" gradientUnits="userSpaceOnUse">
<stop stop-color="#1595F6"/>
<stop offset="1" stop-color="#0B289B"/>
</linearGradient>
<linearGradient id="paint1_linear_3087_1437" x1="45.1879" y1="37.4131" x2="45.1879" y2="65.8924" gradientUnits="userSpaceOnUse">
<stop stop-color="#15BAF6"/>
<stop offset="1" stop-color="#2A50E3"/>
</linearGradient>
<linearGradient id="paint2_linear_3087_1437" x1="38.3301" y1="24.8818" x2="61.861" y2="66.7833" gradientUnits="userSpaceOnUse">
<stop stop-color="#DFF1FF"/>
<stop offset="1" stop-color="#A7CFEF"/>
</linearGradient>
</defs>
</svg>

          <h1 className={styles.title}>어민 생산자 정보 입력</h1>
        </div>

        <div className={styles.whiteContainer}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>거래 위판장 지역</h2>

            <div className={styles.provinceTabsContainer}>
              {provinces.map((province) => (
                <button
                  key={province}
                  onClick={() => handleProvinceSelect(province)}
                  className={`${styles.provinceTab} ${selectedProvince === province ? styles.provinceTabActive : ""}`}
                >
                  {province}
                </button>
              ))}
            </div>

            {/* 도가 선택되었을 때만 위판장 목록 표시 */}
            {selectedProvince && (
              <div className={styles.locationGrid}>
                {currentLocations.map((location, index) => (
                  <div
                    key={index}
                    className={`${styles.locationCard} ${selectedLocation === location.name ? styles.locationCardSelected : ""}`}
                    onClick={() => setSelectedLocation(location.name)}
                  >
                    <div className={styles.locationCardContent}>
                      <LocationIcon className={styles.locationIcon} />
                      <div className={styles.locationInfo}>
                        <div className={`${styles.locationName} ${selectedLocation === location.name ? styles.locationNameSelected : ""}`}>
                          {location.name}
                        </div>
                        <div className={styles.locationCity}>{location.city}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 도가 선택되지 않았을 때 안내 메시지 */}
            {!selectedProvince && (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateText}>위 지역 탭을 선택하여 위판장을 선택해주세요</p>
              </div>
            )}
          </div>

          <div className={styles.inputSection}>
            <label className={styles.inputLabel}>선박명/업체명</label>
            <input type="text" placeholder="예: 대게잡이 1호" className={styles.input} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            <label className={styles.inputLabel}>선주명/대표자명</label>
            <input type="text" placeholder="예: 홍길동" className={styles.input} value={personName} onChange={(e) => setPersonName(e.target.value)} />
            <label className={styles.inputLabel}>전화번호</label>
            <input type="text" placeholder="010-0000-0000" className={styles.input} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>취소</button>
            <button 
              className={`${styles.primaryButton} ${!selectedLocation ? styles.primaryButtonDisabled : ""}`}
              disabled={!selectedLocation}
              onClick={handleSubmit}
            >
              ✓ 회원가입 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
