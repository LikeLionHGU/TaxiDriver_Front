"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles/modal.module.css";

export default function Modal({ open, onClose, title, children }) {
  //  항상 실행
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // 렌더링만 조건 분기
  if (!open) return null;

  const body = React.createElement(
    "div",
    { className: styles.overlay, onClick: onClose, role: "presentation" },
    React.createElement(
      "div",
      {
        className: styles.modal,
        role: "dialog",
        "aria-modal": true,
        "aria-labelledby": "modal-title",
        onClick: (e) => e.stopPropagation(),
      },
      React.createElement(
        "div",
        { className: styles.header },
        React.createElement("h2", { id: "modal-title", className: styles.title }, title),
        React.createElement(
          "button",
          { className: styles.closeBtn, onClick: onClose, "aria-label": "닫기" },
          "×"
        )
      ),
      React.createElement("div", { className: styles.body }, children)
    )
  );

  return createPortal(body, document.body);
}
