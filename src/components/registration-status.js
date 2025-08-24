"use client"

import { useState, useEffect} from "react"

import StatsCards from "./stats-cards"
import ProducerMainTable from "./producermain-table"
import React from 'react';
import styles from './styles/registration-status.module.css';



import auctionStyles from "./AuctionPage/Auction.module.css";
import PageHeader from "./SalesSettlementPage/PageHeader"
import Pagination from "./Pagination";

const DEFAULT_STATS = { pending: 0, approved: 0, rejected: 0 }
const MOCK = {
    stats: { pending: 2, approved: 2, rejected: 1 },
    products: [
        { id: 1, name: "대게", category: "포항", weight: "25.5kg", testResult: "", price: 175750, origin: "김철수(어민 정보 추가)", status: "pending", registrationDate: "2025-08-20" },
        { id: 2, name: "광어", category: "완도", weight: "10kg", testResult: "", price: 80000, origin: "이영희(어민 정보 추가)", status: "approved", registrationDate: "2025-08-15", aiAnalysisResult: "정상", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 91.3만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다.", distance: 91.3 },
        { id: 3, name: "오징어", category: "주문진", weight: "50kg", testResult: "", price: 250000, origin: "박준호(어민 정보 추가)", status: "approved", registrationDate: "2025-07-25", aiAnalysisResult: "정상", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 91.3만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다.", distance: 91.3 },
        { id: 4, name: "고등어", category: "부산", weight: "30kg", testResult: "", price: 120000, origin: "최유리(어민 정보 추가)", status: "rejected", registrationDate: "2025-05-10", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 13.0만큼 떨어져 있습니다. 질병 패턴과 유사하여 승인 거부될 가능성이 높습니다." },
        { id: 5, name: "새우", category: "제주", weight: "5kg", testResult: "", price: 50000, origin: "김민준(어민 정보 추가)", status: "pending", registrationDate: "2025-08-19" },
        { id: 6, name: "참치", category: "원양", weight: "100kg", testResult: "", price: 1000000, origin: "박서준(어민 정보 추가)", status: "approved", registrationDate: "2025-08-18", aiAnalysisResult: "정상", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 95.0만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다.", distance: 95.0 },
        { id: 7, name: "갈치", category: "목포", weight: "15kg", testResult: "", price: 150000, origin: "이하은(어민 정보 추가)", status: "pending", registrationDate: "2025-08-17" },
        { id: 8, name: "전복", category: "완도", weight: "2kg", testResult: "", price: 200000, origin: "정수민(어민 정보 추가)", status: "rejected", registrationDate: "2025-08-16", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 15.0만큼 떨어져 있습니다. 질병 패턴과 유사하여 승인 거부될 가능성이 높습니다." },
        { id: 9, name: "문어", category: "동해", weight: "20kg", testResult: "", price: 300000, origin: "최지우(어민 정보 추가)", status: "approved", registrationDate: "2025-08-14", aiAnalysisResult: "정상", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 92.0만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다.", distance: 92.0 },
        { id: 10, name: "멍게", category: "통영", weight: "3kg", testResult: "", price: 30000, origin: "김도현(어민 정보 추가)", status: "pending", registrationDate: "2025-08-13" },
        { id: 11, name: "해삼", category: "남해", weight: "1kg", testResult: "", price: 70000, origin: "박지훈(어민 정보 추가)", status: "approved", registrationDate: "2025-08-12", aiAnalysisResult: "정상", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 90.0만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다.", distance: 90.0 },
        { id: 12, name: "아귀", category: "서해", weight: "7kg", testResult: "", price: 60000, origin: "이서연(어민 정보 추가)", status: "rejected", registrationDate: "2025-08-11", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 18.0만큼 떨어져 있습니다. 질병 패턴과 유사하여 승인 거부될 가능성이 높습니다." },
        { id: 13, name: "도미", category: "제주", weight: "8kg", testResult: "", price: 90000, origin: "정우진(어민 정보 추가)", status: "pending", registrationDate: "2025-08-10" },
        { id: 14, name: "병어", category: "군산", weight: "4kg", testResult: "", price: 40000, origin: "최윤서(어민 정보 추가)", status: "approved", registrationDate: "2025-08-09", aiAnalysisResult: "정상", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 93.0만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다.", distance: 93.0 },
        { id: 15, name: "장어", category: "고창", weight: "6kg", testResult: "", price: 110000, origin: "김태희(어민 정보 추가)", status: "pending", registrationDate: "2025-08-08" },
        { id: 16, name: "가자미", category: "강릉", weight: "3kg", testResult: "", price: 35000, origin: "박하준(어민 정보 추가)", status: "approved", registrationDate: "2025-08-07", aiAnalysisResult: "정상", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 94.0만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다.", distance: 94.0 },
        { id: 17, name: "대구", category: "속초", weight: "12kg", testResult: "", price: 130000, origin: "이시우(어민 정보 추가)", status: "pending", registrationDate: "2025-08-06" },
        { id: 18, name: "삼치", category: "여수", weight: "9kg", testResult: "", price: 85000, origin: "정은우(어민 정보 추가)", status: "rejected", registrationDate: "2025-08-05", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 16.0만큼 떨어져 있습니다. 질병 패턴과 유사하여 승인 거부될 가능성이 높습니다." },
        { id: 19, name: "명태", category: "동해", weight: "10kg", testResult: "", price: 75000, origin: "최민준(어민 정보 추가)", status: "approved", registrationDate: "2025-08-04", aiAnalysisResult: "정상", aiAnalysisText: "학습된 질병 데이터의 평균 특징과 96.0만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다.", distance: 96.0 },
        { id: 20, name: "홍어", category: "흑산도", weight: "15kg", testResult: "", price: 200000, origin: "김서아(어민 정보 추가)", status: "pending", registrationDate: "2025-08-03" },
    ],
}

export default function RegistrationStatus() {
    const [data, setData] = useState(MOCK)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedPeriod, setSelectedPeriod] = useState("기간 선택")
    const [page, setPage] = useState(1)
    const pageSize = 4

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
