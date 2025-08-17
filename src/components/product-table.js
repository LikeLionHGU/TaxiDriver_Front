"use client";

import React, { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import styles from "./styles/product-table.module.css";

export default function ProductTable({ products, onStatusChange }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);

  if (!products || products.length === 0) {
    return React.createElement(
      "div",
      { className: styles.emptyState },
      React.createElement("p", null, "등록된 상품이 없습니다.")
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "검토중", className: styles.statusPending },
      approved: { label: "승인완료", className: styles.statusApproved },
      rejected: { label: "승인거부", className: styles.statusRejected },
    };
    const cfg = statusConfig[status] || statusConfig.pending;
    return React.createElement(
      "span",
      { className: `${styles.statusBadge} ${cfg.className}` },
      cfg.label
    );
  };

  const openDetail = (product) => {
    setDetailProduct(product);
    setDetailOpen(true);
  };

  // 테이블 행들
  const rows = products.map((product) =>
    React.createElement(
      "tr",
      { key: product.id, className: styles.tableRow },
      React.createElement(
        "td",
        null,
        React.createElement(
          "div",
          { className: styles.productInfo },
          React.createElement("strong", null, product.name),
          React.createElement(
            "span",
            { className: styles.productWeight },
            `${product.category} | ${product.weight}`
          )
        )
      ),
      React.createElement("td", { className: styles.testResult }, product.testResult),
      React.createElement("td", { className: styles.price }, `₩${product.price.toLocaleString()}`),
      React.createElement("td", null, product.origin),
      React.createElement("td", null, getStatusBadge(product.status)),
      React.createElement(
        "td",
        null,
        React.createElement(
          "button",
          { className: styles.detailBtn, onClick: () => openDetail(product) },
          "상세보기"
        )
      )
    )
  );

  return React.createElement(
    "div",
    { className: styles.container },
    React.createElement("div", { className: styles.tableHeader }),
    React.createElement(
      "div",
      { className: styles.tableWrapper },
      React.createElement(
        "table",
        { className: styles.table },
        React.createElement(
          "colgroup",
          null,
          React.createElement("col", { style: { width: "28%" } }),
          React.createElement("col", { style: { width: "18%" } }),
          React.createElement("col", { style: { width: "14%" } }),
          React.createElement("col", { style: { width: "16%" } }),
          React.createElement("col", { style: { width: "12%" } }),
          React.createElement("col", { style: { width: "12%" } })
        ),
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement("th", null, "수산물 정보"),
            React.createElement("th", null, "검사 결과"),
            React.createElement("th", null, "최저 수락가"),
            React.createElement("th", null, "생산자"),
            React.createElement("th", null, "승인 현황"),
            React.createElement("th", null, "등록 상세")
          )
        ),
        React.createElement("tbody", null, rows)
      )
    ),
    React.createElement(ProductDetailModal, {
      open: detailOpen,
      onClose: () => setDetailOpen(false),
      product: detailProduct,
    })
  );
}
