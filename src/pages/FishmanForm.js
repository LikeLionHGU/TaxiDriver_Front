"use client"

import { useState } from "react"
import styles from "../styles/consignment-company-form.module.css"

import { ReactComponent as LocationIcon } from '../assets/위치.svg';

export default function LocationSelector() {
  const [selectedProvince, setSelectedProvince] = useState("경상도")
  const [selectedLocation, setSelectedLocation] = useState("포항 구룡포")

  const provinces = ["강원도", "경상도", "경기/인천", "전라도", "제주도", "충청도"]

  const locations = [
    { name: "포항 죽도시장", city: "포항" },
    { name: "포항 구룡포", city: "포항" },
    { name: "부산 자갈치시장", city: "부산" },
    { name: "부산 기장", city: "부산" },
    { name: "통영 중앙시장", city: "통영" },
    { name: "거제 외포항", city: "거제" },
    { name: "울산 울진", city: "울산" },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
        <svg width="111" height="111" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2678_1058)">
<circle cx="55.6016" cy="51.9217" r="49.075" fill="white"/>
</g>
<g filter="url(#filter1_f_2678_1058)">
<path d="M53.9417 50.6729C55.532 51.591 55.532 53.8864 53.9417 54.8045L37.5441 64.2717C35.7479 65.3087 33.5752 63.7175 34.022 61.692L35.5436 54.794C35.8423 53.4401 35.8423 52.0373 35.5436 50.6834L34.022 43.7854C33.5753 41.76 35.7479 40.1687 37.5441 41.2058L53.9417 50.6729Z" fill="url(#paint0_linear_2678_1058)" fill-opacity="0.8"/>
</g>
<g filter="url(#filter2_f_2678_1058)">
<path d="M53.9417 49.587C55.532 50.5051 55.532 52.8004 53.9417 53.7186L37.5441 63.1857C35.7479 64.2228 33.5752 62.6315 34.022 60.6061L35.5436 53.7081C35.8423 52.3542 35.8423 50.9514 35.5436 49.5974L34.022 42.6995C33.5753 40.674 35.7479 39.0827 37.5441 40.1198L53.9417 49.587Z" fill="url(#paint1_linear_2678_1058)" fill-opacity="0.88"/>
</g>
<g filter="url(#filter3_f_2678_1058)">
<path d="M74.769 49.8556C76.3592 50.7737 76.3592 53.0691 74.769 53.9872L45.7885 70.719C43.9923 71.7561 41.8197 70.1648 42.2665 68.1394L45.4661 53.6342C45.715 52.5059 45.715 51.3369 45.4661 50.2086L42.2665 35.7034C41.8197 33.6779 43.9923 32.0867 45.7885 33.1237L74.769 49.8556Z" fill="url(#paint2_linear_2678_1058)" fill-opacity="0.72"/>
</g>
<g filter="url(#filter4_f_2678_1058)">
<path d="M73.5758 49.9096C75.1598 50.8289 75.1598 53.1165 73.5758 54.0358L45.7915 70.1612C43.9965 71.203 41.8194 69.6141 42.2642 67.5868L45.3166 53.677C45.5629 52.5541 45.5629 51.3913 45.3166 50.2684L42.2642 36.3586C41.8194 34.3313 43.9965 32.7424 45.7915 33.7842L73.5758 49.9096Z" fill="white" fill-opacity="0.16"/>
</g>
<g filter="url(#filter5_f_2678_1058)">
<circle cx="63.6478" cy="51.6527" r="2.5287" fill="white" fill-opacity="0.86"/>
</g>
<defs>
<filter id="filter0_d_2678_1058" x="0.900119" y="0.850183" width="109.403" height="109.403" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="0.907499" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2678_1058"/>
<feOffset dy="3.63"/>
<feGaussianBlur stdDeviation="3.267"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2678_1058"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2678_1058" result="shape"/>
</filter>
<filter id="filter1_f_2678_1058" x="28.397" y="35.314" width="32.3033" height="34.8496" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.318052" result="effect1_foregroundBlur_2678_1058"/>
</filter>
<filter id="filter2_f_2678_1058" x="31.5775" y="37.4086" width="25.9423" height="28.4886" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.318052" result="effect1_foregroundBlur_2678_1058"/>
</filter>
<filter id="filter3_f_2678_1058" x="41.4121" y="32.0027" width="35.3447" height="39.8373" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.397565" result="effect1_foregroundBlur_2678_1058"/>
</filter>
<filter id="filter4_f_2678_1058" x="40.6154" y="31.8648" width="35.7386" height="40.2157" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.795129" result="effect1_foregroundBlur_2678_1058"/>
</filter>
<filter id="filter5_f_2678_1058" x="60.483" y="48.4879" width="6.32958" height="6.32982" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.318052" result="effect1_foregroundBlur_2678_1058"/>
</filter>
<linearGradient id="paint0_linear_2678_1058" x1="45.1879" y1="38.499" x2="45.1879" y2="66.9784" gradientUnits="userSpaceOnUse">
<stop stop-color="#1595F6"/>
<stop offset="1" stop-color="#0B289B"/>
</linearGradient>
<linearGradient id="paint1_linear_2678_1058" x1="45.1879" y1="37.4131" x2="45.1879" y2="65.8924" gradientUnits="userSpaceOnUse">
<stop stop-color="#15BAF6"/>
<stop offset="1" stop-color="#2A50E3"/>
</linearGradient>
<linearGradient id="paint2_linear_2678_1058" x1="38.3301" y1="24.8818" x2="61.861" y2="66.7833" gradientUnits="userSpaceOnUse">
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
                onClick={() => setSelectedProvince(province)}
                className={`${styles.provinceTab} ${selectedProvince === province ? styles.provinceTabActive : ""}`}
              >
                {province}
              </button>
            ))}
          </div>
        
        {selectedProvince ? (
          <div className={styles.locationGrid}>
            {locations.map((location, index) => (
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
          ) : (
  <div className={styles.emptyState}>
    <div className={styles.emptyMessage}>위의 지역을 선택하면 거래처가 표시됩니다</div>
  </div>
          )}
        </div>

        <div className={styles.inputSection}>
          <label className={styles.inputLabel}>관리자명</label>
          <input type="text" placeholder="예: 홍길동" className={styles.input} />
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton}>취소</button>
          <button className={styles.primaryButton}>✓ 회원가입 완료</button>
        </div>
      </div>
      </div>
    </div>
  )
}