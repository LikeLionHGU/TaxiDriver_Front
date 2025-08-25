"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import styles from "./styles/modal.module.css";
import pendingIcon from "../assets/검토중.svg"; 

export default function PendingReviewModal({ open, onClose, product, onApprove, onReject, hideApprovalButtons }) {
  const [showRejectionReasonInput, setShowRejectionReasonInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  if (!product) return null;

  const h = React.createElement;
  const kvItem = (k, v) => h("li", null, h("span", null, k), h("strong", null, v));

  // 제목은 카드 밖, 내용을 카드 안 + 그리드 아이템으로 묶기
  const cardBlock = (title, content, { full = false } = {}) =>
    h(
      "div",
      { className: full ? `${styles.cardGroup} ${styles.cardGroupFull}` : styles.cardGroup },
      h("h3", { className: styles.cardTitleOutside }, title),
      h("section", { className: styles.card }, content)
    );

  // 상단 2칸: 기본정보 / 가격정보
  const grid = h(
    "div",
    { className: styles.grid },

    cardBlock(
      "기본 정보",
      h("ul", { className: styles.kv },
        kvItem("어종", product.applicant),
        kvItem("포장단위", product.applicationDate),
      )
    ),

    cardBlock(
      "가격정보",
      h("ul", { className: styles.kv },
        kvItem("최저 수락가", `₩${product.price?.toLocaleString?.() ?? "-"}`),
      )
    ),

    // 가운데 넓은 2칸: AI 분석결과 (로딩 상태)
    cardBlock(
      "AI 분석결과",
      product.aiAnalysisResult ? (
        h("div", { className: styles.aiAnalysisContent },
          h("div", { className: styles.scoreWrap },
            h("div", { className: styles.rejectBadge }, "질병 감지"),
            h("div", { className: styles.rejectValue }, String(product.aiAnalysisResult.diseasePercentage)),
            h("div", { className: styles.progressWrap },
              h("div", { className: `${styles.progress} ${styles.progressDanger}` },
                h("span", { style: { width: `${Math.min(100, product.aiAnalysisResult.diseasePercentage)}%` } })
              ),
              h("div", { className: styles.progressLabels },
                ["0","25","50","75","100"].map((t,i)=>h("span",{key:i},t))
              )
            )
          ),
          h("p", { className: styles.noteText },
            product.aiAnalysisResult.diseaseDescription
          )
        )
      ) : (
        h(
          "div",
          { className: styles.pendingWrap },
          h("div", { className: styles.spinner }),
          h('img', { src: pendingIcon, alt: '검토중', className: styles.pendingIcon }),
          h("p", { className: styles.pendingText }, "AI 검토 중, 잠시만 기다려주세요.")
        )
      ),
      { full: true }
    ),
  );

  // 하단: 상품 사진(없으면 비워둠)
  const hasImage = product.imageUrl; // Check for imageUrl
  const imageElement = hasImage
    ? h("img", { src: product.imageUrl, alt: `${product.applicant} 사진`, className: styles.productImage })
    : h("p", null, "등록된 상품 사진이 없습니다."); // Message if no image

  const bottom = cardBlock(
    "상품 사진",
    h("div", { className: styles.photoArea }, imageElement),
    { full: true }
  );

  const handleRejectClick = () => {
    setShowRejectionReasonInput(true);
  };

  const handleConfirmReject = () => {
    if (onReject && product && product.id) {
      onReject(product.id, rejectionReason);
    }
    onClose();
    setShowRejectionReasonInput(false);
    setRejectionReason('');
  };

  const actionButtons = showRejectionReasonInput
    ? h(
        "div",
        { style: { display: 'flex', justifyContent: 'space-between', marginTop: '20px' } },
        h(
          "button",
          {
            onClick: () => setShowRejectionReasonInput(false),
            style: {
              width: "408.241px",
              height: "50px",
              borderRadius: "10px",
              background: "#6B7280", // Grey for cancel
              color: "white",
              border: "none",
              cursor: "pointer",
            },
          },
          "취소"
        ),
        h(
          "button",
          {
            onClick: handleConfirmReject,
            style: {
              width: "408.924px",
              height: "50px",
              borderRadius: "10px",
              background: "#FF4D4F", // Red for confirm reject
              color: "white",
              border: "none",
              cursor: "pointer",
            },
          },
          "반려"
        ),
      )
    : h(
        "div",
        { style: { display: 'flex', justifyContent: 'space-between', marginTop: '20px' } },
        h(
          "button",
          {
            onClick: handleRejectClick, // Changed to show input
            style: {
              width: "408.924px",
              height: "50px",
              borderRadius: "10px",
              background: "#6B7280",
              color: "white",
              border: "none",
              cursor: "pointer",
            },
          },
          "반려"
        ),
        h(
          "button",
          {
            onClick: onApprove, // Call onApprove prop
            style: {
              width: "408.241px",
              height: "50px",
              borderRadius: "10px",
              background: "#07F",
              color: "white",
              border: "none",
              cursor: "pointer",
            },
          },
          "승인"
        )
      );

  const rejectionReasonTextarea = showRejectionReasonInput
    ? h(
        "textarea",
        {
          placeholder: "반려 사유를 입력하세요.",
          value: rejectionReason,
          onChange: (e) => setRejectionReason(e.target.value),
          style: {
            width: "836.006px",
            height: "169.021px",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "10px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "vertical",
          },
        }
      )
    : null;

  return h(
    Modal,
    { open, onClose, title: "상품 상세 검토" },
    h(React.Fragment, null, grid, bottom, rejectionReasonTextarea, !hideApprovalButtons && actionButtons)
  );
}
