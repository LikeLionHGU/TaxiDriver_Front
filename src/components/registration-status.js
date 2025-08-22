"use client"

import { useState, useEffect} from "react"

import StatsCards from "./stats-cards"
import ProducerMainTable from "./producermain-table"
import styles from "./styles/registration-status.module.css"
import auctionStyles from "./AuctionPage/AuctionPage.module.css";
import PageHeader from "./SalesSettlementPage/PageHeader"

const DEFAULT_STATS = { pending: 0, approved: 0, rejected: 0 }
const MOCK = {
    stats: { pending: 2, approved: 2, rejected: 1 },
    products: [
        { id: 1, name: "대게", category: "포항", weight: "25.5kg", testResult: "", price: 175750, origin: "김철수(어민 정보 추가)", status: "pending", registrationDate: "2025-08-20" },
        { id: 2, name: "광어", category: "완도", weight: "10kg", testResult: "", price: 80000, origin: "이영희(어민 정보 추가)", status: "approved", registrationDate: "2025-08-15" },
        { id: 3, name: "오징어", category: "주문진", weight: "50kg", testResult: "", price: 250000, origin: "박준호(어민 정보 추가)", status: "approved", registrationDate: "2025-07-25" },
        { id: 4, name: "고등어", category: "부산", weight: "30kg", testResult: "", price: 120000, origin: "최유리(어민 정보 추가)", status: "rejected", registrationDate: "2025-05-10" },
    ],
}

export default function RegistrationStatus() {
    const [data, setData] = useState(MOCK)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedPeriod, setSelectedPeriod] = useState("기간 선택")
    const [page, setPage] = useState(1)
    const pageSize = 10

    useEffect(() => {
        // Mock 데이터를 사용하므로 fetch 로직은 주석 처리하거나 유지할 수 있습니다.
        // fetchRegistrationData()
        setLoading(false) // 목 데이터 바로 사용하므로 로딩 완료
    }, [])

    useEffect(() => {
        setPage(1) // 필터 조건이 변경되면 항상 첫 페이지로 이동
    }, [activeTab, searchTerm, selectedPeriod])

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

    const filteredProducts = (() => {
        let products = Array.isArray(data?.products) ? data.products : []

        // 1. 탭 필터링
        if (activeTab !== "all") {
            products = products.filter(p => p.status === activeTab)
        }

        // 2. 검색어 필터링 (수산물 이름)
        if (searchTerm.trim()) {
            products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        // 3. 기간 필터링
        if (selectedPeriod !== "기간 선택") {
            const now = new Date()
            products = products.filter(p => {
                if (!p.registrationDate) return false
                const productDate = new Date(p.registrationDate)
                let startDate = new Date(now)

                switch (selectedPeriod) {
                    case "1주일":
                        startDate.setDate(now.getDate() - 7)
                        break
                    case "1개월":
                        startDate.setMonth(now.getMonth() - 1)
                        break
                    case "3개월":
                        startDate.setMonth(now.getMonth() - 3)
                        break
                    case "6개월":
                        startDate.setMonth(now.getMonth() - 6)
                        break
                    case "1년":
                        startDate.setFullYear(now.getFullYear() - 1)
                        break
                    default:
                        return false // 선택된 기간이 없으면 필터링하지 않음
                }
                return productDate >= startDate && productDate <= now
            })
        }

        return products
    })()

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>데이터를 불러오는 중...</p>
            </div>
        )
    }

    const stats = data?.stats || DEFAULT_STATS
    // 페이지 계산
    const total = filteredProducts.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const currentPage = Math.min(page, totalPages)
    const start = (currentPage - 1) * pageSize
    const paginated = filteredProducts.slice(start, start + pageSize)

  return (
    <div className={auctionStyles.main}>
      <div className={auctionStyles.gradientBox}/>
      <div className={auctionStyles.pageContainer}>
      <PageHeader
            image="registar"
            title="등록 현황"
            content="내가 등록한 상품의 승인 여부를 확인하세요."/>

      {/* 카드 */}
      <StatsCards
        stats={stats}
        onSelect={key => setActiveTab(key)}
        activeKey={activeTab}
      />

      {/* 테이블 */}
      <ProducerMainTable
        products={paginated}
        onStatusChange={handleStatusChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      {/* 페이지네이션 */}
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={setPage}
      />
      </div>
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
