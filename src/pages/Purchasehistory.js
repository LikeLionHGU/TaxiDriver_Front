"use client"

import React, { useState } from "react"
// 1. CSS 모듈 import 방식은 그대로 유지합니다.
import styles from "../styles/Purchasehistory.module.css"
// SVG 파일 import 방식은 사용자의 환경에 따라 다를 수 있습니다.
// .src가 필요 없는 환경일 수 있으므로 원래대로 되돌립니다.
import excelIcon from "../assets/excel.svg";
import logo from "../assets/SaleTable/cart.svg";

const PurchaseHistoryPage = () => {
  const [activeFilter, setActiveFilter] = useState("전체")

  // Sample purchase data
  const purchaseData = [
    {
      id: 1,
      productName: "대게",
      description: "포항",
      quantity: "30마리",
      price: 250000,
      date: "2025. 8. 9.",
      status: "수령대기",
    },
    {
      id: 2,
      productName: "대게",
      description: "포항",
      quantity: "100마리",
      price: 85000,
      date: "2025. 8. 10.",
      status: "수령완료",
    },
    {
      id: 3,
      productName: "대게",
      description: "포항",
      quantity: "200마리",
      price: 120000,
      date: "2025. 8. 11.",
      status: "수령대기",
    },
    {
      id: 4,
      productName: "대게",
      description: "포항",
      quantity: "80마리",
      price: 95000,
      date: "2025. 8. 12.",
      status: "수령완료",
    },
  ]

  const filters = ["전체", "최근 1주", "최근 1개월", "최근 3개월"]

  // Calculate totals
  const totalRecords = purchaseData.length
  const totalAmount = purchaseData.reduce((sum, item) => sum + item.price, 0)

  // Filter data based on active filter
  const filteredData =
    activeFilter === "전체" ? purchaseData : purchaseData;

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
  }

  const handleExcelDownload = () => {
    const csvContent = [
      ["상품명", "수량", "낙찰가", "낙찰일", "상태"],
      ...filteredData.map((item) => [
        item.productName,
        item.quantity,
        `₩${item.price.toLocaleString()}`,
        item.date,
        item.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "구매내역.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 2. getStatusClass가 styles 객체의 클래스 이름을 대괄호 표기법으로 반환하도록 수정
  const getStatusClass = (status) => {
    switch (status) {
      case "수령완료":
        return styles['status-completed'];
      case "수령대기":
        return styles['status-pending'];
      case "처리중":
        return styles['status-processing'];
      case "취소됨":
        return styles['status-cancelled'];
      default:
        return ""; // 기본값 설정
    }
  }

  return (
    // 3. 모든 className을 대괄호 표기법 styles['class-name']을 사용하여 적용
    <div className={styles['purchase-history-container']}>
      <div className={styles['purchase-section']}>
        <div className={styles['section-header']}>
  {/* 왼쪽: 아이콘 + (제목/통계 세로 스택) */}
  <div className={styles['title-area']}>
    <img src={logo} alt="장바구니" className={styles['title-icon']} />
    <div className={styles['title-texts']}>
      <h2 className={styles['section-title']}>구매 내역</h2>
      <div className={styles['purchase-stats']}>
        조회된 건수: {totalRecords}건 | 총 구매액:{' '}
        <span className={styles['amount']}>
        ₩{totalAmount.toLocaleString()}
    </span>
</div>

    </div>
  </div>

  {/* 오른쪽: 엑셀 버튼 */}
  <button className={styles['excel-download-btn']} onClick={handleExcelDownload}>
    <img src={excelIcon} alt="엑셀 아이콘" style={{ width: '16px', height: '16px', marginRight: '5px' }} />
    엑셀다운로드
  </button>
</div>


        <div className={styles['purchase-content']}>
          <div className={styles['filter-buttons']}>
            {filters.map((filter) => (
              <button
                key={filter}
                // 4. 동적 className도 대괄호 표기법을 사용하여 적용
                className={`${styles['filter-btn']} ${activeFilter === filter ? styles['active'] : ""}`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <table className={styles['purchase-table']}>
            <thead>
              <tr>
                <th>상품명</th>
                <th>수량</th>
                <th>낙찰가</th>
                <th>낙찰일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={styles['product-name']}>{item.productName}</div>
                    <div className={styles['product-description']}>{item.description}</div>
                  </td>
                  <td>{item.quantity}</td>
                  <td className={styles['price']}>₩{item.price.toLocaleString()}</td>
                  <td className={styles['date']}>{item.date}</td>
                  <td>
                    <span className={`${styles['status-badge']} ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default PurchaseHistoryPage;
