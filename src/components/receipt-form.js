"use client"

import { useState, useRef } from "react"
import styles from "./styles/receipt-form.module.css"
import fishIcon from "../assets/수산물.svg"

export function ReceiptForm() {
  const [statusType, setStatusType] = useState("live")
  const [saleType, setSaleType] = useState("weight")
  const [packUnit, setPackUnit] = useState("sp")      // sp | box | net
  const [sizeUnit, setSizeUnit] = useState("L")       // L | M | S
  const [specPerFish, setSpecPerFish] = useState("")  // 중량판매: 마리당 kg
  const [totalCount, setTotalCount] = useState(0)

  // ── 업로드 관련 상태 ─────────────────────────────────────────────
  const MAX_FILES = 6
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED = ["image/jpeg", "image/png"]

  const [images, setImages] = useState([]) // [{file, url, status:'ready'|'uploading'|'done'|'error', serverUrl?}]
  const [uploadMessage, setUploadMessage] = useState("")
  const fileInputRef = useRef(null)

  const unitLabel = packUnit === "sp" ? "S/P" : packUnit === "box" ? "Box" : "그물망"
  const inc = () => setTotalCount(v => v + 1)
  const dec = () => setTotalCount(v => Math.max(0, v - 1))

  // 파일 추가(검증 포함) + 즉시 업로드
  function addFiles(fileList) {
    const current = images.length
    const incoming = Array.from(fileList)

    // 남은 슬롯
    const remain = Math.max(0, MAX_FILES - current)
    let accepted = []
    const rejected = []

    for (const f of incoming.slice(0, remain)) {
      if (!ALLOWED.includes(f.type)) {
        rejected.push(`${f.name}: JPG/PNG만 가능`)
        continue
      }
      if (f.size > MAX_SIZE) {
        rejected.push(`${f.name}: 10MB 초과`)
        continue
      }
      accepted.push(f)
    }

    if (rejected.length) setUploadMessage(rejected.join("\n"))
    if (!accepted.length) return

    // 미리보기 + 업로드 상태 세팅
    const newItems = accepted.map(f => ({
      file: f,
      url: URL.createObjectURL(f),
      status: "uploading",
    }))

    setImages(prev => {
      const next = [...prev, ...newItems]
      // 업로드 비동기 시작
      newItems.forEach(item => uploadOne(item))
      return next
    })
  }

  // 단일 파일 업로드
  async function uploadOne(item) {
    try {
      const form = new FormData()
      form.append("file", item.file)

      // 필요시 추가 메타데이터도 함께 전송 가능
      // form.append("statusType", statusType)
      // form.append("saleType", saleType)

      const res = await fetch("/api/uploads", {
        method: "POST",
        body: form,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json() // { url: "..."} 형태라고 가정

      setImages(prev =>
        prev.map(x =>
          x.url === item.url ? { ...x, status: "done", serverUrl: data?.url } : x
        )
      )
    } catch (e) {
      console.warn("업로드 실패:", e)
      setImages(prev =>
        prev.map(x => (x.url === item.url ? { ...x, status: "error" } : x))
      )
    }
  }

  // 파일 선택/드랍 핸들러
  const onPick = e => {
    if (!e.target.files?.length) return
    addFiles(e.target.files)
    e.target.value = "" // 같은 파일 재선택 가능하게 리셋
  }
  const onDrop = e => {
    e.preventDefault()
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }
  const onDragOver = e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
  }

  const removeImage = url => {
    setImages(prev => {
      const next = prev.filter(x => x.url !== url)
      // 메모리 누수 방지
      const removed = prev.find(x => x.url === url)
      if (removed) URL.revokeObjectURL(removed.url)
      return next
    })
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
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
          {/* Left */}
          <div className={styles.formSection}>
            {/* 어종 선택 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>어종 선택</label>
              <div className={styles.searchContainer}>
                <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="어종명을 입력하세요."
                  className={`${styles.input} ${styles.searchInput}`}
                  style={{ width: "500px" }}
                />
              </div>
            </div>

            {/* 상태 선택 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>상태 선택</label>
              <div className={styles.toggleGroup}>
                <button type="button" onClick={() => setStatusType("live")}
                        className={`${styles.toggleCardSmall} ${statusType === "live" ? styles.toggleActive : ""}`}>
                  <span className={styles.toggleTitle}>활어</span>
                  <span className={styles.toggleDesc}>살아있는 상태</span>
                </button>
                <button type="button" onClick={() => setStatusType("fresh")}
                        className={`${styles.toggleCardSmall} ${statusType === "fresh" ? styles.toggleActive : ""}`}>
                  <span className={styles.toggleTitle}>선어</span>
                  <span className={styles.toggleDesc}>신선 냉장 상태</span>
                </button>
                <button type="button" onClick={() => setStatusType("frozen")}
                        className={`${styles.toggleCardSmall} ${statusType === "frozen" ? styles.toggleActive : ""}`}>
                  <span className={styles.toggleTitle}>냉동</span>
                  <span className={styles.toggleDesc}>급속 냉동 상태</span>
                </button>
              </div>
            </div>

            {/* 판매 방식 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>판매 방식</label>
              <div className={styles.toggleGroup}>
                <button type="button" onClick={() => setSaleType("weight")}
                        className={`${styles.toggleCard} ${saleType === "weight" ? styles.toggleActive : ""}`}>
                  <span className={styles.toggleTitle}>중량 판매</span>
                  <span className={styles.toggleDesc}>kg 단위로 판매</span>
                </button>
                <button type="button" onClick={() => setSaleType("package")}
                        className={`${styles.toggleCardLarge} ${saleType === "package" ? styles.toggleActive : ""}`}>
                  <span className={styles.toggleTitle}>포장 판매</span>
                  <span className={styles.toggleDesc}>박스/S/P 단위</span>
                </button>
              </div>
            </div>

            {/* 중량 판매 필드 */}
            {saleType === "weight" && (
              <>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>규격 (마리당 kg)</label>
                  <input
                    type="text"
                    value={specPerFish}
                    onChange={e => setSpecPerFish(e.target.value)}
                    placeholder="예: 4 (마리당 4kg)"
                    className={styles.input}
                    style={{ width: "100%", paddingLeft: 12 }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>총 수량</label>
                  <div className={styles.stepper}>
                    <button type="button" className={styles.stepperBtn} onClick={dec}>−</button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={totalCount}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^0-9]/g, "")
                        setTotalCount(v === "" ? 0 : parseInt(v, 10))
                      }}
                      className={styles.stepperInput}
                    />
                    <button type="button" className={styles.stepperBtn} onClick={inc}>＋</button>
                  </div>
                </div>
              </>
            )}

            {/* 포장 판매 필드 */}
            {saleType === "package" && (
              <>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>포장 단위</label>
                  <div className={styles.chipGroup}>
                    <button type="button" onClick={() => setPackUnit("sp")}
                            className={`${styles.chip} ${packUnit === "sp" ? styles.chipActive : ""}`}>S/P</button>
                    <button type="button" onClick={() => setPackUnit("box")}
                            className={`${styles.chip} ${packUnit === "box" ? styles.chipActive : ""}`}>Box</button>
                    <button type="button" onClick={() => setPackUnit("net")}
                            className={`${styles.chip} ${packUnit === "net" ? styles.chipActive : ""}`}>그물망</button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>크기 단위</label>
                  <div className={styles.chipGroup}>
                    <button type="button" onClick={() => setSizeUnit("L")}
                            className={`${styles.chip} ${sizeUnit === "L" ? styles.chipActive : ""}`}>대</button>
                    <button type="button" onClick={() => setSizeUnit("M")}
                            className={`${styles.chip} ${sizeUnit === "M" ? styles.chipActive : ""}`}>중</button>
                    <button type="button" onClick={() => setSizeUnit("S")}
                            className={`${styles.chip} ${sizeUnit === "S" ? styles.chipActive : ""}`}>소</button>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>총 수량 ({unitLabel})</label>
                  <div className={styles.stepper}>
                    <button type="button" className={styles.stepperBtn} onClick={dec}>−</button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={totalCount}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^0-9]/g, "")
                        setTotalCount(v === "" ? 0 : parseInt(v, 10))
                      }}
                      className={styles.stepperInput}
                    />
                    <button type="button" className={styles.stepperBtn} onClick={inc}>＋</button>
                  </div>
                </div>
              </>
            )}

            {/* ── 사진 업로드 ───────────────────────────────────────── */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>사진 업로드</label>

              <div
                className={styles.uploadArea}
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                <div className={styles.uploadInner}>
                  <div className={styles.uploadIcon} aria-hidden>⤴</div>
                  <p className={styles.uploadText}>
                    수산물 이미지를 드래그하여 놓거나 클릭하여 업로드하세요<br/>
                    JPG, PNG 파일만 업로드 가능합니다(최대 10MB, 최대 {MAX_FILES}장)
                  </p>

                  <button
                    type="button"
                    className={styles.uploadButton}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= MAX_FILES}
                  >
                    파일 선택하기
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    accept="image/jpeg,image/png"
                    multiple
                    onChange={onPick}
                  />
                </div>
              </div>

              {uploadMessage && (
                <p className={styles.uploadWarning}>{uploadMessage}</p>
              )}

              {images.length > 0 && (
                <div className={styles.thumbGrid}>
                  {images.map(img => (
                    <div key={img.url} className={styles.thumb}>
                      <img src={img.url} alt="" className={styles.thumbImg} />
                      <button
                        type="button"
                        className={styles.thumbRemove}
                        onClick={() => removeImage(img.url)}
                        aria-label="삭제"
                      >
                        ×
                      </button>
                      {img.status !== "done" && (
                        <span
                          className={
                            img.status === "uploading"
                              ? styles.badgeUploading
                              : styles.badgeError
                          }
                        >
                          {img.status === "uploading" ? "업로드 중…" : "실패"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* ─────────────────────────────────────────────────────── */}
          </div>

          {/* Right - 가격 정보 */}
          <div className={styles.priceSection}>
            <h3 className={styles.priceTitle}>가격 정보</h3>
            <div className={styles.priceList}>
              <div className={styles.priceItem}><span className={styles.priceLabel}>상품 배송료</span><span className={styles.priceValue}>₩25,000</span></div>
              <div className={styles.priceItem}><span className={styles.priceLabel}>할인 가격 할인</span><span className={styles.priceValue}>₩13,000</span></div>
              <div className={styles.priceItem}><span className={styles.priceLabel}>총금 요금료</span><span className={styles.priceValue}>₩11,000</span></div>
              <hr className={styles.priceDivider} />
              <div className={styles.totalItem}><span className={styles.totalLabel}>최저 수락가</span><span className={styles.totalValue}>₩49,000</span></div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
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
