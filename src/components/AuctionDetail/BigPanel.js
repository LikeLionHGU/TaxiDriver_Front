/* eslint-disable */
import React, { useMemo, useState, useEffect } from "react";
import styles from "./BigPanel.module.css";

// ₩ 포맷
const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

// 남은 시간 mm:ss (endAt: ISO or Date or ms)
function useCountdown(endAt) {
  const [remain, setRemain] = useState(() => {
    if (!endAt) return 0;
    return Math.max(0, Math.floor((new Date(endAt) - Date.now()) / 1000));
  });

  useEffect(() => {
    if (!endAt) return;
    const id = setInterval(() => {
      setRemain(Math.max(0, Math.floor((new Date(endAt) - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, [endAt]);

  const m = Math.floor(remain / 60);
  const s = remain % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * BidPanel 컴포넌트
 *
 * props:
 * - startPrice: 시작가(1kg 기준 단가)
 * - currentPrice: 현재 최고가(1kg 기준 단가). 없으면 startPrice로 대체
 * - endAt: 경매 종료 예정 시각(카운트다운)
 * - totalWeightKg: 총 중량(숫자). 주면 총 지불금액 = (입력 단가 * 총중량)
 * - quickSteps: [500, 1000, 2000, 5000] 같은 증분 배열 (선택)
 * - onBid: (pricePerKg) => void  (호가하기 클릭 시 호출)
 * - disabled: 비활성화 여부 (선택)
 */
export default function BidPanel({
  startPrice = 0,
  currentPrice: currentPriceProp,
  endAt,
  totalWeightKg,
  quickSteps = [500, 1000, 2000, 5000],
  onBid,
  disabled = false,
}) {
  const currentPrice = Number.isFinite(currentPriceProp)
    ? currentPriceProp
    : startPrice;

  const [bidValue, setBidValue] = useState(""); // 입력값(문자열)
  const remainText = useCountdown(endAt);

  // 입력 숫자만 허용(쉼표 제거)
  const parseNumber = (str) => {
    if (str == null) return NaN;
    const onlyNum = String(str).replace(/[^\d]/g, "");
    return onlyNum ? Number(onlyNum) : NaN;
  };

  // 증분 버튼 클릭: 입력값 있으면 거기서 +, 없으면 currentPrice에서 +
  const bump = (step) => {
    const base = Number.isFinite(parseNumber(bidValue))
      ? parseNumber(bidValue)
      : currentPrice;
    const next = base + step;
    setBidValue(next.toString());
  };

  // 총 지불금액
  const totalPay = useMemo(() => {
    const num = parseNumber(bidValue);
    if (!Number.isFinite(num)) {
      // 입력이 없으면 현재가 기준으로 보여주기
      if (Number.isFinite(totalWeightKg)) return currentPrice * totalWeightKg;
      return currentPrice;
    }
    if (Number.isFinite(totalWeightKg)) return num * totalWeightKg;
    return num;
  }, [bidValue, totalWeightKg, currentPrice]);

  const canBid = useMemo(() => {
    const num = parseNumber(bidValue);
    // 입력이 없으면 불가, 입력값이 현재가보다 높아야 가능(동일가 금지면 >, 허용이면 >=)
    return !disabled && Number.isFinite(num) && num > currentPrice;
  }, [bidValue, currentPrice, disabled]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const num = parseNumber(bidValue);
    if (!Number.isFinite(num)) return;
    if (onBid) onBid(num);
  };

  return (
    <div className={styles.panel}>
      {/* 증분 버튼 */}
      <div className={styles.sectionTitle}>호가 참여(kg당 가격 입력)</div>
      <div className={styles.quickRow}>
        {quickSteps.map((step) => (
          <button
            key={step}
            type="button"
            className={styles.quickBtn}
            onClick={() => bump(step)}
            disabled={disabled}
          >
            <span className={styles.plus}>+</span>
            {formatKRW(step)}
          </button>
        ))}
      </div>

      {/* 입력 + 제출 */}
      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <input
          type="text"
          inputMode="numeric"
          placeholder={`현재 kg당 ${formatKRW(currentPrice)}`}
          value={bidValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) =>
            setBidValue(e.target.value.replace(/[^\d]/g, "")) // 숫자만
          }
          className={styles.priceInput}
          disabled={disabled}
          aria-label="kg당 호가 입력"
        />
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!canBid}
          aria-disabled={!canBid}
        >
          호가하기
        </button>
      </form>

      {/* 총 지불금액 */}
      <div className={styles.totalRow}>
        <input
          className={styles.totalInput}
          value={formatKRW(totalPay)}
          readOnly
          aria-label="총 지불금액"
        />
      </div>
    </div>
  );
}
