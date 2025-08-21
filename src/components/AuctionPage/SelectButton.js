import React, { useState } from "react";
import styles from "./SelectButton.module.css";

import BlueButton from "../../assets/AuctionTable/blue.svg";
import YellowButton from "../../assets/AuctionTable/yellow.svg";
import RedButton from "../../assets/AuctionTable/red.svg";

const OPTIONS = [
  { key: "all",     label: "전체보기", count: 6,   icon: null,        variant: "neutral" },
  { key: "pending", label: "대기 중",  count: 233, icon: BlueButton,  variant: "blue"    },
  { key: "progress",label: "진행 중",  count: 2,   icon: YellowButton,variant: "yellow"  },
  { key: "done",    label: "종료",     count: 1,   icon: RedButton,   variant: "red"  },
];

function SelectButton() {
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

export default SelectButton;
