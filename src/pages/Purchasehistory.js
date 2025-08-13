"use client"

import React, { useState} from "react"
import "../styles/Purchasehistory.css"
import logo from "../assets/logo.svg";
import excelIcon from "../assets/excel.svg";

const PurchaseHistoryPage = () => {
  const [activeTab, setActiveTab] = useState("구매 내역")
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

  const tabs = ["로고", "실시간 경매", "수령현황", "구매 내역"]
  const filters = ["전체", "최근 1주", "최근 1개월", "최근 3개월"]

  // Calculate totals
  const totalRecords = purchaseData.length
  const totalAmount = purchaseData.reduce((sum, item) => sum + item.price, 0)

  // Filter data based on active filter
  const filteredData =
  activeFilter === "전체" ? purchaseData : purchaseData;


  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

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

  return React.createElement(
    "div",
    { className: "purchase-history-container" },
    // Navigation tabs
    React.createElement(
      "div",
      { className: "nav-tabs" },
      tabs.map((tab) =>
        React.createElement(
          "button",
          {
            key: tab,
            className: `nav-tab ${activeTab === tab ? "active" : ""}`,
            onClick: () => handleTabClick(tab),
          },
          tab,
        ),
      ),
    ),

    // Purchase section
    React.createElement(
      "div",
      { className: "purchase-section" },
      // Section header
      React.createElement(
        "div",
        { className: "section-header" },
        React.createElement(
          "div",
          null,
          React.createElement(
        "h2",
        { className: "section-title" },
        React.createElement("img", {
            src: logo,
            alt: "로고",
            style: { width: "20px", height: "20px", marginRight: "8px", verticalAlign: "middle" }
        }),
        "구매 내역"
        )
,
          React.createElement(
            "div",
            { className: "purchase-stats" },
            `조회된 건수: ${totalRecords}건 | 총 구매액: ₩${totalAmount.toLocaleString()}`,
          ),
        ),
        React.createElement(
          "button",
          {
            className: "excel-download-btn",
            onClick: handleExcelDownload,
          },
          React.createElement("img", {
            src: excelIcon,
            alt: "엑셀 아이콘",
            style: { width: "16px", height: "16px", marginRight: "5px" }
          }),
          "엑셀다운로드",
        ),
      ),

      // Filter buttons
      React.createElement(
        "div",
        { className: "filter-buttons" },
        filters.map((filter) =>
          React.createElement(
            "button",
            {
              key: filter,
              className: `filter-btn ${activeFilter === filter ? "active" : ""}`,
              onClick: () => handleFilterClick(filter),
            },
            filter,
          ),
        ),
      ),

      // Purchase table
      React.createElement(
        "table",
        { className: "purchase-table" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement("th", null, "상품명"),
            React.createElement("th", null, "수량"),
            React.createElement("th", null, "낙찰가"),
            React.createElement("th", null, "낙찰일"),
            React.createElement("th", null, "상태"),
          ),
        ),
        React.createElement(
          "tbody",
          null,
          filteredData.map((item) =>
            React.createElement(
              "tr",
              { key: item.id },
              React.createElement(
                "td",
                null,
                React.createElement("div", { className: "product-name" }, item.productName),
                React.createElement("div", { className: "product-description" }, item.description),
              ),
              React.createElement("td", null, item.quantity),
              React.createElement("td", { className: "price" }, `₩${item.price.toLocaleString()}`),
              React.createElement("td", { className: "date" }, item.date),
              React.createElement(
                "td",
                null,
                React.createElement(
                  "span",
                  {
                    className: `status-badge ${getStatusClass(item.status)}`,
                  },
                  item.status,
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  )
}

export default PurchaseHistoryPage
