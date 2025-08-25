/* eslint-disable */
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  disabled = false,
}) {
  const { id: postId } = useParams();              // ← URL의 :id 사용
  const [submitting, setSubmitting] = useState(false);

  const currentPrice = Number.isFinite(currentPriceProp) ? currentPriceProp : startPrice;
  const [bidValue, setBidValue] = useState("");
  const remainText = useCountdown(endAt);

  const parseNumber = (str) => {
    const onlyNum = String(str ?? "").replace(/[^\d]/g, "");
    return onlyNum ? Number(onlyNum) : NaN;
  };

  const bump = (step) => {
    const base = Number.isFinite(parseNumber(bidValue)) ? parseNumber(bidValue) : currentPrice;
    setBidValue(String(base + step));
  };

  const totalPay = useMemo(() => {
    const num = parseNumber(bidValue);
    if (!Number.isFinite(num)) return Number.isFinite(totalWeightKg) ? currentPrice * totalWeightKg : currentPrice;
    return Number.isFinite(totalWeightKg) ? num * totalWeightKg : num;
  }, [bidValue, totalWeightKg, currentPrice]);

  const canBid = useMemo(() => {
    const num = parseNumber(bidValue);
    return !disabled && !submitting && Number.isFinite(num) && num > currentPrice;
  }, [bidValue, currentPrice, disabled, submitting]);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const price = parseNumber(bidValue);
    if (!Number.isFinite(price)) return;

    try {
      setSubmitting(true);
      const res = await axios.post(
        `https://likelion.info/auction/add`,
        {  postId: Number(postId), price: Number(price)  },
        { withCredentials: true }
      );
      const ok = res?.data?.isSuccess === 1 || res?.data?.isSuccess === true;
      if (!ok) throw new Error("등록 실패");

      // 성공 UX (알림/초기화/재조회)
      // setBidValue("");
      // TODO: 최신 현재가 재조회 필요하면 상위에서 콜백 받거나 이벤트 발생
      alert("호가가 등록되었습니다.");
    } catch (err) {
      alert("호가 등록 실패: " + (err?.message ?? "알 수 없는 오류"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.sectionTitle}>호가 참여(kg당 가격 입력)</div>
      <div className={styles.quickRow}>
        {quickSteps.map((step) => (
          <button
            key={step}
            type="button"
            className={styles.quickBtn}
            onClick={() => bump(step)}
            disabled={disabled || submitting}
          >
            <span className={styles.plus}>+</span>
            {formatKRW(step)}
          </button>
        ))}
      </div>

      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <input
          type="text"
          inputMode="numeric"
          placeholder={`현재 kg당 ${formatKRW(currentPrice)}`}
          value={bidValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={(e) => setBidValue(e.target.value.replace(/[^\d]/g, ""))}
          className={styles.priceInput}
          disabled={disabled || submitting}
          aria-label="kg당 호가 입력"
        />
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!canBid}
          aria-disabled={!canBid}
        >
          {submitting ? "등록 중..." : "호가하기"}
        </button>
      </form>

      <div className={styles.totalRow}>
        <input className={styles.totalInput} value={formatKRW(totalPay)} readOnly aria-label="총 지불금액" />
      </div>
    </div>
  );
}