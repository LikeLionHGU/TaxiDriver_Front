import { useState } from "react"
import styles from "../styles/Review.module.css"
import tableStyles from "../components/styles/product-table.module.css"
import ReviewIcon from "../assets/review.svg"
import StatsCards from "../components/stats-cards2"
import ProductDetailModal from "../components/ProductDetailModal"
import RejectedModal from "../components/RejectedModal"
import PendingReviewModal from "../components/PendingReviewModal"

export default function Dashboard() {
  const requestData = [
    {
      id: 1,
      applicant: "대게",
      applicationDate: "포항 | 25.5kg",
      reviewer: "이영희",
      approvalDate: "2024/01/16",
      status: "승인",
      progress: 100,
      price: 175750,
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
    },
  ]

  const [activeCard, setActiveCard] = useState("all")
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false)
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false)

  const stats = {
    pending: requestData.filter((item) => item.status === "검토요청").length,
    approved: requestData.filter((item) => item.status === "승인").length,
    rejected: requestData.filter((item) => item.status === "승인거부").length,
  }

  const handleCardSelect = (key) => {
    setActiveCard(key)
  }

  const handleDetailClick = (item) => {
    setSelectedItem(item)
    if (item.status === "승인") {
      setIsDetailModalOpen(true)
    } else if (item.status === "승인거부") {
      setIsRejectedModalOpen(true)
    } else if (item.status === "검토요청") {
      setIsPendingModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsDetailModalOpen(false)
    setIsRejectedModalOpen(false)
    setIsPendingModalOpen(false)
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
        />
      )}
    </div>
  )
}