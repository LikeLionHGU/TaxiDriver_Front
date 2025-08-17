"use client";
import React from "react";
import Modal from "./Modal";
import styles from "./styles/modal.module.css";

export default function ProductDetailModal({ open, onClose, product }) {
  if (!product) return null;

  const h = React.createElement;

  const kvItem = (k, v) =>
    h("li", null, h("span", null, k), h("strong", null, v));

  const grid = h(
    "div",
    { className: styles.grid },
    // 기본 정보
    h(
      "section",
      { className: styles.card },
      h("h3", { className: styles.cardTitle }, "기본 정보"),
      h(
        "ul",
        { className: styles.kv },
        kvItem("이름", product.name),
        kvItem("원산지", product.origin),
        kvItem("어획일", product.caughtAt || "2025.05.14"),
        kvItem("어획지역", product.area || "동해 북부 일대")
      )
    ),
    // 가격 정보
    h(
      "section",
      { className: styles.card },
      h("h3", { className: styles.cardTitle }, "가격정보"),
      h(
        "ul",
        { className: styles.kv },
        kvItem("최저 수락가", `₩${product.price.toLocaleString()}`),
        kvItem("어제 시세", `₩${(product.yesterday || 33000).toLocaleString()}`),
        kvItem("7일 평균", `₩${(product.avg7d || 31500).toLocaleString()}`)
      )
    ),
    // AI 점수
    h(
      "section",
      { className: styles.card },
      h("h3", { className: styles.cardTitle }, "AI 분류결과(판별)"),
      h(
        "div",
        { className: styles.scoreWrap },
        h("div", { className: styles.scoreLabel }, "정상"),
        h("div", { className: styles.scoreValue }, String(product.aiScore || 91.3)),
        h("div", { className: styles.progress }, h("span", { style: { width: "91%" } }))
      )
    ),
    // AI 판단 근거
    h(
      "section",
      { className: styles.card },
      h("h3", { className: styles.cardTitle }, "AI 판단 근거"),
      h(
        "p",
        { className: styles.note },
        "형태·색채의 기저값 범위에 정상으로 분류. 외관의 균일성, 표면 광택 정도, 손상 여부 등 항목이 정상 범위에 해당합니다."
      )
    )
  );

  const photos =
    product.photos && product.photos.length
      ? product.photos.map((src, i) =>
          React.createElement("img", {
            key: i,
            src,
            alt: `${product.name} 사진 ${i + 1}`,
          })
        )
      : React.createElement("div", { className: styles.photoPlaceholder }, "이미지가 없습니다");

  const bottom = React.createElement(
    "section",
    { className: styles.card },
    React.createElement("h3", { className: styles.cardTitle }, "상품 사진"),
    React.createElement("div", { className: styles.photoArea }, photos)
  );

  return React.createElement(
    Modal,
    { open, onClose, title: "상품 상세 검토" },
    React.createElement(React.Fragment, null, grid, bottom)
  );
}
