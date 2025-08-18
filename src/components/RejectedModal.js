// RejectedModal.js
"use client";
import React from "react";
import Modal from "./Modal";

export default function RejectedModal({ open, onClose, product }) {
  if (!product) return null;
  return (
    <Modal open={open} onClose={onClose} title="승인거부 - 상세">
      <div style={{ padding: 8 }}>
        <p><strong>{product.name}</strong> (승인거부)</p>
        <p>사유: {product.rejectedReason || "사유가 입력되지 않았습니다."}</p>
      </div>
    </Modal>
  );
}
