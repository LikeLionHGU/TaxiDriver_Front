"use client"

import React, { useState} from "react"
import "../styles/Purchasehistory.css"
import logo from "../assets/logo.svg";
import excelIcon from "../assets/excel.svg";

const PurchaseHistoryPage = () => {
  // const [setActiveTab] = useState("구매 내역")
  const [activeFilter, setActiveFilter] = useState("전체")

  // Sample purchase data
  const purchaseData = [
    {
      id: 1,
      productName: "포항 대게",
      description: "18kg | 인증:PH45678",
      quantity: "30마리",
      price: 250000,
      date: "2025. 8. 9.",
      status: "수령대기",
    },
    {
      id: 2,
      productName: "포항 대게",
      description: "18kg | 인증:PH45678",
      quantity: "100마리",
      price: 85000,
      date: "2025. 8. 10.",
      status: "수령완료",
    },
    {
      id: 3,
      productName: "포항 대게",
      description: "18kg | 인증:PH45678",
      quantity: "200마리",
      price: 120000,
      date: "2025. 8. 11.",
      status: "수령대기",
    },
    {
      id: 4,
      productName: "포항 대게",
      description: "18kg | 인증:PH45678",
      quantity: "80마리",
      price: 95000,
      date: "2025. 8. 12.",
      status: "수령완료",
    },
  ]

  //const tabs = ["로고", "실시간 경매", "수령현황", "구매 내역"]
  const filters = ["전체", "최근 1주", "최근 1개월", "최근 3개월"]

  // Calculate totals
  const totalRecords = purchaseData.length
  const totalAmount = purchaseData.reduce((sum, item) => sum + item.price, 0)

  // Filter data based on active filter
  const filteredData =
  activeFilter === "전체" ? purchaseData : purchaseData;


  // const handleTabClick = (tab) => {
  //   setActiveTab(tab)
  // }

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

  const getStatusClass = (status) => {
    switch (status) {
      case "수령완료":
        return "status-completed"
      case "처리중":
        return "status-processing"
      case "대기중":
        return "status-pending"
      case "취소됨":
        return "status-cancelled"
      default:
        return "status-completed"
    }
  }

return (
  <div className="purchase-history-container">
    {/* Purchase section */}
    <div className="purchase-section">
      {/* Section header */}
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <img
              src={logo}
              alt="로고"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "8px",
                verticalAlign: "middle",
              }}
            />
            구매 내역
          </h2>
          <div className="purchase-stats">
            조회된 건수: {totalRecords}건 | 총 구매액: ₩{totalAmount.toLocaleString()}
          </div>
        </div>
        <button className="excel-download-btn" onClick={handleExcelDownload}>
          <img
            src={excelIcon}
            alt="엑셀 아이콘"
            style={{ width: "16px", height: "16px", marginRight: "5px" }}
          />
          엑셀다운로드
        </button>
      </div>

      <div className="purchase-content">
        {/* Filter buttons */}
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Purchase table */}
        <table className="purchase-table">
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
                  <div className="product-name">{item.productName}</div>
                  <div className="product-description">{item.description}</div>
                </td>
                <td>{item.quantity}</td>
                <td className="price">₩{item.price.toLocaleString()}</td>
                <td className="date">{item.date}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(item.status)}`}>
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
export default PurchaseHistoryPage