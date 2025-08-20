"use client"

import { useState, useEffect} from "react"
import StatsCards from "./stats-cards"
import ProductTable from "./product-table"
import styles from "./styles/registration-status.module.css"
import regIconUrl from "../assets/registar.svg"

const DEFAULT_STATS = { pending: 0, approved: 0, rejected: 0 }
const MOCK = {
  stats: { pending: 3, approved: 2, rejected: 1 },
  products: [
    { id: 1, name: "대게", category: "포항", weight: "25.5kg", testResult: "", price: 175750, origin: "김철수(어민 정보 추가)", status: "pending" },
    { id: 2, name: "대게", category: "포항", weight: "25.5kg", testResult: "", price: 175750, origin: "김철수(어민 정보 추가)", status: "approved" },
    { id: 3, name: "대게", category: "포항", weight: "25.5kg", testResult: "", price: 175750, origin: "김철수(어민 정보 추가)", status: "approved" },
    { id: 4, name: "대게", category: "포항", weight: "25.5kg", testResult: "", price: 175750, origin: "김철수(어민 정보 추가)", status: "rejected" },
  ],
}

export default function RegistrationStatus() {
  const [data, setData] = useState(MOCK)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  // 페이지네이션 상태
  const [page, setPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    fetchRegistrationData()
  }, [])

  // 탭 바뀌면 페이지 초기화
  useEffect(() => { setPage(1) }, [activeTab])

  const fetchRegistrationData = async () => {
    try {
      const res = await fetch("/api/registration-status")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (!json?.products || !json?.stats) throw new Error("Bad schema")
      setData(json)
    } catch (e) {
      console.warn("API 실패 → 목데이터 사용:", e)
      setData(MOCK)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>데이터를 불러오는 중...</p>
      </div>
    )
  }

  const stats = data?.stats || DEFAULT_STATS
  const products = Array.isArray(data?.products) ? data.products : []
  const filteredProducts =
    activeTab === "all" ? products : products.filter(p => p.status === activeTab)

  // 페이지 계산
  const total = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const paginated = filteredProducts.slice(start, start + pageSize)

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <img src={regIconUrl} alt="등록 현황 아이콘" className={styles.iconImage} />
        <div className={styles.headerText}>
          <h1 className={styles.title}>등록 현황</h1>
          <p className={styles.subtitle}>내가 등록한 상품의 승인 여부를 확인하세요.</p>
        </div>
      </div>

      {/* 카드 */}
      <StatsCards
        stats={stats}
        onSelect={key => setActiveTab(key)}
        activeKey={activeTab}
      />

      {/* 테이블 */}
      <ProductTable products={paginated} onStatusChange={handleStatusChange} />

      {/* 페이지네이션 */}
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  )

  async function handleStatusChange(productId, newStatus) {
    try {
      await fetch(`/api/products/${productId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      fetchRegistrationData()
    } catch (error) {
      console.error("상태 변경 실패:", error)
    }
  }
}

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
