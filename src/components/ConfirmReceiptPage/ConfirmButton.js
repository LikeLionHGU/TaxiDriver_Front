import React, { useState } from "react";
import styles from "./ConfirmButton.module.css";

import BlueButton from "../../assets/AuctionTable/blue.svg";
import GreenButton from "../../assets/AuctionTable/green.svg";

const OPTIONS = [
  { key: "today", label: "오늘 수령", count: 1,   icon: null,        variant: "neutral" },
  { key: "waiting", label: "수령 대기",  count: 1, icon: BlueButton,  variant: "blue"    },
  { key: "complete",label: "수령 완료",  count: 1,   icon: GreenButton, variant: "green"  },
];

function ConfirmButton() {
  const [selected, setSelected] = useState("all");

  return (
    <div className={styles.selectButtonContainer} role="tablist" aria-label="상태 필터">
      {OPTIONS.map(opt => (
        <button
          key={opt.key}
          type="button"
          className={styles.selectButton}
          data-variant={opt.variant}
          data-selected={selected === opt.key}
          onClick={() => setSelected(opt.key)}
          aria-pressed={selected === opt.key}
        >
          <div className={styles.leftContainer}>
            {opt.icon && <img src={opt.icon} alt="" aria-hidden="true" />}
            <span>{opt.label}</span>
          </div>
          <div className={styles.rightContainer}>
            <span>{opt.count}</span><span>건</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ConfirmButton;
