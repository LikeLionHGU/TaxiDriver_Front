"use client"

import { useState, useEffect, useCallback } from "react"
import StatsCards from "./stats-cards"
import ProducerMainTable from "./producermain-table"
import React from 'react';
import styles from './styles/registration-status.module.css';
import auctionStyles from "./AuctionPage/Auction.module.css";
import PageHeader from "./SalesSettlementPage/PageHeader"
import Pagination from "./Pagination";
import axios from 'axios'; // axios import 추가

// axios 기본 설정
axios.defaults.withCredentials = true; // 쿠키 자동 포함
axios.defaults.timeout = 10000; // 10초 타임아웃

const mapStatus = (s) => {
  const S = String(s || '').toUpperCase();
  // 백엔드 값 → 프론트 탭 키
  if (S === 'PENDING' || S === 'READY') return 'pending';
  if (S === 'APPROVED' || S === 'SUCCESS') return 'approved';
  if (S === 'REJECTED' || S === 'FAILED') return 'rejected';
  return 'pending'; // 기본값
};

const transformApiData = (apiData = []) => {
  if (!Array.isArray(apiData)) return [];
  return apiData.map(item => {
    const d = item.registeredDate ? String(item.registeredDate) : '';
    // 2025-08-21T12:34:56 → 2025-08-21
    const dateOnly = d.includes('T') ? d.split('T')[0] : d.split(' ')[0] || d;

    return {
      id: item.id,
      name: item.name,
      origin: item.sellerName,
      status: mapStatus(item.registrationStatus),
      weight: item.fishWeight,
      registrationDate: dateOnly,
      // fishCount: item.fishCount, // 필요 시 사용
    };
  });
};





// 탭별 API 엔드포인트 매핑
const getApiEndpoint = (activeTab, value) => {
  const baseUrl = "https://likelion.info/post/get";
  
  // 항상 'all' 엔드포인트를 사용하여 모든 데이터를 가져온 후 클라이언트 측에서 필터링합니다.
  // 이 방식은 탭별 API(/ready, /success, /failed)가 반환하는 데이터와
  // 통계 API(/list)가 반환하는 데이터 간의 불일치 문제를 해결합니다.
  return `${baseUrl}/all/${value}`;
};

