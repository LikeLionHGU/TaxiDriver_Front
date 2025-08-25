"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import styles from "./styles/modal.module.css";

export default function ProductDetailModal({ open, onClose, product, isApproved, apiUrl }) {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && product && product.id) {
      const fetchProductDetails = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(
            `${apiUrl}${product.id}`,
            { withCredentials: true }
          );
          setProductDetails(response.data);
        } catch (err) {
          setError("Failed to fetch product details.");
          console.error("API Error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    } else if (!open) {
      // Reset state when modal closes
      setProductDetails(null);
      setLoading(true);
      setError(null);
    }
  }, [open, product, apiUrl]);

  if (!open) return null;

  const h = React.createElement;
  const kvItem = (k, v) => h("li", null, h("span", null, k), h("strong", null, v));

  const cardBlock = (title, content, { full = false } = {}) =>
    h(
      "div",
      { className: full ? `${styles.cardGroup} ${styles.cardGroupFull}` : styles.cardGroup },
      h("h3", { className: styles.cardTitleOutside }, title),
      h("section", { className: styles.card }, content)
    );

  if (loading) {
    return h(Modal, { open, onClose, title: "상품 상세 검토" }, h("p", null, "로딩 중..."));
  }

  if (error) {
    return h(Modal, { open, onClose, title: "상품 상세 검토" }, h("p", { className: styles["error-message"] }, error));
  }

  if (!productDetails) {
    return h(Modal, { open, onClose, title: "상품 상세 검토" }, h("p", null, "데이터를 불러올 수 없습니다."));
  }

  const grid = h(
    "div",
    { className: styles.grid },

    // 기본 정보
    cardBlock(
      "기본 정보",
      h("ul", { className: styles.kv },
        kvItem("상품명", productDetails.name),
        kvItem("판매 방식", productDetails.salesMethod),
        kvItem("등록일", new Date(productDetails.registeredDate).toLocaleDateString()),
        kvItem("원산지", productDetails.origin)
      )
    ),

    // 가격정보 (최저 수락가만 표시)
    cardBlock(
      "가격정보",
      h("ul", { className: styles.kv },
        kvItem("최저 수락가", productDetails.reservedPrice ? `₩${productDetails.reservedPrice.toLocaleString()}` : "N/A")
      )
    ),

    // AI 분석결과 및 사유
    cardBlock(
      "AI 분석결과",
      h("div", { className: styles.aiAnalysisContent },
        h("p", { className: styles.noteText }, productDetails.aiEvaluation), // AI Evaluation (위에꺼)
        h("p", { className: styles.noteText }, productDetails.reason) // Reason (밑에꺼)
      ),
      { full: true }
    )
  );

  // 거절 사유 (승인 거절일 경우에만 표시)
  const rejectReasonBlock = productDetails.registerStatus === 'REJECTED' && productDetails.rejectReason
    ? cardBlock(
        "거절 사유",
        h("p", { className: styles.noteText }, productDetails.rejectReason),
        { full: true }
      )
    : null;

  // 상품 사진
  const hasPhotos = Array.isArray(productDetails.images) && productDetails.images.length > 0;
  const photos = hasPhotos
    ? productDetails.images.map((src, i) =>
        h("img", { key: i, src, alt: `Product Image ${i + 1}`, className: styles["product-image"] })
      )
    : null;

  const bottom = cardBlock(
    "상품 사진",
    h("div", { className: styles.photoArea }, photos),
    { full: true }
  );

  return h(
    Modal,
    { open, onClose, title: "상품 상세 검토" },
    h(React.Fragment, null, grid, rejectReasonBlock, bottom)
  );
}