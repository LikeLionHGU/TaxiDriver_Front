import styles from "./styles/stats-cards.module.css"
import pendingIcon from "../assets/검토중.svg"
import approvedIcon from "../assets/승인완료.svg"
import rejectedIcon from "../assets/승인거부.svg"

export default function StatsCards({ stats, onSelect, activeKey }) {
  if (!stats) return null

  // 수정된 부분: 백엔드의 totalCount를 직접 사용
  const totalCount = stats.total || 
    ((stats.pending || 0) + (stats.approved || 0) + (stats.rejected || 0))

  const cardData = [
    { key: "all",      icon: null,        label: "전체보기", count: totalCount },
    { key: "pending",  icon: pendingIcon, label: "검토중",   count: stats.pending },
    { key: "approved", icon: approvedIcon,label: "승인완료", count: stats.approved },
    { key: "rejected", icon: rejectedIcon,label: "승인거부", count: stats.rejected },
  ]

  return (
    <div className={styles.container}>
      {cardData.map((card) => {
        let activeClass = ""
        if (activeKey === card.key) {
          if (card.key === "all") activeClass = styles.cardActiveAll
          if (card.key === "pending") activeClass = styles.cardActivePending
          if (card.key === "approved") activeClass = styles.cardActiveApproved
          if (card.key === "rejected") activeClass = styles.cardActiveRejected
        }

        return (
          <button
            key={card.key}
            type="button"
            className={`${styles.card} ${activeClass}`}
            onClick={() => onSelect?.(card.key)}
          >
            {card.icon && (
              <div className={styles.icon}>
                <img src={card.icon} alt={card.label} className={styles.iconImage} />
              </div>
            )}
            <div className={styles.content}>
              <span className={styles.label}>{card.label}</span>
              <span className={styles.count}>{card.count}건</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}