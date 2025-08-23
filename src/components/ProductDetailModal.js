"use client";
import React from "react";
import Modal from "./Modal";
import styles from "./styles/modal.module.css";

export default function ProductDetailModal({ open, onClose, product, isApproved }) {
  if (!product) return null;

  const h = React.createElement;
  const kvItem = (k, v) => h("li", null, h("span", null, k), h("strong", null, v));

  // 재사용: 제목은 밖, 내용은 카드 안, 그리고 한 덩어리로 "div.cardGroup"에 담기
  const cardBlock = (title, content, { full = false } = {}) =>
    h(
      "div",
      { className: full ? `${styles.cardGroup} ${styles.cardGroupFull}` : styles.cardGroup },
      h("h3", { className: styles.cardTitleOutside }, title),
      h("section", { className: styles.card }, content)
    );

  const grid = h(
    "div",
    { className: styles.grid },

    // 기본 정보
    cardBlock(
      "기본 정보",
      h("ul", { className: styles.kv },
        kvItem("어종", product.name),
        kvItem("포장단위", product.origin),
        kvItem("어획일", product.caughtAt || "2025.05.14"),
        kvItem("어획지역", product.area || "동해 북부 일대")
      )
    ),

    // 가격정보
    cardBlock(
      "가격정보",
      h("ul", { className: styles.kv },
        kvItem("최저 수락가", `₩${product.price.toLocaleString()}`),
        kvItem("어제 시세", `₩${(product.yesterday || 33000).toLocaleString()}`),
        kvItem("7일 평균", `₩${(product.avg7d || 31500).toLocaleString()}`)
      )
    ),

    // AI 분석결과(질병) - 가로 배치로 수정
    cardBlock(
      "AI 분석결과",
      h("div", { className: styles.aiAnalysisContent }, // New wrapper div
        h("div", { className: styles.scoreWrap },
          h("div", { className: styles.scoreLabel }, "승인"), // Changed from "정상" to "승인"
          h("div", { className: styles.scoreValue }, String(product.aiScore)),
          h("div", { className: styles.progressWrap },
            h("div", { className: styles.progress },
              h("span", { style: { width: `${Math.min(100, product.aiScore)}%` } })
            ),
            h("div", { className: styles.progressLabels },
              ["0","25","50","75","100"].map((t,i)=>h("span",{key:i},t))
            )
          )
        ),
        h("p", { className: styles.noteText },
          product.aiAnalysisText
        )
      ),
      { full: true } // Add full: true here
    )
  );

  // 상품 사진
  const hasPhotos = Array.isArray(product.photos) && product.photos.length > 0;
  const photos = hasPhotos
    ? product.photos.map((src, i) =>
        h("img", { key: i, src, alt: `${product.name} 사진 ${i + 1}` })
      )
    : null;

  const bottom = cardBlock(
    "상품 사진",
    h("div", { className: styles.photoArea }, photos),
    { full: true } // 한 줄 전체 사용
  );

  return h(
    Modal,
    { open, onClose, title: "상품 상세 검토" },
    h(React.Fragment, null, grid, bottom)
  );
}