"use client"

import React, { useState } from "react"
// 1. CSS 모듈 import 방식은 그대로 유지합니다.
import styles from "../styles/Purchasehistory.module.css"
// SVG 파일 import 방식은 사용자의 환경에 따라 다를 수 있습니다.
// .src가 필요 없는 환경일 수 있으므로 원래대로 되돌립니다.
import excelIcon from "../assets/excel.svg";
import logo from "../assets/logo.svg";

const PurchaseHistoryPage = () => {
  const [activeFilter, setActiveFilter] = useState("전체")
  const [checkedItems, setCheckedItems] = useState({}) // 체크박스 상태 관리

  // Sample purchase data
  const purchaseData = [
    {
      id: 1,
      productName: "대게",
      description: "포항",
      quantity: "30마리",
      price: 250000,
      date: "2025. 8. 9.",
    },
    {
      id: 2,
      productName: "대게",
      description: "포항",
      quantity: "100마리",
      price: 85000,
      date: "2025. 8. 10.",
    },
    {
      id: 3,
      productName: "대게",
      description: "포항",
      quantity: "200마리",
      price: 120000,
      date: "2025. 8. 11.",
    },
    {
      id: 4,
      productName: "대게",
      description: "포항",
      quantity: "80마리",
      price: 95000,
      date: "2025. 8. 12.",
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

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  // 전체 선택/해제 핸들러
  const handleSelectAll = (isChecked) => {
    const newCheckedItems = {}
    if (isChecked) {
      filteredData.forEach(item => {
        newCheckedItems[item.id] = true
      })
    }
    setCheckedItems(newCheckedItems)
  }

  // 전체 선택 여부 확인
  const isAllChecked = filteredData.length > 0 && filteredData.every(item => checkedItems[item.id])
  const isIndeterminate = filteredData.some(item => checkedItems[item.id]) && !isAllChecked

  const handleExcelDownload = () => {
    const csvContent = [
      ["상품명", "수량", "낙찰가", "낙찰일"],
      ...filteredData.map((item) => [
        `${item.productName} (${item.description})`,
        item.quantity,
        `₩${item.price.toLocaleString()}`,
        item.date,
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
        구매한 상품 내역을 한눈에 보고, 엑셀파일로 쉽게 관리하세요.
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
                <th className={styles['checkbox-column']}>
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    ref={input => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className={styles['checkbox']}
                  />
                </th>
                <th>상품명</th>
                <th>수량</th>
                <th>낙찰가</th>
                <th>낙찰일</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className={styles['checkbox-column']}>
                    <input
                      type="checkbox"
                      checked={checkedItems[item.id] || false}
                      onChange={() => handleCheckboxChange(item.id)}
                      className={styles['checkbox']}
                    />
                  </td>
                  <td>
                    <div className={styles['product-name']}>{item.productName}</div>
                    <div className={styles['product-description']}>{item.description}</div>
                  </td>
                  <td>{item.quantity}</td>
                  <td className={styles['price']}>₩{item.price.toLocaleString()}</td>
                  <td className={styles['date']}>{item.date}</td>
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