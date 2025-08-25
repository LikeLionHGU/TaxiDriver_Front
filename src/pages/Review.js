import { useState, useEffect, useCallback } from "react"
import styles from "../styles/Review.module.css"
import tableStyles from "../components/styles/product-table.module.css"
import ReviewIcon from "../assets/review.svg"
import StatsCards from "../components/stats-cards2"
import ProductDetailModal from "../components/ProductDetailModal"
import RejectedModal from "../components/RejectedModal"
import PendingReviewModal from "../components/PendingReviewModal"
import ApprovalConfirmationModal from "../components/ApprovalConfirmationModal"
import axios from 'axios' // axios import 추가

// axios 기본 설정
axios.defaults.withCredentials = true // 쿠키 자동 포함
axios.defaults.timeout = 10000 // 10초 타임아웃

const defaultRequestData = [
  {
    id: 1,
    applicant: "대게",
    applicationDate: "포항 | 25.5kg",
    reviewer: "이영희",
    approvalDate: "2024/01/16",
    status: "승인",
    progress: 100,
    price: 175750,
    aiScore: 91.3,
    aiAnalysisText: "학습된 질병 데이터의 평균 특징과 91.3만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다.",
  },
  {
    id: 2,
    applicant: "대게",
    applicationDate: "포항 | 25.5kg",
    reviewer: "최수진",
    approvalDate: "-",
    status: "검토요청",
    progress: 60,
    price: 200000,
    aiScore: 50.0,
    aiAnalysisText: "AI 분석 결과가 아직 확정되지 않았습니다. 추가 검토가 필요합니다.",
  },
  {
    id: 3,
    applicant: "대게",
    applicationDate: "포항 | 25.5kg",
    reviewer: "김대호",
    approvalDate: "2024/01/14",
    status: "승인",
    progress: 100,
    price: 180000,
    aiScore: 95.0,
    aiAnalysisText: "학습된 질병 데이터의 평균 특징과 95.0만큼 떨어져 있습니다. 매우 정상일 가능성이 높습니다.",
  },
  {
    id: 4,
    applicant: "대게",
    applicationDate: "포항 | 25.5kg",
    reviewer: "박소영",
    approvalDate: "-",
    status: "승인거부",
    progress: 30,
    price: 160000,
    aiScore: 13.0,
    aiAnalysisText: "학습된 질병 데이터의 평균 특징과 13.0만큼 떨어져 있습니다. 질병 패턴과 유사하여 승인 거부될 가능성이 높습니다.",
  },
]

// RegisterStatus를 우리 status 형식으로 변환
const transformStatus = (registerStatus) => {
  switch (registerStatus) {
    case "PENDING":
      return "검토요청"
    case "APPROVED":
      return "승인"
    case "REJECTED":
      return "승인거부"
    default:
      return "검토요청"
  }
}

// status에 따른 progress 값 설정
const getProgress = (registerStatus) => {
  switch (registerStatus) {
    case "PENDING":
      return 60
    case "APPROVED":
      return 100
    case "REJECTED":
      return 30
    default:
      return 60
  }
}

// status에 따른 승인 날짜 설정
const getApprovalDate = (registerStatus) => {
  if (registerStatus === "APPROVED") {
    return new Date().toISOString().split('T')[0].replace(/-/g, '/').replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1/$2/$3')
  }
  return "-"
}

// AI 평가에서 점수 추출
const parseAiScore = (aiEvaluation) => {
  if (!aiEvaluation) return 50.0
  
  const scoreMatch = aiEvaluation.match(/(\d+\.?\d*)/)
  if (scoreMatch) {
    return parseFloat(scoreMatch[1])
  }
  
  if (aiEvaluation.includes("정상") || aiEvaluation.includes("양호")) {
    return 85.0 + Math.random() * 10
  } else if (aiEvaluation.includes("위험") || aiEvaluation.includes("불량")) {
    return 10.0 + Math.random() * 20
  }
  
  return 50.0
}

