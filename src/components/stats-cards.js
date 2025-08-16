import styles from "./styles/stats-cards.module.css"
import pendingIcon from "../assets/검토중.svg"
import approvedIcon from "../assets/승인완료.svg"
import rejectedIcon from "../assets/승인거부.svg"

export default function StatsCards({ stats }) {
  if (!stats) return null

  const totalCount =
    (stats.pending || 0) + (stats.approved || 0) + (stats.rejected || 0)

  const cardData = [
    {
      icon: null, 
      label: "전체보기",
      count: totalCount,
      bgColor: "#FFF",
      
    },
    {
      icon: pendingIcon,
      label: "검토중",
      count: stats.pending,
      bgColor: "#FFF",
    },
    {
      icon: approvedIcon,
      label: "승인완료",
      count: stats.approved,
      bgColor: "#FFF",
    },
    {
      icon: rejectedIcon,
      label: "승인거부",
      count: stats.rejected,
      bgColor: "#FFF",
    },
  ]

  return (
    <div className={styles.container}>
      {cardData.map((card, index) => (
        <div
          key={index}
          className={styles.card}
          style={{ backgroundColor: card.bgColor }}
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
        </div>
      ))}
    </div>
  )
}
