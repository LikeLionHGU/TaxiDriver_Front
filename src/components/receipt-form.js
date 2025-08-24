"use client"

import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import '../components/styles/receipt-form.module.css';

const fishSpeciesData = [
  "고등어",
  "삼치",
  "전어",
  "갈치",
  "방어",
  "참치",
  "연어",
  "광어",
  "우럭",
  "농어",
  "도미",
  "볼락",
  "조기",
  "민어",
  "부세",
  "가자미",
  "넙치",
  "양미리",
  "멸치",
  "정어리",
]

const fishList = fishSpeciesData

const HANGUL_START_CODE = 44032 // '가'
const CHOSUNG_LIST = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
]

function getChosung(char) {
  const code = char.charCodeAt(0)
  if (code >= HANGUL_START_CODE) {
    const chosungIndex = Math.floor((code - HANGUL_START_CODE) / 588)
    return CHOSUNG_LIST[chosungIndex]
  }
  return char
}

function consonantSearch(query, word) {
  if (!query) {
    return true
  }

  // Check for direct match first
  if (word.includes(query)) {
    return true
  }

  // Then check for consonant match
  let wordChosung = ""
  for (let i = 0; i < word.length; i++) {
    wordChosung += getChosung(word[i])
  }

  return wordChosung.includes(query)
}