export default function Dashboard() {
  const [requestData, setRequestData] = useState(defaultRequestData)
  const [activeCard, setActiveCard] = useState("all")
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false)
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false)
  const [isApprovalConfirmationModalOpen, setIsApprovalConfirmationModalOpen] = useState(false)

  // API 호출 함수 - axios로 변경
  const fetchData = useCallback(async (cardType) => {
    try {
      let url = ""
      switch (cardType) {
        case "all":
          url = `https://likelion.info/post/check/all`
          break
        case "pending":
          url = `https://likelion.info/post/check/ready`
          break
        case "approved":
          url = `https://likelion.info/post/check/success`
          break
        case "rejected":
          url = `https://likelion.info/post/check/failed`
          break
        default:
          url = `https://likelion.info/post/check/all`
      }

      console.log("=== API 요청 시작 ===")
      console.log("요청 URL:", url)
      console.log("카드 타입:", cardType)

      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      console.log("=== API 응답 성공 ===")
      console.log("응답 상태:", response.status)
      console.log("응답 데이터:", response.data)

      const data = response.data
      
      // API 응답 데이터를 기존 형식에 맞게 변환
      const transformedData = data.map((item, index) => ({
        id: item.id || index + 1,
        applicant: item.name || "대게",
        applicationDate: `${item.fishWeight || "25.5kg"}`,
        reviewer: item.sellerName || "검토자",
        approvalDate: getApprovalDate(item.registerStatus),
        status: transformStatus(item.registerStatus),
        progress: getProgress(item.registerStatus),
        price: item.reservePrice || 0,
        aiScore: parseAiScore(item.aiEvaluation),
        aiAnalysisText: item.aiEvaluation || "AI 분석 결과가 없습니다.",
        fishCount: item.fishCount || 1,
      }))

      console.log("변환된 데이터:", transformedData)
      setRequestData(transformedData)

    } catch (error) {
      console.error("=== API 호출 에러 ===")
      console.error("에러 상태:", error.response?.status)
      console.error("에러 데이터:", error.response?.data)
      console.error("에러 메시지:", error.message)
      console.error("전체 에러:", error)

      // API 에러 시 기본 데이터 유지
      console.log("기본 데이터로 폴백")
      setRequestData(defaultRequestData)
    }
  }, [])

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchData("all")
  }, [fetchData])

  const stats = {
    pending: requestData.filter((item) => item.status === "검토요청").length,
    approved: requestData.filter((item) => item.status === "승인").length,
    rejected: requestData.filter((item) => item.status === "승인거부").length,
  }

  const handleCardSelect = (key) => {
    setActiveCard(key)
    // 카드 선택 시 해당 API 호출
    fetchData(key)
  }

  const handleDetailClick = (item) => {
    const updatedItem = { ...item };
    if (item.aiScore && item.aiAnalysisText) {
      updatedItem.aiAnalysisResult = {
        diseasePercentage: item.aiScore,
        diseaseDescription: item.aiAnalysisText,
      };
    }
    setSelectedItem(updatedItem);
    if (item.status === "승인") {
      setIsDetailModalOpen(true);
    } else if (item.status === "승인거부") {
      setIsRejectedModalOpen(true);
    } else if (item.status === "검토요청") {
      setIsPendingModalOpen(true);
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
      await axios.post(`https://likelion.info/update/register/status/true/${productId}`, {}, { withCredentials: true });
      setIsPendingModalOpen(false);
      setIsApprovalConfirmationModalOpen(true);
      fetchData(activeCard);
    } catch (error) {
      console.error("상품 승인 실패:", error);
      alert("상품 승인에 실패했습니다.");
    }
  };
  const handleRejectProduct = async (productId, failedReason) => {
    try {
      await axios.post(`https://likelion.info/update/register/status/false/${productId}`, { failedReason }, { withCredentials: true });
      setIsPendingModalOpen(false);
      alert("상품이 반려되었습니다.");
      fetchData(activeCard);
    } catch (error) {
      console.error("상품 반려 실패:", error);
      alert("상품 반려에 실패했습니다.");
    }
  };

  const closeModal = () => {
    setIsDetailModalOpen(false)
    setIsRejectedModalOpen(false)
    setIsPendingModalOpen(false)
    setIsApprovalConfirmationModalOpen(false)
    setSelectedItem(null)
  }

  const filteredData = requestData.filter((item) => {
    if (activeCard === "all") return true
    if (activeCard === "pending") return item.status === "검토요청"
    if (activeCard === "approved") return item.status === "승인"
    if (activeCard === "rejected") return item.status === "승인거부"
    return true
  })

  const statusToStyle = {
    "검토요청": tableStyles.statusPending,
    "승인": tableStyles.statusApproved,
    "승인거부": tableStyles.statusRejected,
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.titleSection}>
          <img src={ReviewIcon} alt="검토 아이콘" className={styles.iconImage} />
          <div>
            <h1 className={styles.title}>검토 요청 처리</h1>
            <p className={styles.subtitle}>
              검토 요청의 상태를 확인하고, 승인 또는 거부를 처리할 수 있습니다.
            </p>
          </div>
        </div>

        <StatsCards stats={stats} onSelect={handleCardSelect} activeKey={activeCard} />

        <div className={tableStyles.container}>
          <div className={tableStyles.tableWrapper}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>수산물 정보</th>
                  <th>검사 결과</th>
                  <th>최저 수락가</th>
                  <th>생산자</th>
                  <th>승인 현황</th>
                  <th>등록 상세</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className={tableStyles.tableRow}>
                    <td>
                      <div className={tableStyles.productInfo}>
                        <strong>{item.applicant}</strong>
                        <span className={tableStyles.productWeight}>{item.applicationDate}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.resultCell}>
                        <div className={styles.progressTrack}>
                          <div className={styles.progressFill} style={{ width: `${item.progress}%` }} />
                        </div>
                        <span className={styles.scoreText}>{item.progress}</span>
                      </div>
                    </td>
                    <td>
                      <div className={tableStyles.price} style={{ color: "#186636" }}>
                        {`₩ ${item.price.toLocaleString("ko-KR")}`}
                      </div>
                    </td>
                    <td>{item.reviewer}</td>
                    <td>
                      <span className={`${tableStyles.statusBadge} ${statusToStyle[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`${tableStyles.detailBtn} ${
                          item.status === "검토요청" ? tableStyles.reviewBtn : ""
                        }`}
                        onClick={() => handleDetailClick(item)}
                      >
                        {item.status === "검토요청" ? "검토하기" : "상세보기"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageButton}>‹</button>
          <button className={`${styles.pageButton} ${styles.active}`}>1</button>
          <button className={styles.pageButton}>2</button>
          <button className={styles.pageButton}>3</button>
          <span className={styles.dots}>...</span>
          <button className={styles.pageButton}>10</button>
          <button className={styles.pageButton}>›</button>
        </div>
      </main>
      {isDetailModalOpen && selectedItem && (
        <ProductDetailModal
          open={isDetailModalOpen}
          onClose={closeModal}
          product={selectedItem}
          apiUrl="https://likelion.info/get/detail/"
        />
      )}
      {isRejectedModalOpen && selectedItem && (
        <RejectedModal
          open={isRejectedModalOpen}
          onClose={closeModal}
          product={selectedItem}
        />
      )}
      {isPendingModalOpen && selectedItem && (
        <PendingReviewModal
          open={isPendingModalOpen}
          onClose={closeModal}
          product={selectedItem}
          onApprove={() => handleApproveProduct(selectedItem.id)}
          onReject={handleRejectProduct}
        />
      )}
      {isApprovalConfirmationModalOpen && (
        <ApprovalConfirmationModal
          open={isApprovalConfirmationModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  )
}