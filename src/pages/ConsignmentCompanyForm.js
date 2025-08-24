"use client"

import { useState } from "react"
import styles from "../styles/consignment-company-form.module.css"
import { regions } from "../data/regions"
import { ReactComponent as LocationIcon } from '../assets/위치.svg';

export default function LocationSelector() {
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  const provinces = Object.keys(regions);
  const locations = selectedProvince ? regions[selectedProvince] : [];

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSelectedLocation(""); // Reset location when province changes
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
            <svg width="111" height="111" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2276_1104)">
<circle cx="55.6016" cy="51.9686" r="49.075" fill="white"/>
</g>
<rect x="41.3892" y="28.7295" width="33.7607" height="42.68" rx="4.32947" fill="url(#paint0_linear_2276_1104)"/>
<g filter="url(#filter1_d_2276_1104)">
<rect x="36.0535" y="32.5273" width="33.7607" height="42.68" rx="4.32947" fill="url(#paint1_linear_2276_1104)" fill-opacity="0.79" shape-rendering="crispEdges"/>
</g>
<rect x="41.5049" y="41.0576" width="5.47158" height="5.47331" rx="0.721579" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="41.5049" y="51.041" width="5.47158" height="5.47331" rx="0.721579" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="50.198" y="51.041" width="5.47158" height="5.47331" rx="0.721579" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="41.5049" y="61.0249" width="5.47158" height="5.47331" rx="0.721579" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="50.198" y="61.2041" width="5.47158" height="5.47331" rx="0.721579" fill="#FDFEFF" fill-opacity="0.93"/>
<rect x="58.8911" y="61.2041" width="5.47158" height="5.47331" rx="0.721579" fill="#FDFEFF" fill-opacity="0.93"/>
<defs>
<filter id="filter0_d_2276_1104" x="0.900119" y="0.897058" width="109.403" height="109.403" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="0.907499" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2276_1104"/>
<feOffset dy="3.63"/>
<feGaussianBlur stdDeviation="3.267"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2276_1104"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2276_1104" result="shape"/>
</filter>
<filter id="filter1_d_2276_1104" x="34.1052" y="29.8575" width="40.5435" height="49.463" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1.44316" dy="0.721579"/>
<feGaussianBlur stdDeviation="1.69571"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2276_1104"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2276_1104" result="shape"/>
</filter>
<linearGradient id="paint0_linear_2276_1104" x1="41.3892" y1="28.7295" x2="71.4212" y2="71.4095" gradientUnits="userSpaceOnUse">
<stop offset="0.0769231" stop-color="#36B7FF"/>
<stop offset="0.490385" stop-color="#317BE7"/>
<stop offset="1" stop-color="#1A498E"/>
</linearGradient>
<linearGradient id="paint1_linear_2276_1104" x1="37.4494" y1="34.0681" x2="123.584" y2="157.683" gradientUnits="userSpaceOnUse">
<stop stop-color="#DBECFA"/>
<stop offset="1" stop-color="#3A8ACD"/>
</linearGradient>
</defs>
</svg>
          
          <h1 className={styles.title}>위판장 정보 입력</h1>
        </div>

    <div className={styles.whiteContainer}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>위판장 지역 선택</h2>

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
              <p className={styles.emptyStateText}>위 지역 탭을 선택하여 위판장을 선택해주세요</p>
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