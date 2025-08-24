import styles from "./styles/Pagination.module.css"

/** --- Pagination 컴포넌트 --- */
function Pagination({ page, totalPages, onChange }) {
  const pages = buildPageList(page, totalPages)

  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return
    onChange(p)
  }

  return (
    <nav className={styles.pagination} aria-label="페이지네이션">
      <button
        className={`${styles.pageBtn} ${styles.navBtn}`}
        onClick={() => go(page - 1)}
        disabled={page === 1}
      >
        ‹
      </button>

      {pages.map((p, idx) =>
        p === "…" ? (
          <span key={`gap-${idx}`} className={styles.ellipsis}>…</span>
        ) : (
          <button
            key={p}
            onClick={() => go(p)}
            className={`${styles.pageBtn} ${p === page ? styles.activePage : styles.inactivePage}`}
          >
            {p}
          </button>
        )
      )}

      <button
        className={`${styles.pageBtn} ${styles.navBtn}`}
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
      >
        ›
      </button>
    </nav>
  )
}

export default Pagination;

/** --- 페이지 리스트 생성 --- */
function buildPageList(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const result = []
  const push = (v) => result.push(v)

  const showLeft = [1, 2, 3]
  const showRight = [total - 2, total - 1, total]

  if (page <= 4) {
    showLeft.forEach(push)
    push("…")
    showRight.forEach(push)
  } else if (page >= total - 3) {
    showLeft.forEach(push)
    push("…")
    showRight.forEach(push)
  } else {
    push(1)
    push("…")
    push(page - 1)
    push(page)
    push(page + 1)
    push("…")
    push(total)
  }
  return Array.from(new Set(result))
}
