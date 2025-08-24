import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./SelectButton.module.css";
import loadingStyles from "../../styles/Loading.module.css";

import BlueButton from "../../assets/AuctionTable/blue.svg";
import YellowButton from "../../assets/AuctionTable/yellow.svg";
import RedButton from "../../assets/AuctionTable/red.svg";

function SelectButton() {
  const [selected, setSelected] = useState("all");
  const [status, setStatus] = useState({
    totalCount: 0,
    readyCount: 0,
    currentCount: 0,
    finishCount: 0,
  });



// 여기 부터 !!!!! 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const {data} = await axios.get(
        `https://likelion.info:443/post/get/auction/list`
      );
      console.log(data);
      if (data) {
        setStatus({
          totalCount: data?.totalCount ?? 0,
          readyCount: data?.readyCount ?? 0,
          currentCount: data?.currentCount ?? 0,
          finishCount: data?.finishCount ?? 0,
        });
      } else {
        // 응답에 데이터 없음
        setStatus(null);
        setError("정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      // 상세 조회 오류 처리
      setStatus(null);
      setError("정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
// 여기 까지 !!!!!




  const OPTIONS = useMemo(
    () => [
      { key: "all",     label: "전체보기", count: status.totalCount,  icon: null,        variant: "neutral" },
      { key: "pending", label: "대기 중",  count: status.readyCount,  icon: BlueButton,  variant: "blue"    },
      { key: "progress",label: "진행 중",  count: status.currentCount,icon: YellowButton,variant: "yellow"  },
      { key: "done",    label: "종료",     count: status.finishCount, icon: RedButton,   variant: "red"     },
    ],
    [status]
  );




// 여기 부터 !!!!!
  if (isLoading) {
    return (
      <div className={loadingStyles.loading}>
        {/* <div className={loadingStyles.loadingSpinner}></div> */}
        <div className={loadingStyles.loadingText}>
          정보를 불러오고 있습니다...
        </div>
        <div className={loadingStyles.loadingSubtext}>잠시만 기다려주세요</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={loadingStyles.loading}>
        <div className={loadingStyles.errorIcon}>⚠️</div>
        <div className={loadingStyles.errorMessage}>{error}</div>
        <button onClick={() => fetchData()} className={loadingStyles.retryBtn}>
          다시 시도
        </button>
      </div>
    );
  }
// 여기 까지 !!!!!




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