export default function RegistrationStatus() {
    const [allProducts, setAllProducts] = useState([]); // 모든 기간의 데이터를 저장
    const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 데이터
    
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPeriod, setSelectedPeriod] = useState("기간 선택");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 4;

    

    // 메인 데이터 가져오기
    const fetchRegistrationData = useCallback(async (value) => {
      console.log("=== 메인 API 요청 시작 ===");
      console.log("요청 시각:", new Date().toISOString());
      console.log("Active Tab:", activeTab);
      console.log("Value:", value);
      console.log("Value 타입:", typeof value);
      
      setLoading(true);
      const url = getApiEndpoint(activeTab, value);
      console.log('요청 URL:', url);

      try {
        console.log("=== 요청 전송 중 ===");
        
        const response = await axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        console.log("=== 응답 수신 ===");
        console.log("응답 상태:", response.status);
        console.log("응답 헤더:", response.headers);
        console.log("응답 데이터:", response.data);

        console.log("=== 성공 응답 처리 ===");
        console.log("응답 데이터 타입:", Array.isArray(response.data) ? "배열" : typeof response.data);
        console.log("응답 데이터 길이:", Array.isArray(response.data) ? response.data.length : "N/A");
        
        // 모든 탭에서 리스트 데이터로 처리 (전체보기 포함)
        const transformed = transformApiData(response.data || []);
        console.log("변환된 데이터:", transformed);
        console.log("변환된 데이터 길이:", transformed.length);
        
        if (transformed.length === 0) {
          console.warn("🚨 변환된 데이터가 비어있습니다!");
          console.warn("백엔드에서 빈 배열을 반환했거나 데이터 변환 과정에서 문제가 발생했습니다.");
        }
        
        setAllProducts(transformed);
        
        // 전체보기가 아닐 때만 리스트 데이터로 통계 계산
        
        // 전체보기일 때는 별도 fetchStatsData()에서 통계 설정
        
      } catch (error) {
        console.error("=== API 요청 실패 ===");
        console.error("에러 상태:", error.response?.status);
        console.error("에러 데이터:", error.response?.data);
        console.error("에러 메시지:", error.message);
        console.error("전체 에러:", error);
        
        // 400 에러이지만 유효한 데이터가 있는지 확인
        if (error.response?.status === 400 && error.response?.data && 
            (error.response.data.totalCount !== undefined || Array.isArray(error.response.data))) {
          console.warn("⚠️ 백엔드 문제: 400 에러이지만 유효한 데이터가 있습니다.");
          console.warn("백엔드에서 HTTP 상태 코드를 200으로 수정해야 합니다.");
          console.warn("임시로 데이터를 처리합니다.");
          
          const transformed = transformApiData(error.response.data || []);
          setAllProducts(transformed);
          
          
        } else {
          // 진짜 에러인 경우
          if (error.response?.status === 400) {
            console.error("=== 400 Bad Request 상세 분석 ===");
            console.error("전송한 value:", value);
            console.error("URL:", url);
            console.error("Active Tab:", activeTab);
            console.error("기대값: 'ALL', 'RECENT_1WEEK', 'RECENT_1MONTH', 'RECENT_3MONTH', 'RECENT_6MONTH' 중 하나");
            console.error("실제 전송값 검증:", {
              value: value,
              type: typeof value,
              isValid: ["ALL", "RECENT_1WEEK", "RECENT_1MONTH", "RECENT_3MONTH", "RECENT_6MONTH"].includes(value)
            });
          }
          
          setAllProducts([]);
        }
      } finally {
        setLoading(false);
        console.log("=== API 요청 완료 ===");
      }
    }, [activeTab]);

    // 탭이 변경되었을 때 데이터 가져오기
    useEffect(() => {
        console.log("=== 탭 변경 감지 ===");
        console.log("Active Tab:", activeTab);
        console.log("Selected Period:", selectedPeriod);

        // 데이터 가져오기
        const periodMap = {
            "기간 선택": "ALL",    // 기본값 = 전체 기간
            "전체 기간": "ALL",    // 전체 기간
            "최근 1주": "RECENT_1WEEK",
            "최근 1달": "RECENT_1MONTH",
            "최근 3달": "RECENT_3MONTH",
            "최근 6달": "RECENT_6MONTH",
        };
        const value = periodMap[selectedPeriod] ?? "ALL";
        console.log("mapped value:", value);
        
        fetchRegistrationData(value);
    }, [activeTab, selectedPeriod, fetchRegistrationData]);

    // 필터링 및 페이지네이션 로직
    useEffect(() => {
        let products = [...allProducts];

        // 탭 필터링
        if (activeTab !== "all") {
            products = products.filter(item => item.status === activeTab);
        }

        // 검색어 필터링 (수산물 이름)
        if (searchTerm.trim()) {
           products = products.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        setFilteredProducts(products);
        setTotalPages(Math.ceil(products.length / pageSize));
        setPage(1); // 필터 변경 시 첫 페이지로

    }, [allProducts, searchTerm, pageSize, activeTab]);

    // 탭 변경 핸들러
    const handleTabChange = (key) => {
        console.log("=== 탭 변경 요청 ===");
        console.log("기존 탭:", activeTab);
        console.log("새 탭:", key);
        setActiveTab(key);
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>데이터를 불러오는 중...</p>
            </div>
        )
    }

    // 현재 페이지에 표시할 데이터 계산
    const paginated = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

    const stats = {
        pending: allProducts.filter(p => p.status === 'pending').length,
        approved: allProducts.filter(p => p.status === 'approved').length,
        rejected: allProducts.filter(p => p.status === 'rejected').length,
        total: allProducts.length
    };

    return (
        <div className={auctionStyles.main}>
            <div className={auctionStyles.gradientBox} />
            <div className={auctionStyles.pageContainer}>
                <PageHeader
                    image="registar"
                    title="등록 현황"
                    content="내가 등록한 상품의 승인 여부를 확인하세요." />

                {/* 카드 */}
                <StatsCards
                    stats={stats}
                    onSelect={handleTabChange}
                    activeKey={activeTab}
                />

                {/* 테이블 */}
                <ProducerMainTable
                    products={paginated}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedPeriod={selectedPeriod}
                    setSelectedPeriod={setSelectedPeriod}
                />

                {/* 페이지네이션 */}
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={setPage}
                />
            </div>
        </div>
    )
}