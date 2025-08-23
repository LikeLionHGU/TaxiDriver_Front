"use client";

import React, { useState } from "react";
// import { Search } from "lucide-react";
import ProductDetailModal from "./ProductDetailModal";
import PendingReviewModal from "./PendingReviewModal";
import RejectedModal from "./RejectedModal";
import styles from "./styles/product-table.module.css";

export default function ProducerMainTable({
  products,
  onStatusChange,
  searchTerm,
  setSearchTerm,
  selectedPeriod,
  setSelectedPeriod,
}) {
  const [modal, setModal] = useState({ open: false, kind: null, product: null });

  const statusConfig = {
    pending: { label: "검토중", className: styles.statusPending },
    approved: { label: "승인완료", className: styles.statusApproved },
    rejected: { label: "승인거부", className: styles.statusRejected },
  };

  const getStatusBadge = (status) => {
    const cfg = statusConfig[status] || statusConfig.pending;
    return <span className={`${styles.statusBadge} ${cfg.className}`}>{cfg.label}</span>;
  };

  const openDetail = (product) => {
    const kind =
      product.status === "approved"
        ? "approved"
        : product.status === "rejected"
        ? "rejected"
        : "pending";
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
      <td className={styles.price}>{`₩${product.price.toLocaleString()}`}</td>
      <td>{product.origin}</td>
      <td>{getStatusBadge(product.status)}</td>
      <td>{product.registrationDate}</td>
      <td>
        <button className={styles.detailBtn} onClick={() => openDetail(product)}>
          상세보기
        </button>
      </td>
    </tr>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader} style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="relative">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
            <input
              type="text"
              placeholder="수산물을 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                display: 'flex',
                width: '300.5px',
                height: '20.208px',
                padding: '12px 17px',
                alignItems: 'center',
                gap: '12px',
                flexShrink: 0,
                borderRadius: '10px',
                border: '1px solid #D9D9D9',
                paddingLeft: '40px'
              }}
            />
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              width: '192.961px',
              height: '45.208px',
              flexShrink: 0,
              borderRadius: '10px',
              border: '1px solid #D9D9D9',
              background: '#FFF',
              padding: '12px 17px'
            }}
          >
            <option value="기간 선택">기간 선택</option>
            <option value="1주일">1주일</option>
            <option value="1개월">1개월</option>
            <option value="3개월">3개월</option>
            <option value="6개월">6개월</option>
            <option value="1년">1년</option>
          </select>
        </div>
      </div>
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
              <th>수산물정보</th>
              <th>최저 수락가</th>
              <th>생산자</th>
              <th>승인 현황</th>
              <th>등록일</th>
              <th>등록 상세</th>
            </tr>
          </thead>
          {(!products || products.length === 0) ? (
            <tbody>
              <tr>
                <td colSpan="6" className={styles.emptyState}>
                  <p>등록된 상품이 없습니다.</p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>{rows}</tbody>
          )}
        </table>
      </div>

      {modal.kind === "approved" && (
        <ProductDetailModal open={modal.open} onClose={closeModal} product={modal.product} isApproved={true} />
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