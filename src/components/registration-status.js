"use client"

import { useState, useEffect } from "react"
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
    { id: 4, name: "대게", category: "포항", weight: "25.5kg", testResult: "", price: 175750, origin: "김철수(어민 정보 추가)", status: "approved" },
  ],
}


export default function RegistrationStatus() {
  const [data, setData] = useState(MOCK)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchRegistrationData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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


      {/* 카드(클릭 시 필터 변경) */}
      <StatsCards
        stats={stats}
        onSelect={key => setActiveTab(key)}   // ← 카드 클릭 연동
        activeKey={activeTab}                // ← 선택 상태 스타일용
      />

      {/* 테이블 */}
      <ProductTable products={filteredProducts} onStatusChange={handleStatusChange} />
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
