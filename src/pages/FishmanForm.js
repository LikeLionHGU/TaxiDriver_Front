"use client"

import { useState } from "react"
import styles from "../styles/consignment-company-form.module.css"
import { regions } from "../data/regions"

import { ReactComponent as LocationIcon } from '../assets/위치.svg';

export default function LocationSelector() {
  const [selectedProvince, setSelectedProvince] = useState("") // 빈 문자열로 초기화
  const [selectedLocation, setSelectedLocation] = useState("") // 빈 문자열로 초기화

  const provinces = Object.keys(regions);

  // 선택된 도에 따른 위판장 목록
  const currentLocations = selectedProvince ? regions[selectedProvince] : []

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province)
    setSelectedLocation("") // 도가 바뀌면 선택된 위판장 초기화
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2678_1057)">
              <circle cx="55.2032" cy="51.2967" r="49.075" fill="white"/>
            </g>
            <g filter="url(#filter1_f_2678_1057)">
              <circle cx="58.5854" cy="37.4539" r="9.71759" fill="url(#paint0_linear_2678_1057)"/>
            </g>
            <g filter="url(#filter2_f_2678_1057)">
              <path d="M66.4686 47.5625C70.2348 47.5625 73.2878 50.6157 73.288 54.3818V67.8633C73.2879 68.6164 72.6778 69.2274 71.9247 69.2275H45.246C44.4927 69.2275 43.8818 68.6165 43.8817 67.8633V54.3818C43.8819 50.6158 46.9351 47.5627 50.701 47.5625H51.8085C53.6035 48.8572 55.9796 49.6455 58.5858 49.6455C61.192 49.6455 63.5681 48.8571 65.3632 47.5625H66.4686Z" fill="url(#paint1_linear_2678_1057)"/>
            </g>
            <g opacity="0.84" filter="url(#filter3_f_2678_1057)">
              <circle cx="51.8222" cy="39.2869" r="9.71759" fill="#DBECFA"/>
              <path d="M59.7053 49.3955C63.4715 49.3956 66.5246 52.4487 66.5247 56.2148V69.6963C66.5245 70.4494 65.9136 71.0596 65.1604 71.0596H38.4827C37.7295 71.0596 37.1186 70.4494 37.1184 69.6963V56.2148C37.1185 52.4487 40.1716 49.3956 43.9377 49.3955H45.2463C47.0158 50.6052 49.3105 51.3379 51.8196 51.3379C54.3287 51.3379 56.6234 50.6052 58.3928 49.3955H59.7053Z" fill="#DBECFA"/>
            </g>
            <defs>
              <filter id="filter0_d_2678_1057" x="0.501682" y="0.225183" width="109.403" height="109.403" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feMorphology radius="0.907499" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2678_1057"/>
                <feOffset dy="3.63"/>
                <feGaussianBlur stdDeviation="3.267"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2678_1057"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2678_1057" result="shape"/>
              </filter>
              <filter id="filter1_f_2678_1057" x="48.1177" y="26.9862" width="20.9355" height="20.9358" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="0.375074" result="effect1_foregroundBlur_2678_1057"/>
              </filter>
              <filter id="filter2_f_2678_1057" x="43.1316" y="46.8124" width="30.9065" height="23.1653" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="0.375074" result="effect1_foregroundBlur_2678_1057"/>
              </filter>
              <filter id="filter3_f_2678_1057" x="37.0502" y="29.5011" width="29.5426" height="41.6266" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="0.0340976" result="effect1_foregroundBlur_2678_1057"/>
              </filter>
              <linearGradient id="paint0_linear_2678_1057" x1="53.4458" y1="30.526" x2="66.9038" y2="47.1715" gradientUnits="userSpaceOnUse">
                <stop offset="0.0817308" stopColor="#23A9F3"/>
                <stop offset="0.4493" stopColor="#2775E7"/>
                <stop offset="1" stopColor="#164181"/>
              </linearGradient>
              <linearGradient id="paint1_linear_2678_1057" x1="50.0966" y1="47.5625" x2="68.9265" y2="72.0988" gradientUnits="userSpaceOnUse">
                <stop offset="0.0721154" stopColor="#24AAF4"/>
                <stop offset="0.466346" stopColor="#2775E7"/>
                <stop offset="1" stopColor="#164181"/>
              </linearGradient>
            </defs>
          </svg>

          <h1 className={styles.title}>어민 생산자 정보 입력</h1>
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
            <input type="text" placeholder="예: 대게잡이 1호" className={styles.input} />
            <label className={styles.inputLabel}>선주명/대표자명</label>
            <input type="text" placeholder="예: 홍길동" className={styles.input} />
            <label className={styles.inputLabel}>전화번호</label>
            <input type="text" placeholder="010-0000-0000" className={styles.input} />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>취소</button>
            <button 
              className={`${styles.primaryButton} ${!selectedLocation ? styles.primaryButtonDisabled : ""}`}
              disabled={!selectedLocation}
            >
              ✓ 회원가입 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}