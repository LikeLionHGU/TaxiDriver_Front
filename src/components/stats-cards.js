import styles from "./styles/stats-cards.module.css"

export default function StatsCards({ stats }) {
  if (!stats) return null

  const cardData = [
    {
      icon: "⏳",
      label: "검토중",
      count: stats.pending,
      bgColor: "#f3e8ff",
      iconColor: "#8b5cf6",
    },
    {
      icon: "✅",
      label: "승인완료",
      count: stats.approved,
      bgColor: "#ecfdf5",
      iconColor: "#10b981",
    },
    {
      icon: "❌",
      label: "승인거부",
      count: stats.rejected,
      bgColor: "#fef2f2",
      iconColor: "#ef4444",
    },
  ]

  return (
    <div className={styles.container}>
      {cardData.map((card, index) => (
        <div key={index} className={styles.card} style={{ backgroundColor: card.bgColor }}>
          <div className={styles.icon} style={{ color: card.iconColor }}>
            {card.icon}
          </div>
          <div className={styles.content}>
            <span className={styles.label}>{card.label}</span>
            <span className={styles.count}>{card.count}건</span>
          </div>
        </div>
      ))}
    </div>
  )
}
