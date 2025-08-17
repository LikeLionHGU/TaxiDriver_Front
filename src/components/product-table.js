"use client"

import { useState } from "react"
import styles from "./styles/product-table.module.css"

export default function ProductTable({ products, onStatusChange }) {
  const [selectedProducts, setSelectedProducts] = useState([])

  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>등록된 상품이 없습니다.</p>
      </div>
    )
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "검토중", className: styles.statusPending },
      approved: { label: "승인완료", className: styles.statusApproved },
      rejected: { label: "승인거부", className: styles.statusRejected },
    }

    const config = statusConfig[status] || statusConfig.pending
    return <span className={`${styles.statusBadge} ${config.className}`}>{config.label}</span>
  }

  // const handleSelectProduct = (productId) => {
  //   setSelectedProducts((prev) =>
  //     prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
  //   )
  // }

  const handleBulkApprove = async () => {
    for (const productId of selectedProducts) {
      await onStatusChange(productId, "approved")
    }
    setSelectedProducts([])
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
       
        {selectedProducts.length > 0 && (
          <button className={styles.bulkActionBtn} onClick={handleBulkApprove}>
            선택한 {selectedProducts.length}개 승인
          </button>
        )}
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <colgroup>
          {/* 수산물 정보 / 검사 결과 / 최저 수락가 / 생산자 / 등록 상세 / 승인 현황 */}
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
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className={styles.tableRow}>
                <td>
                  <div className={styles.productInfo}>
                    <strong>{product.name}</strong>
                    <span className={styles.productWeight}>
                      {product.category} | {product.weight}
                    </span>
                  </div>
                </td>
                <td className={styles.testResult}>{product.testResult}</td>
                <td className={styles.price}>₩{product.price.toLocaleString()}</td>
                <td>{product.origin}</td>
                <td>{getStatusBadge(product.status)}</td>
                <td>
                  <button className={styles.detailBtn}>상세보기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
