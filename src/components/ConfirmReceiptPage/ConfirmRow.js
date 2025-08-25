import React, { useState, useEffect, useCallback } from "react";
import styles from "./ConfirmRow.module.css";
import ConfirmDetailModal from "../Modal/ConfirmDetailModal";
import { useAuth, ROLES } from "../../auth/AuthContext";

const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

// 수령 상태 Pill
function ReceivePill({ state , onClick }) {
  const map = {
    WAITING: { label: "수령대기", bg: "none", color: "#000", border: "#2775E7" },
    DONE:    { label: "수령완료", bg: "#E5E5E5", color: "#757575", border: "none" },
  };
  const s = map[state] ?? map.WAITING;
  return (
    <button
      type="button"
      className={styles.statusPill}
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
      
      onClick={onClick} 
    >
      {s.label}
    </button>
  );
}

function ConfirmRow({ item }) {
  const [open, setOpen] = useState(false);
  const { role } = useAuth();
  const canOpen = role === ROLES.GUARDIAN;

  const openModal = useCallback(() => {
    if (!canOpen) return;
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, [canOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.removeProperty("overflow");
  }, []);

  // 언마운트 시 안전하게 복구
  useEffect(() => {
    return () => document.body.style.removeProperty("overflow");
  }, []);

  return (
    <>
    <div className={styles.row} role="row">
      {/* 수산물 정보 */}
      <div className={styles.productCell}>
        <div className={styles.productName}>{item.productName}</div>
        <div className={styles.subText}>{item.origin} | {item.weight}</div>
      </div>

      {/* 낙찰 금액 */}
      <div className={styles.priceCell}>{formatKRW(item.bidPrice)}</div>

      {/* 구매자 / 판매자 */}
      <div className={styles.buyerCell}>{item.buyerName}</div>
      <div className={styles.sellerCell}>{item.sellerName}</div>

      {/* 수령 장소 */}
      <div className={styles.placeCell}>{item.pickupPlace}</div>

      {/* 수령 기한(날짜/시간) */}
      <div className={styles.dueCell}>
        <div className={styles.dueDate}>{item.dueDate}</div>
        <div className={styles.dueTime}>{item.dueTime}</div>
      </div>

      {/* 수령 상태 */}
      <div className={styles.statusCell} >
        <ReceivePill state={item.receiveStatus} onClick={openModal} />
      </div>
    </div>

    <ConfirmDetailModal
        open={open}
        close={closeModal}
        item={item}
        onConfirm={(updated) => {
          console.log("확인 클릭!", updated || item);
          closeModal();
        }}
      />

      </>
  );
}
export default ConfirmRow;
