"use client";

import React, { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import PendingReviewModal from "./PendingReviewModal";   
import RejectedModal from "./RejectedModal";             
import styles from "./styles/product-table.module.css";

export default function ProductTable({ products, onStatusChange }) {
  const [modal, setModal] = useState({ open: false, kind: null, product: null });

  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>등록된 상품이 없습니다.</p>
      </div>
    );
  }

  const statusConfig = {
    pending:  { label: "검토중",  className: styles.statusPending },
    approved: { label: "승인완료", className: styles.statusApproved },
    rejected: { label: "승인거부", className: styles.statusRejected },
  };

  const getStatusBadge = (status) => {
    const cfg = statusConfig[status] || statusConfig.pending;
    return <span className={`${styles.statusBadge} ${cfg.className}`}>{cfg.label}</span>;
  };

  const openDetail = (product) => {
    // 상태에 따라 모달 종류 결정
    const kind =
      product.status === "approved"
        ? "approved"
        : product.status === "rejected"
        ? "rejected"
        : "pending"; // default
    setModal({ open: true, kind, product });
  };

  const closeModal = () => setModal({ open: false, kind: null, product: null });

  const rows = products.map((product) => (
    <tr key={product.id} className={styles.tableRow}>
      <td>
        <div className={styles.productInfo}>
          <strong>{product.name}</strong>
          <span className={styles.productWeight}>{`${product.category} | ${product.weight}`}</span>
        </div>
      </td>
      <td className={styles.testResult}>{product.testResult}</td>
      <td className={styles.price}>{`₩${product.price.toLocaleString()}`}</td>
      <td>{product.origin}</td>
      <td>{getStatusBadge(product.status)}</td>
      <td>
        <button className={styles.detailBtn} onClick={() => openDetail(product)}>
          상세보기
        </button>
      </td>
    </tr>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader} />
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <colgroup>
            <col style={{ width: "28%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "12%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>수산물 정보</th>
              <th>검사 결과</th>
              <th>최저 수락가</th>
              <th>생산자</th>
              <th>승인 현황</th>
              <th>등록 상세</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      {/* 상태별 모달 렌더링 */}
      {modal.kind === "approved" && (
        <ProductDetailModal open={modal.open} onClose={closeModal} product={modal.product} />
      )}
      {modal.kind === "pending" && (
        <PendingReviewModal open={modal.open} onClose={closeModal} product={modal.product} />
      )}
      {modal.kind === "rejected" && (
        <RejectedModal open={modal.open} onClose={closeModal} product={modal.product} />
      )}
    </div>
  );
}
