import { useState } from "react"
import styles from "../styles/Review.module.css"
import ReviewIcon from "../assets/review.svg"
import StatsCards from "../components/stats-cards2"

export default function Dashboard() {
  const requestData = [
    {
      id: 1,
      applicant: "김철수",
      applicationDate: "2024/01/15",
      reviewer: "이영희",
      approvalDate: "2024/01/16",
      status: "승인 완료",
      progress: 100,
    },
    {
      id: 2,
      applicant: "박민수",
      applicationDate: "2024/01/14",
      reviewer: "최수진",
      approvalDate: "-",
      status: "승인 대기",
      progress: 60,
    },
    {
      id: 3,
      applicant: "정하나",
      applicationDate: "2024/01/13",
      reviewer: "김대호",
      approvalDate: "2024/01/14",
      status: "승인 완료",
      progress: 100,
    },
    {
      id: 4,
      applicant: "이준호",
      applicationDate: "2024/01/12",
      reviewer: "박소영",
      approvalDate: "-",
      status: "승인 거부",
      progress: 30,
    },
  ]

  const [activeCard, setActiveCard] = useState("all")

  const stats = {
    pending: requestData.filter((item) => item.status === "승인 대기").length,
    approved: requestData.filter((item) => item.status === "승인 완료").length,
    rejected: requestData.filter((item) => item.status === "승인 거부").length,
  }

  const handleCardSelect = (key) => {
    setActiveCard(key)
    // You can add filtering logic here based on the selected key
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

        <div className={styles.tableContainer}>
          <table className={styles.table}>
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
              {requestData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.applicant}</td>
                  <td>{item.applicationDate}</td>
                  <td>{item.reviewer}</td>
                  <td>{item.approvalDate}</td>
                  <td>
                    <div className={styles.statusCell}>
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBar} style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <span className={`${styles.badge} ${styles[item.status.replace(" ", "")]}`}>{item.status}</span>
                    </div>
                  </td>
                  <td>
                    <button className={styles.actionButton}>상세보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  )
}
