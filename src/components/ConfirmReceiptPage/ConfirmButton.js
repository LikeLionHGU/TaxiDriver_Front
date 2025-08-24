import React, { useState , useEffect , useMemo } from "react";
import axios from "axios";
import styles from "./ConfirmButton.module.css";
import loadingStyles from "../../styles/Loading.module.css";

import BlueButton from "../../assets/AuctionTable/blue.svg";
import GreenButton from "../../assets/AuctionTable/green.svg";

function ConfirmButton({ value = "today", onChange }) {
  const [selected, setSelected] = useState(value);  
  const [status, setStatus] = useState({
    totalCount: 0,
    waitCount: 0,
    finishCount: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => setSelected(value), [value]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const {data} = await axios.get(
        `https://likelion.info:443/post/get/receive/count/admin`
        , { withCredentials: true });
      console.log(data); 
      if (data) {
        setStatus({
          totalCount: data?.totalCount ?? 0,
          waitCount: data?.waitCount ?? 0,
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

  const OPTIONS = useMemo(
    () => [
      { key: "today",    label: "오늘 수령",  count: status.totalCount,  icon: null,       variant: "neutral" },
      { key: "waiting",  label: "수령 대기",  count: status.waitCount,   icon: BlueButton,  variant: "blue"    },
      { key: "complete", label: "수령 완료",  count: status.finishCount, icon: GreenButton, variant: "green"   },
    ],
    [status]
  );

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

  const handleClick = (key) => {
    setSelected(key);
    onChange?.(key); 
  };


  return (
    <div className={styles.selectButtonContainer} role="tablist" aria-label="상태 필터">
      {OPTIONS.map(opt => (
        <button
          key={opt.key}
          type="button"
          className={styles.selectButton}
          data-variant={opt.variant}
          data-selected={selected === opt.key}
          onClick={() => handleClick(opt.key)}
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
