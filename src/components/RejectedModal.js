// RejectedModal.jsx
"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styles from "./styles/modal.module.css";

export default function RejectedModal({ open, onClose, product, onSave }) {
  // 훅(Hook)들을 컴포넌트 최상단으로 이동시켜 항상 동일한 순서로 호출되도록 합니다.
  const [reason, setReason] = useState(product?.rejectedReason ?? "");

  // 제품이 바뀔 때 동기화
  useEffect(() => {
    // product가 실제로 존재할 때만 상태를 업데이트하도록 방어 로직을 추가합니다.
    if (product) {
      setReason(product.rejectedReason ?? "");
    }
  }, [product]);

  // product가 없으면 훅 호출 이후에 컴포넌트 렌더링을 중단합니다.
  if (!product) return null;

  const h = React.createElement;

  const kvItem = (k, v) => h("li", null, h("span", null, k), h("strong", null, v));

  // 카드 빌더
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
        kvItem("어획지역", product.area || "동해 북부 일대"),
      )
    ),

    // 가격정보
    cardBlock(
      "가격정보",
      h("ul", { className: styles.kv },
        kvItem("최저 수락가", `₩${product.price?.toLocaleString?.() ?? "-"}`),
        kvItem("어제 시세", `₩${(product.yesterday || 33000).toLocaleString()}`),
        kvItem("7일 평균", `₩${(product.avg7d || 31500).toLocaleString()}`),
      )
    ),

    // AI 분석결과
    cardBlock(
      "AI 분석결과",
      h(React.Fragment, null,
        h("div", { className: styles.scoreWrap },
          h("div", { className: styles.rejectBadge }, "질병 감지"),
          h("div", { className: styles.rejectValue }, String(product.aiScore ?? 13.0)),
          h("div", { className: styles.progressWrap },
            h("div", { className: `${styles.progress} ${styles.progressDanger}` },
              h("span", { style: { width: `${Math.min(100, product.aiScore ?? 13)}%` } })
            ),
            h("div", { className: styles.progressLabels },
              ["0","25","50","75","100"].map((t,i)=>h("span",{key:i},t))
            )
          )
        ),
        h("p", { className: styles.noteText },
          "학습된 질병 데이터의 평균 특징과 91.3만큼 떨어져 있습니다. 일반적인 질병패턴의 범위를 벗어나 정상일 가능성이 높습니다."
        )
      )
    )
  );

  // 상품 사진
  const hasPhotos = Array.isArray(product.photos) && product.photos.length > 0;
  const photos = hasPhotos ? product.photos.map((src, i) =>
    h("img", { key: i, src, alt: `${product.name} 사진 ${i + 1}` })
  ) : null;

  const bottom = cardBlock("상품 사진", h("div", { className: styles.photoArea }, photos), { full: true });

  // 반려 사유: 입력만
const rejectReason = cardBlock(
  "반려 사유",
  h("textarea", {
    className: styles.rejectReasonInput,
    placeholder: "반려 사유를 입력하세요...",
    value: reason,
    onChange: (e) => setReason(e.target.value),
  }),
  { full: true }
);

// 하단 확인 버튼 (전체 폭)
const confirmBar = h(
  "div",
  { className: styles.modalFooter },
  h(
    "button",
    {
      className: styles.confirmBtn,
      onClick: () => {
        if (typeof onSave === "function") {
          onSave({ ...product, rejectedReason: reason });
        }
        onClose?.();
      },
    },
    "확인"
  )
);

return h(
  Modal,
  { open, onClose, title: "승인거부 - 상세" },
  h(React.Fragment, null, grid, bottom, rejectReason, confirmBar)
);
}