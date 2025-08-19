"use client"

import { useState } from "react"
import styles from "./styles/receipt-form.module.css"
import fishIcon from "../assets/수산물.svg" 

export function ReceiptForm() {
  const [selectedDay, setSelectedDay] = useState("")

  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <img src={fishIcon} alt="수산물 아이콘" className={styles.iconImg} />
          </div>
          <div>
            <h1 className={styles.title}>수산물 등록</h1>
            <p className={styles.subtitle}>내가 잡은 수산물을 등록해 경매에 참여하세요.</p>
          </div>
        </div>
      <div className={styles.card}>

        <div className={styles.grid}>
          {/* Left side - Form */}
          <div className={styles.formSection}>
            {/* Search Section */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>어종 선택</label>
              <div className={styles.searchContainer}>
                <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                type="text"
                placeholder="어종명을 입력하세요."
                className={`${styles.input} ${styles.searchInput}`}
                style={{ width: "500px" }}
                />

              </div>
            </div>

            {/* Form Fields */}
            <div className={styles.formFields}>
              <div className={styles.inputGroup}>
                <label className={styles.label} >포장 단위 설정</label>
                <div className={styles.fieldGrid}>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className={styles.select}
                    style={{ width: "233px" }}
                  >
                    <option value="">포장 종류</option>
                    <option value="monday">박스</option>
                    <option value="tuesday">스티로폼</option>
                    <option value="wednesday">바스켓</option>
                    <option value="thursday">미(마리)</option>
                    <option value="friday">Kg</option>
                  </select>
                  <input type="text" placeholder="수량 또는 무게 입력" className={styles.input} />
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>사진 업로드</label>
              <div className={styles.uploadArea}>
                <p className={styles.uploadText}>사진을 업로드하세요</p>
              </div>
            </div>
          </div>

          {/* Right side - Pricing Breakdown */}
          <div className={styles.priceSection}>
            <div>
              <h3 className={styles.priceTitle}>가격 정보</h3>
              <div className={styles.priceList}>
                <div className={styles.priceItem}>
                  <span className={styles.priceLabel}>상품 배송료</span>
                  <span className={styles.priceValue}>₩25,000</span>
                </div>
                <div className={styles.priceItem}>
                  <span className={styles.priceLabel}>할인 가격 할인</span>
                  <span className={styles.priceValue}>₩13,000</span>
                </div>
                <div className={styles.priceItem}>
                  <span className={styles.priceLabel}>총금 요금료</span>
                  <span className={styles.priceValue}>₩11,000</span>
                </div>
                <hr className={styles.priceDivider} />
                <div className={styles.totalItem}>
                  <span className={styles.totalLabel}>최저 수락가</span>
                  <span className={styles.totalValue}>₩49,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actionSection}>
          <div className={styles.actionButtons}>
            <button className={styles.cancelButton}>취소</button>
            <button className={styles.submitButton}>등록 완료</button>
          </div>
        </div>
      </div>
    </div>
  )
}
