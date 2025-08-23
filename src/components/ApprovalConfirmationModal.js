import React from "react";
import Modal from "./Modal";
import styles from "./styles/ApprovalConfirmationModal.module.css";

export default function ApprovalConfirmationModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="상품이 승인되었습니다.">
      <div className={styles.content}>
        <p className={styles.subtitle}>10분 후 자동으로 경매에 등록됩니다.</p>
        <button className={styles.confirmButton} onClick={onClose}>
          확인
        </button>
      </div>
    </Modal>
  );
}