export default function ReceiptForm() {
  // 초기 상태를 빈 값으로 변경
  const [statusType, setStatusType] = useState("") // "live" -> ""
  const [saleType, setSaleType] = useState("") // "weight" -> ""
  const [packUnit, setPackUnit] = useState("sp") // sp | box | net
  const [sizeUnit, setSizeUnit] = useState("L") // L | M | S
  const [specPerFish, setSpecPerFish] = useState("") // 중량판매: 마리당 kg
  const [totalCount, setTotalCount] = useState(0)
  const [minPrice, setMinPrice] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [unitPrice, setUnitPrice] = useState("")

  // Autocomplete state
  const [fishQuery, setFishQuery] = useState("")
  const [filteredFish, setFilteredFish] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedFish, setSelectedFish] = useState(null)
  const searchContainerRef = useRef(null)

  // ── 업로드 관련 상태 ─────────────────────────────────────────────
  const MAX_FILES = 6
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED = ["image/jpeg", "image/png"]

  const [images, setImages] = useState([]) // [{file, url, status:'ready'|'uploading'|'done'|'error', serverUrl?}]
  const [uploadMessage, setUploadMessage] = useState("")
  const fileInputRef = useRef(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false)

  const unitLabel = packUnit === "sp" ? "S/P" : packUnit === "box" ? "Box" : "그물망"
  const inc = () => {
    if (packUnit === "sp" || packUnit === "box") {
      setQuantity((v) => v + 1)
    } else {
      setTotalCount((v) => v + 1)
    }
  }

  const dec = () => {
    if (packUnit === "sp" || packUnit === "box") {
      setQuantity((v) => Math.max(0, v - 1))
    } else {
      setTotalCount((v) => Math.max(0, v - 1))
    }
  }

  // 파일 추가(검증 포함) + 즉시 업로드
  function addFiles(fileList) {
    const current = images.length
    const incoming = Array.from(fileList)

    // 남은 슬롯
    const remain = Math.max(0, MAX_FILES - current)
    const accepted = []
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
    const newItems = accepted.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      status: "uploading",
    }))

    setImages((prev) => {
      const next = [...prev, ...newItems]
      // 업로드 비동기 시작
      newItems.forEach((item) => uploadOne(item))
      return next
    })
  }

  // 단일 파일 업로드
  async function uploadOne(item) {
    try {
      const form = new FormData()
      form.append("file", item.file)

      // 실제 업로드 API가 없으므로 임시로 성공으로 처리
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setImages((prev) => prev.map((x) => (x.url === item.url ? { ...x, status: "done", serverUrl: "/mock-url" } : x)))
    } catch (e) {
      console.warn("업로드 실패:", e)
      setImages((prev) => prev.map((x) => (x.url === item.url ? { ...x, status: "error" } : x)))
    }
  }

  // 파일 선택/드랍 핸들러
  const onPick = (e) => {
    if (!e.target.files?.length) return
    addFiles(e.target.files)
    e.target.value = "" // 같은 파일 재선택 가능하게 리셋
  }
  const onDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }
  const onDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
  }

  const removeImage = (url) => {
    setImages((prev) => {
      const next = prev.filter((x) => x.url !== url)
      // 메모리 누수 방지
      const removed = prev.find((x) => x.url === url)
      if (removed) URL.revokeObjectURL(removed.url)
      return next
    })
  }

  const handleFishInputChange = (e) => {
    const query = e.target.value
    setFishQuery(query)
    if (query) {
      const results = fishList.filter((fish) => consonantSearch(query, fish))
      setFilteredFish(results)
      setIsDropdownOpen(true)
    } else {
      setFilteredFish([])
      setIsDropdownOpen(false)
    }
  }

  const handleFishSelect = (fish) => {
    setSelectedFish(fish)
    setFishQuery("")
    setFilteredFish([])
    setIsDropdownOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isDropdownOpen && filteredFish.length > 0) {
        handleFishSelect(filteredFish[0])
      }
    }
  }

  const removeSelectedFish = () => {
    setSelectedFish(null)
  }

  const [submissionStatus, setSubmissionStatus] = useState(null) // 'success' or 'failure'

  const handleSubmit = () => {
    // Basic validation before opening the confirmation modal
    if (!selectedFish || !statusType || !saleType || !minPrice) {
      alert("모든 필수 정보를 입력해주세요.")
      return
    }

    // Construct the message for the confirmation modal
    

    // Update the modal message state if you have one, or pass it directly
    // For now, I'll assume the modal content is dynamically generated or updated.
    // You might need to add a state for modal message if it's not already dynamic.
    // For this example, I'll directly use the message in the modal's render.
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSubmissionStatus(null) // Reset status when closing modal
  }

  const handleConfirm = async () => {
    setIsModalOpen(false) // Close the confirmation modal

    const payload = {
      name: selectedFish,
      fishStatus: statusType,
      salesMethod: saleType,
      fishCount: 0,
      fishWeight: "",
      reservePrice: Number(minPrice),
    }

    if (saleType === "weight") {
      payload.fishCount = totalCount
      payload.fishWeight = `${specPerFish}kg`
    } else if (saleType === "package") {
      if (packUnit === "sp" || packUnit === "box") {
        payload.fishCount = quantity
        payload.fishWeight = `${unitPrice}원/${packUnit}`
      } else if (packUnit === "net") {
        payload.fishCount = totalCount
        payload.fishWeight = sizeUnit
      }
    }

    try {
      const response = await axios.post("https://likelion.info/post/add", payload);

      if (response.data.isSuccess === 1) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("failure");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("failure");
    } finally {
      setIsCompletionModalOpen(true); // Open the completion modal regardless of success/failure
    }
  }

  const closeCompletionModal = () => {
    setIsCompletionModalOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchContainerRef])

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "24px",
      padding: "20px",
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    iconContainer: {
      flexShrink: 0,
    },
    iconImg: {
      width: "48px",
      height: "48px",
      borderRadius: "8px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1f2937",
      margin: "0 0 4px 0",
    },
    subtitle: {
      fontSize: "14px",
      color: "#6b7280",
      margin: 0,
    },
    card: {
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      padding: "24px",
    },
    formSection: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      textAlign: "left",
    },
    priceSection: {
      background: "#f9fafb",
      padding: "20px",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
    },
    priceTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1f2937",
      margin: "0 0 16px 0",
      textAlign: "left",
    },
    priceList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      flex: 1,
    },
    priceItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 0",
    },
    priceLabel: {
      fontSize: "13px",
      color: "#6b7280",
    },
    priceValue: {
      fontSize: "13px",
      fontWeight: "500",
      color: "#1f2937",
    },
    priceDivider: {
      border: "none",
      borderTop: "1px solid #e5e7eb",
      margin: "12px 0",
    },
    totalItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "8px",
    },
    totalLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1f2937",
    },
    totalValue: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#3b82f6",
    },
    priceImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
      marginTop: "16px",
      border: "1px solid #e5e7eb",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "4px",
      textAlign: "left",
    },
    input: {
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "13px",
      transition: "border-color 0.2s",
      background: "white",
    },
    inputFocus: {
      outline: "none",
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    },
    searchContainer: {
      position: "relative",
    },
    searchInput: {
      paddingLeft: "36px",
      minWidth: "300px",
      width: "92%",
    },
    searchIcon: {
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "16px",
      height: "16px",
      color: "#9ca3af",
    },
    autocompleteDropdown: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      background: "white",
      border: "1px solid #d1d5db",
      borderTop: "none",
      borderRadius: "0 0 6px 6px",
      maxHeight: "200px",
      overflowY: "auto",
      zIndex: 10,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    autocompleteItem: {
      padding: "10px 12px",
      cursor: "pointer",
      borderBottom: "1px solid #f3f4f6",
      fontSize: "13px",
    },
    selectedFish: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "#eff6ff",
      color: "#1d4ed8",
      padding: "6px 10px",
      borderRadius: "16px",
      fontSize: "12px",
      fontWeight: "500",
      marginTop: "4px",
    },
    toggleGroup: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },
    toggleCard: {
      flex: 1,
      minWidth: "100px",
      padding: "12px",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      background: "white",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      textAlign: "center",
    },
    toggleCardSmall: {
      flex: 1,
      minWidth: "80px",
      padding: "12px",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      background: "white",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      textAlign: "center",
    },
    toggleCardLarge: {
      flex: 1,
      minWidth: "120px",
      padding: "12px",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      background: "white",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      textAlign: "center",
    },
    toggleActive: {
      borderColor: "#3b82f6",
      background: "#eff6ff",
    },
    toggleTitle: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#1f2937",
    },
    toggleDesc: {
      fontSize: "11px",
      color: "#6b7280",
      lineHeight: "1.3",
    },
    chipGroup: {
      display: "flex",
      gap: "6px",
      flexWrap: "wrap",
    },
    chip: {
      padding: "6px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "16px",
      background: "white",
      cursor: "pointer",
      fontSize: "12px",
      transition: "all 0.2s",
      fontWeight: "500",
    },
    chipActive: {
      background: "#3b82f6",
      color: "white",
      borderColor: "#3b82f6",
    },
    stepper: {
      width: "100%",
      height: "40px",
      position: "relative",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      background: "#FFF",
      display: "flex",
      alignItems: "center",
      transition: "border-color 0.2s",
    },
    stepperInput: {
      flex: 1,
      padding: "8px 12px",
      border: "none",
      background: "transparent",
      textAlign: "left",
      fontSize: "13px",
      outline: "none",
      paddingRight: "80px",
    },
    stepperButtons: {
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      gap: "4px",
    },
    stepperBtn: {
      width: "32px",
      height: "32px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      background: "white",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
    },
    uploadArea: {
      border: "2px dashed #d1d5db",
      borderRadius: "6px",
      padding: "40px",
      textAlign: "center",
      transition: "border-color 0.2s",
      background: "#fafafa",
      width: "100%",
      boxSizing: "border-box",
      maxWidth: "100%",
      minHeight: "300px",
    },
    uploadInner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
    },
    uploadIcon: {
      width: "48px",
      height: "48px",
      color: "#9ca3af",
    },
    uploadText: {
      color: "#6b7280",
      fontSize: "14px",
      lineHeight: "1.4",
      margin: 0,
      maxWidth: "400px",
    },
    uploadButton: {
      padding: "12px 24px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    thumbGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: "16px",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
    },
    thumb: {
      position: "relative",
      aspectRatio: "1",
      borderRadius: "6px",
      overflow: "hidden",
      border: "1px solid #e5e7eb",
    },
    thumbImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    thumbRemove: {
      position: "absolute",
      top: "4px",
      right: "4px",
      width: "24px",
      height: "24px",
      background: "rgba(0, 0, 0, 0.7)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    addMoreImagesButton: {
      aspectRatio: "1",
      border: "2px dashed #d1d5db",
      borderRadius: "6px",
      background: "#f9fafb",
      cursor: "pointer",
      fontSize: "24px",
      color: "#9ca3af",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
    },
    badgeUploading: {
      position: "absolute",
      bottom: "4px",
      left: "4px",
      right: "4px",
      background: "rgba(0, 0, 0, 0.8)",
      color: "white",
      fontSize: "10px",
      padding: "3px 6px",
      borderRadius: "3px",
      textAlign: "center",
    },
    badgeError: {
      position: "absolute",
      bottom: "4px",
      left: "4px",
      right: "4px",
      background: "rgba(239, 68, 68, 0.9)",
      color: "white",
      fontSize: "10px",
      padding: "3px 6px",
      borderRadius: "3px",
      textAlign: "center",
    },
    uploadWarning: {
      color: "#dc2626",
      fontSize: "12px",
      marginTop: "12px",
      whiteSpace: "pre-line",
    },
    actionSection: {
      borderTop: "1px solid #e5e7eb",
      padding: "16px 24px",
      background: "#f9fafb",
    },
    actionButtons: {
      display: "flex",
      gap: "8px",
      justifyContent: "flex-end",
    },
    cancelButton: {
      marginRight: "30px",
      width: "538.146px",
      height: "47.045px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      background: "white",
      color: "#374151",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    submitButton: {
      marginRight: "30px",
      width: "538.146px",
      height: "47.045px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    popularFishContent: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      backgroundColor: "#f9fafb",
    },
    popularFishText: {
      fontSize: "13px",
      color: "#6b7280",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "32px",
      width: "260px",
      maxWidth: "90vw",
      textAlign: "center",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    modalIcon: {
      width: "48px",
      height: "48px",
      backgroundColor: "#3b82f6",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px",
    },
    modalTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "12px",
    },
    modalMessage: {
      fontSize: "14px",
      color: "#6b7280",
      lineHeight: "1.5",
      marginBottom: "8px",
    },
    modalSubMessage: {
      fontSize: "12px",
      color: "#9ca3af",
      marginBottom: "24px",
    },
    modalButtons: {
      display: "flex",
      gap: "12px",
      justifyContent: "center",
    },
    modalCancelButton: {
      padding: "8px 24px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      backgroundColor: "white",
      color: "#374151",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
    },
    modalConfirmButton: {
      padding: "8px 24px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#3b82f6",
      color: "white",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.grid}>
          {/* Left */}
          <div style={styles.formSection}>
            {/* 어종 선택 */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>어종 선택</label>
              <div style={styles.searchContainer} ref={searchContainerRef}>
                <svg style={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  style={{ ...styles.input, ...styles.searchInput }}
                  value={fishQuery}
                  onChange={handleFishInputChange}
                  onFocus={() => setIsDropdownOpen(true)}
                  onKeyDown={handleKeyDown}
                />
                {isDropdownOpen && filteredFish.length > 0 && (
                  <div style={styles.autocompleteDropdown}>
                    {filteredFish.map((fish, index) => (
                      <div
                        key={index}
                        style={styles.autocompleteItem}
                        onClick={() => handleFishSelect(fish)}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9fafb")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                      >
                        {fish}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {selectedFish && (
                <div style={styles.selectedFish}>
                  <span>{selectedFish}</span>
                  <button
                    onClick={removeSelectedFish}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1d4ed8",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: 0,
                      marginLeft: "2px",
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* 인기 어종 */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>인기 어종</label>
              <div style={styles.popularFishContent}>
                <p style={styles.popularFishText}>인기 어종이 여기에 표시됩니다.</p>
              </div>
            </div>

            {/* 상태 선택 */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>상태 선택</label>
              <div style={styles.toggleGroup}>
                <button
                  type="button"
                  onClick={() => setStatusType("live")}
                  style={{
                    ...styles.toggleCardSmall,
                    ...(statusType === "live" ? styles.toggleActive : {}),
                  }}
                >
                  <span style={styles.toggleTitle}>활어</span>
                  <span style={styles.toggleDesc}>살아있는 상태</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStatusType("fresh")}
                  style={{
                    ...styles.toggleCardSmall,
                    ...(statusType === "fresh" ? styles.toggleActive : {}),
                  }}
                >
                  <span style={styles.toggleTitle}>선어</span>
                  <span style={styles.toggleDesc}>신선 냉장 상태</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStatusType("frozen")}
                  style={{
                    ...styles.toggleCardSmall,
                    ...(statusType === "frozen" ? styles.toggleActive : {}),
                  }}
                >
                  <span style={styles.toggleTitle}>냉동</span>
                  <span style={styles.toggleDesc}>급속 냉동 상태</span>
                </button>
              </div>
            </div>

            {/* 판매 방식 */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>판매 방식</label>
              <div style={styles.toggleGroup}>
                <button
                  type="button"
                  onClick={() => setSaleType("weight")}
                  style={{
                    ...styles.toggleCard,
                    ...(saleType === "weight" ? styles.toggleActive : {}),
                  }}
                >
                  <span style={styles.toggleTitle}>중량 판매</span>
                  <span style={styles.toggleDesc}>kg 단위로 판매</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSaleType("package")}
                  style={{
                    ...styles.toggleCardLarge,
                    ...(saleType === "package" ? styles.toggleActive : {}),
                  }}
                >
                  <span style={styles.toggleTitle}>포장 판매</span>
                  <span style={styles.toggleDesc}>박스/S/P 단위</span>
                </button>
              </div>
            </div>

            {/* 중량 판매 필드 */}
            {saleType === "weight" && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>규격 (마리당 kg)</label>
                  <input
                    type="text"
                    value={specPerFish}
                    onChange={(e) => setSpecPerFish(e.target.value)}
                    placeholder="예: 4 (마리당 4kg)"
                    style={{ ...styles.input, width: "95%", paddingLeft: 12, marginLeft: 0 }}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>총 수량</label>
                  <div style={styles.stepper}>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={totalCount}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^0-9]/g, "")
                        setTotalCount(v === "" ? 0 : Number.parseInt(v, 10))
                      }}
                      style={styles.stepperInput}
                    />
                    <div style={styles.stepperButtons}>
                      <button type="button" style={styles.stepperBtn} onClick={dec}>
                        −
                      </button>
                      <button type="button" style={styles.stepperBtn} onClick={inc}>
                        ＋
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 포장 판매 필드 */}
            {saleType === "package" && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>포장 단위</label>
                  <div style={styles.chipGroup}>
                    <button
                      type="button"
                      onClick={() => setPackUnit("sp")}
                      style={{
                        ...styles.chip,
                        ...(packUnit === "sp" ? styles.chipActive : {}),
                      }}
                    >
                      S/P
                    </button>
                    <button
                      type="button"
                      onClick={() => setPackUnit("box")}
                      style={{
                        ...styles.chip,
                        ...(packUnit === "box" ? styles.chipActive : {}),
                      }}
                    >
                      Box
                    </button>
                    <button
                      type="button"
                      onClick={() => setPackUnit("net")}
                      style={{
                        ...styles.chip,
                        ...(packUnit === "net" ? styles.chipActive : {}),
                      }}
                    >
                      그물망
                    </button>
                  </div>
                </div>

                {packUnit === "sp" || packUnit === "box" ? (
                  <>
                    {/* S/P and Box display format */}
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>{unitLabel} (단가)</label>
                      <input
                        type="text"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        placeholder={`${unitLabel} 단가를 입력하세요`}
                        style={{ ...styles.input, width: "95%", paddingLeft: 12, marginLeft: 0 }}
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>수량</label>
                      <div style={styles.stepper}>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={quantity}
                          onChange={(e) => {
                            const v = e.target.value.replace(/[^0-9]/g, "")
                            setQuantity(v === "" ? 0 : Number.parseInt(v, 10))
                          }}
                          style={styles.stepperInput}
                        />
                        <div style={styles.stepperButtons}>
                          <button type="button" style={styles.stepperBtn} onClick={dec}>
                            −
                          </button>
                          <button type="button" style={styles.stepperBtn} onClick={inc}>
                            ＋
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* 그물망 display format - original layout */}
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>크기 단위</label>
                      <div style={styles.chipGroup}>
                        <button
                          type="button"
                          onClick={() => setSizeUnit("L")}
                          style={{
                            ...styles.chip,
                            ...(sizeUnit === "L" ? styles.chipActive : {}),
                          }}
                        >
                          대
                        </button>
                        <button
                          type="button"
                          onClick={() => setSizeUnit("M")}
                          style={{
                            ...styles.chip,
                            ...(sizeUnit === "M" ? styles.chipActive : {}),
                          }}
                        >
                          중
                        </button>
                        <button
                          type="button"
                          onClick={() => setSizeUnit("S")}
                          style={{
                            ...styles.chip,
                            ...(sizeUnit === "S" ? styles.chipActive : {}),
                          }}
                        >
                          소
                        </button>
                      </div>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>총 수량 ({unitLabel})</label>
                      <div style={styles.stepper}>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={totalCount}
                          onChange={(e) => {
                            const v = e.target.value.replace(/[^0-9]/g, "")
                            setTotalCount(v === "" ? 0 : Number.parseInt(v, 10))
                          }}
                          style={styles.stepperInput}
                        />
                        <div style={styles.stepperButtons}>
                          <button type="button" style={styles.stepperBtn} onClick={dec}>
                            −
                          </button>
                          <button type="button" style={styles.stepperBtn} onClick={inc}>
                            ＋
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Right - 가격 정보 */}
          <div>
            <h3 style={styles.priceTitle}>가격 정보</h3>
            <div style={styles.priceSection}>
              <div style={styles.priceList}>
                <div style={styles.priceItem}>
                  <span style={styles.priceLabel}>어제 낙찰가</span>
                  <span style={styles.priceValue}>₩25,000</span>
                </div>
                <div style={styles.priceItem}>
                  <span style={styles.priceLabel}>최근 7일 평균</span>
                  <span style={styles.priceValue}>₩13,000</span>
                </div>
                <div style={styles.priceItem}>
                  <span style={styles.priceLabel}>등급 최고가</span>
                  <span style={styles.priceValue}>₩11,000</span>
                </div>
              </div>
            </div>

            {/* 최저 수락가 설정 섹션 */}
            <div style={styles.inputGroup}>
              <label style={{ ...styles.label, marginTop: "16px" }}>최저 수락가 설정</label>
              <div
                style={{ position: "relative", display: "flex", alignItems: "center", width: "95%", marginLeft: 10 }}
              >
                <input
                  type="text"
                  value={minPrice.toLocaleString()}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "")
                    setMinPrice(value === "" ? "" : Number.parseInt(value, 10))
                  }}
                  style={{ ...styles.input, width: "100%", paddingRight: "35px" }}
                  placeholder="kg당 최저 수락가"
                />
                <span style={{ position: "absolute", right: "12px", fontSize: "13px", color: "#6b7280" }}>원</span>
              </div>
              <div style={{ ...styles.chipGroup, marginLeft: 10, marginTop: 8 }}>
                <button
                  type="button"
                  style={styles.chip}
                  onClick={() => setMinPrice((prev) => (Number(prev) || 0) + 1000)}
                >
                  +1천원
                </button>
                <button
                  type="button"
                  style={styles.chip}
                  onClick={() => setMinPrice((prev) => (Number(prev) || 0) + 10000)}
                >
                  +1만원
                </button>
                <button
                  type="button"
                  style={styles.chip}
                  onClick={() => setMinPrice((prev) => (Number(prev) || 0) + 50000)}
                >
                  +5만원
                </button>
                <button
                  type="button"
                  style={styles.chip}
                  onClick={() => setMinPrice((prev) => (Number(prev) || 0) + 100000)}
                >
                  +10만원
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 사진 업로드 - 그리드 외부에서 전체 너비 사용 */}
        <div style={{ ...styles.inputGroup, padding: "0 24px 24px 24px", maxWidth: "100%", boxSizing: "border-box" }}>
          <label style={{ ...styles.label }}>사진 업로드</label>
          <div style={styles.uploadArea} onDragOver={onDragOver} onDrop={onDrop}>
            {images.length === 0 && (
              <div style={styles.uploadInner}>
                <svg style={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p style={styles.uploadText}>
                  수산물 이미지를 드래그하여 놓거나 클릭하여 업로드하세요
                  <br />
                  JPG, PNG 파일만 업로드 가능합니다(최대 10MB, 최대 {MAX_FILES}장)
                </p>

                <button
                  type="button"
                  style={styles.uploadButton}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={images.length >= MAX_FILES}
                >
                  파일 선택하기
                </button>

                <input ref={fileInputRef} type="file" hidden accept="image/jpeg,image/png" multiple onChange={onPick} />
              </div>
            )}

            {images.length > 0 && (
              <div style={styles.thumbGrid}>
                {images.map((img) => (
                  <div key={img.url} style={styles.thumb}>
                    <img src={img.url || "/placeholder.svg"} alt="" style={styles.thumbImg} />
                    <button
                      type="button"
                      style={styles.thumbRemove}
                      onClick={() => removeImage(img.url)}
                      aria-label="삭제"
                    >
                      ×
                    </button>
                    {img.status !== "done" && (
                      <span style={img.status === "uploading" ? styles.badgeUploading : styles.badgeError}>
                        {img.status === "uploading" ? "업로드 중…" : "실패"}
                      </span>
                    )}
                  </div>
                ))}
                {images.length < MAX_FILES && (
                  <button
                    type="button"
                    style={styles.addMoreImagesButton}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    +
                  </button>
                )}
              </div>
            )}

            {uploadMessage && <p style={styles.uploadWarning}>{uploadMessage}</p>}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div style={styles.actionButtons}>
          <button style={styles.cancelButton}>취소</button>
          <button style={styles.submitButton} onClick={handleSubmit}>
            등록 신청
          </button>
        </div>
      </div>

      {/* Modal component */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18.1572" cy="18.002" r="17.5" fill="#DBEAFE" />
              <circle cx="18.1566" cy="17.6459" r="7.45908" stroke="#2775E7" strokeWidth="1.74855" />
              <path
                d="M18.5632 19.1475L18.8079 13.3779H17.5059L17.7417 19.1475H18.5632Z"
                fill="#2775E7"
                stroke="#2775E7"
                strokeWidth="0.874274"
              />
              <circle cx="18.1571" cy="21.6024" r="0.948127" fill="#2775E7" />
            </svg>

            <h3 style={styles.modalTitle}>등록 정보 확인</h3>
            <p style={styles.modalMessage}>
              {(() => {
                let message = `등록하려는 어종은 ${selectedFish}이고, `
                if (saleType === "weight") {
                  message += `마리당 ${specPerFish}kg짜리 ${totalCount}마리를 경매에 등록합니다.`
                } else if (saleType === "package") {
                  if (packUnit === "sp" || packUnit === "box") {
                    message += `${packUnit}당 ${unitPrice}원짜리 ${quantity}${packUnit}를 경매에 등록합니다.`
                  } else if (packUnit === "net") {
                    message += `${sizeUnit} 크기 ${totalCount}그물망을 경매에 등록합니다.`
                  }
                }
                message += `\n최저 수락가는 ${minPrice.toLocaleString()}원입니다.`
                return message
              })()}
              <br />위 내용이 맞으면 확인을 눌러주세요.
            </p>
            <div style={styles.modalButtons}>
              <button style={styles.modalCancelButton} onClick={closeModal}>
                취소
              </button>
              <button style={styles.modalConfirmButton} onClick={handleConfirm}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {isCompletionModalOpen && (
        <div style={styles.modalOverlay} onClick={closeCompletionModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: submissionStatus === "success" ? "#D1FAE5" : "#FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              {submissionStatus === "success" ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 9V13M12 15H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <h3 style={styles.modalTitle}>
              {submissionStatus === "success" ? "등록 완료" : "등록 실패"}
            </h3>
            <p style={styles.modalMessage}>
              {submissionStatus === "success"
                ? "수산물이 성공적으로 등록되었습니다."
                : "수산물 등록에 실패했습니다. 다시 시도해주세요."}
            </p>
            <div style={styles.modalButtons}>
              <button
                style={{
                  ...styles.modalConfirmButton,
                  width: "100%",
                }}
                onClick={closeCompletionModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
